import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";
import "./App.css";

type Beep = { at: number; freq: number; repeatEvery?: number };
type TimerMode = "e2e" | "pingPong";

// each preset rings low -> high; the last mark repeats until stopped or capped
const TIMER_MODES: Record<TimerMode, { label: string; beeps: Beep[] }> = {
  e2e: {
    label: "E2E",
    beeps: [
      { at: 10, freq: 660 },
      { at: 15, freq: 825 },
      { at: 22, freq: 1031, repeatEvery: 1000 },
    ],
  },
  pingPong: {
    label: "Diverse Ping-Pong",
    beeps: [
      { at: 3, freq: 660 },
      { at: 10, freq: 825 },
      { at: 17, freq: 1031, repeatEvery: 1000 },
    ],
  },
};

const DOUBLE_TAP_MS = 300;

// an emote shows when the stopped clock reads exactly one of these
const FUNNY_NUMBERS = [
  { shown: "6.66", emote: "\ud83d\ude08 \ud83d\udd25" },
  { shown: "4.20", emote: "\ud83c\udf3f \ud83d\udca8" },
  { shown: "6.70", emote: "\ud83d\ude4c 6-7" },
  { shown: "6.90", emote: "\ud83d\ude0f \ud83d\udc4c" },
];

function funnyNumberAt(seconds: number) {
  const shown = seconds.toFixed(2); // match what the clock displays
  return FUNNY_NUMBERS.find((funny) => funny.shown === shown) ?? null;
}

type ControlMode = "toggle" | "doubleTap";
type FinalBeep = "keepGoing" | "threeTimes";

const FINAL_BEEP_COUNT = 3;

const selectStyle = {
  padding: "6px 10px",
  fontSize: "14px",
  borderRadius: "4px",
  cursor: "pointer",
} as const;

