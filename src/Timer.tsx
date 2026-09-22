import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const BEEPS = [
  { at: 3, freq: 660 },
  { at: 10, freq: 825 },
  // the last one keeps ringing until the stopwatch is stopped or restarted
  { at: 17, freq: 1031, repeatEvery: 1000 },
];

const DOUBLE_TAP_MS = 300;

type ControlMode = "toggle" | "doubleTap";
type FinalBeep = "keepGoing" | "threeTimes";

const FINAL_BEEP_COUNT = 3;

export default function Timer() {
  const navigate = useNavigate();
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);
  const [controlMode, setControlMode] = useState<ControlMode>("toggle");
  const [finalBeep, setFinalBeep] = useState<FinalBeep>("keepGoing");

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

  const tick = useCallback(() => {
    const seconds = (performance.now() - startRef.current) / 1000;
    setElapsed(seconds);
    for (const { at, freq, repeatEvery } of BEEPS) {
      if (seconds >= at && !beepedRef.current.includes(at)) {
        beepedRef.current.push(at);
        beep(freq);
        if (repeatEvery) {
          clearRepeat();
          let rings = 1; // the one that just sounded
          repeatRef.current = setInterval(() => {
            beep(freq);
            rings += 1;
            if (finalBeepRef.current === "threeTimes" && rings >= FINAL_BEEP_COUNT) {
              clearRepeat();
            }
          }, repeatEvery);
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
    setIsRunning(true);
    isRunningRef.current = true;
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const stop = useCallback(() => {
    clearRepeat();
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setIsRunning(false);
    isRunningRef.current = false;
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
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
      } else {
        start();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [start, stop]);

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

        <div style={{ marginTop: "20px" }}>
          <select
            value={controlMode}
            onChange={(e) => setControlMode(e.target.value as ControlMode)}
            style={{
              padding: "8px 12px",
              fontSize: "16px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            <option value="toggle">space toggles</option>
            <option value="doubleTap">double tap to stop</option>
          </select>

          <select
            value={finalBeep}
            onChange={(e) => setFinalBeep(e.target.value as FinalBeep)}
            style={{
              padding: "8px 12px",
              fontSize: "16px",
              borderRadius: "4px",
              cursor: "pointer",
              marginLeft: "10px",
            }}
          >
            <option value="keepGoing">17s beep keeps going</option>
            <option value="threeTimes">17s beep x3</option>
          </select>
        </div>
      </div>
    </>
  );
}
