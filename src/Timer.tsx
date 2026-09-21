import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const BEEPS = [
  { at: 3, freq: 660 },
  { at: 10, freq: 825 },
  // the last one keeps ringing until the stopwatch is stopped or restarted
  { at: 17, freq: 1031, repeatEvery: 1000 },
];

export default function Timer() {
  const navigate = useNavigate();
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);

  const startRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const beepedRef = useRef<number[]>([]);
  const audioRef = useRef<AudioContext | null>(null);
  const flashTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const repeatRef = useRef<NodeJS.Timeout | null>(null);

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
          repeatRef.current = setInterval(() => beep(freq), repeatEvery);
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
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const stop = useCallback(() => {
    clearRepeat();
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setIsRunning(false);
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.code !== "Space") return;
      e.preventDefault();
      start();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [start]);

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
          press space to start / restart
        </p>
      </div>
    </>
  );
}