export default function Timer() {
  const navigate = useNavigate();
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);
  const [controlMode, setControlMode] = useState<ControlMode>("toggle");
  const [finalBeep, setFinalBeep] = useState<FinalBeep>("threeTimes");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [timerMode, setTimerMode] = useState<TimerMode>("e2e");
  const [emote, setEmote] = useState<string | null>(null);

  const startRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const beepedRef = useRef<number[]>([]);
  const audioRef = useRef<AudioContext | null>(null);
  const flashTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const repeatRef = useRef<NodeJS.Timeout | null>(null);
  // mirrored in refs so the key listener never has to be torn down and re-bound
  const isRunningRef = useRef(false);
  const controlModeRef = useRef<ControlMode>(controlMode);
  const lastSpaceRef = useRef(0);
  const finalBeepRef = useRef<FinalBeep>(finalBeep);

  controlModeRef.current = controlMode;
  finalBeepRef.current = finalBeep;

  const beeps = TIMER_MODES[timerMode].beeps;
  const beepsRef = useRef<Beep[]>(beeps);
  beepsRef.current = beeps;
  const finalAt = beeps[beeps.length - 1].at;

  function clearRepeat() {
    if (repeatRef.current) {
      clearInterval(repeatRef.current);
      repeatRef.current = null;
    }
  }

  function beep(freq: number) {
    if (!audioRef.current) {
      audioRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioRef.current;
    if (ctx.state === "suspended") ctx.resume();

    const now = ctx.currentTime;

    // rolls off the top end so the tone stays warm rather than piercing
    const tone = ctx.createBiquadFilter();
    tone.type = "lowpass";
    tone.frequency.value = 2200;

    // gentle makeup gain: keeps it audible without adding harsh harmonics
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.ratio.value = 8;
    tone.connect(comp);
    comp.connect(ctx.destination);

    // bell-like: sine partials, the higher ones quieter and dying away faster
    const partials = [
      { ratio: 1, level: 1, decay: 0.9 },
      { ratio: 1.5, level: 0.45, decay: 0.5 },
      { ratio: 2, level: 0.18, decay: 0.3 },
    ];
    for (const { ratio, level, decay } of partials) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq * ratio;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(level, now + 0.02); // soft attack, no click
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decay);
      osc.connect(gain);
      gain.connect(tone);
      osc.start(now);
      osc.stop(now + decay + 0.02);
    }

    setIsFlashing(true);
    if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
    flashTimeoutRef.current = setTimeout(() => setIsFlashing(false), 300);
  }

  function armRepeat(freq: number, everyMs: number) {
    clearRepeat();
    beep(freq);
    let rings = 1;
    repeatRef.current = setInterval(() => {
      beep(freq);
      rings += 1;
      if (finalBeepRef.current === "threeTimes" && rings >= FINAL_BEEP_COUNT) {
        clearRepeat();
      }
    }, everyMs);
  }

  // arrow keys nudge the clock; the beeps re-arm so they match the new time
  function seek(deltaMs: number) {
    if (!isRunningRef.current) return;
    const now = performance.now();
    startRef.current = Math.min(startRef.current - deltaMs, now);
    const seconds = (now - startRef.current) / 1000;
    setElapsed(seconds);

    beepedRef.current = beepsRef.current.filter((b) => seconds >= b.at).map((b) => b.at);
    const ringing = beepsRef.current.find((b) => b.repeatEvery && seconds >= b.at);
    if (ringing?.repeatEvery) {
      if (!repeatRef.current) armRepeat(ringing.freq, ringing.repeatEvery);
    } else {
      clearRepeat();
    }
  }

  const tick = useCallback(() => {
    const seconds = (performance.now() - startRef.current) / 1000;
    setElapsed(seconds);
    for (const { at, freq, repeatEvery } of beepsRef.current) {
      if (seconds >= at && !beepedRef.current.includes(at)) {
        beepedRef.current.push(at);
        if (repeatEvery) {
          armRepeat(freq, repeatEvery);
        } else {
          beep(freq);
        }
      }
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const start = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    clearRepeat();
    beepedRef.current = [];
    startRef.current = performance.now();
    setElapsed(0);
    setEmote(null);
    setIsRunning(true);
    isRunningRef.current = true;
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const pausedAtRef = useRef(0); // ms elapsed at the moment of stop

  const stop = useCallback(() => {
    clearRepeat();
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (isRunningRef.current) {
      const ms = performance.now() - startRef.current;
      const hit = funnyNumberAt(ms / 1000);
      if (hit) setEmote(hit.emote);
      setElapsed(ms / 1000);
      pausedAtRef.current = ms;
    }
    setIsRunning(false);
    isRunningRef.current = false;
  }, []);
  
  const resume = useCallback(() => {
    if (isRunningRef.current || pausedAtRef.current <= 0) return; // nothing to resume
    clearRepeat();
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  
    setEmote(null);
    const now = performance.now();
    startRef.current = now - pausedAtRef.current; // continue from where we stopped
    const seconds = pausedAtRef.current / 1000;
  
    // re-arm beeps to match the restored time
    beepedRef.current = beepsRef.current.filter((b) => seconds >= b.at).map((b) => b.at);
    const ringing = beepsRef.current.find((b) => b.repeatEvery && seconds >= b.at);
    if (ringing?.repeatEvery) armRepeat(ringing.freq, ringing.repeatEvery);
  
    setIsRunning(true);
    isRunningRef.current = true;
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

 

  useEffect(() => {
    // swapping presets mid-run re-arms the new marks against the current time
    if (isRunningRef.current) seek(0);
  }, [timerMode]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
        e.preventDefault();
        seek(e.code === "ArrowRight" ? 1000 : -1000);
        return;
      }
      if (e.code === "KeyR") {
        if (e.repeat) return;
        isRunningRef.current ? stop() : resume();
        return;
      }
      if (e.code !== "Space") return;
      e.preventDefault();
      if (e.repeat) return; // holding space shouldn't machine-gun restarts

      if (controlModeRef.current === "toggle") {
        isRunningRef.current ? stop() : start();
        return;
      }

      // doubleTap: a single tap always (re)starts, two quick taps stop
      const now = performance.now();
      const isDoubleTap = now - lastSpaceRef.current < DOUBLE_TAP_MS;
      lastSpaceRef.current = isDoubleTap ? 0 : now;
      if (isDoubleTap) {
        stop();
        setElapsed(0);
        setEmote(null);
      } else {
        start();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [start, stop, resume]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
      if (repeatRef.current) clearInterval(repeatRef.current);
      audioRef.current?.close();
    };
  }, []);

  return (
    <>
      <div
        className="topLeftLogo"
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          fontSize: "13px",
        }}
        onClick={() => {
          navigate("/");
        }}
      >
        c\w
      </div>
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 30,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 12,
          zIndex: 999,
        }}
      >
        <Settings
          size={18}
          className="workInfoClose"
          aria-label="settings"
          onClick={(e) => {
            setSettingsOpen((open) => !open);
            e.currentTarget.blur();
          }}
          style={{
            transform: settingsOpen ? "rotate(60deg)" : "none",
            transition: "transform 0.2s ease-in-out",
          }}
        />

        {settingsOpen && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              padding: 12,
              borderRadius: 4,
              backgroundColor: "rgba(15, 15, 15, 0.8)",
            }}
          >
            <select
              value={controlMode}
              onChange={(e) => {
                setControlMode(e.target.value as ControlMode);
                e.target.blur(); // otherwise space would reopen the dropdown
              }}
              style={selectStyle}
            >
              <option value="toggle">space toggles</option>
              <option value="doubleTap">double tap to stop</option>
            </select>

            <select
              value={timerMode}
              onChange={(e) => {
                setTimerMode(e.target.value as TimerMode);
                e.target.blur();
              }}
              style={selectStyle}
            >
              {(Object.keys(TIMER_MODES) as TimerMode[]).map((mode) => (
                <option key={mode} value={mode}>
                  {TIMER_MODES[mode].label} ({TIMER_MODES[mode].beeps.map((b) => b.at).join(" / ")})
                </option>
              ))}
            </select>

            <select
              value={finalBeep}
              onChange={(e) => {
                setFinalBeep(e.target.value as FinalBeep);
                e.target.blur();
              }}
              style={selectStyle}
            >
              <option value="keepGoing">{finalAt}s beep keeps going</option>
              <option value="threeTimes">{finalAt}s beep x3</option>
            </select>
          </div>
        )}
      </div>
      <div
        style={{
          marginTop: "10vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "70vh",
          gap: 10,
        }}
      >
        <h1
          className="middleLogo"
          onClick={() => {
            start();
          }}
          style={{
            fontSize: "30vh",
            color: isFlashing ? "#FFD700" : "inherit",
            transition: "color 0.1s ease-in-out",
            lineHeight: 1,
            margin: 0,
            padding: 0,
          }}
        >
          {elapsed.toFixed(2)}
        </h1>
        {emote && (
          <p className="middleLogo" style={{ fontSize: "4vh", margin: 0, padding: 0 }}>
            {emote}
          </p>
        )}
        <p
          className="middleLogo workInfoClose"
          onClick={() => {
            isRunning ? stop() : start();
          }}
        >
          {isRunning ? "stop" : "start"}
        </p>
        <p className="middleLogo" style={{ fontSize: "13px", opacity: 0.6 }}>
          {controlMode === "toggle"
            ? "space starts / stops \u2014 space again restarts"
            : "space starts / restarts \u2014 double tap space to stop"}
        </p>
        <p className="middleLogo" style={{ fontSize: "13px", opacity: 0.6 }}>
          {"\u2190 \u2192 nudge one second \u2014 r stops / resumes"}
        </p>
      </div>
    </>
  );
}
