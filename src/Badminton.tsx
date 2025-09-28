import { Suspense, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";
export default function Badminton() {
  const navigate = useNavigate();
  const [isCounting, setIsCounting] = useState(false);
  const [number, setNumber] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);
  const [intervalRate, setIntervalRate] = useState(4000);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  function randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function handleTimer() {
    if (isCounting) {
      setIsCounting(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } else {
      setIsCounting(true);
      intervalRef.current = setInterval(() => {
        // Flash yellow when updating number
        setIsFlashing(true);
        setNumber(randomNumber(1, 6));

        // Stop flashing after 200ms
        setTimeout(() => {
          setIsFlashing(false);
        }, 200);
      }, intervalRate);
    }
  }

  // Cleanup interval on component unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
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
            handleTimer();
          }}
          style={{
            fontSize: "60vh",
            color: isFlashing ? "#FFD700" : "inherit",
            transition: "color 0.1s ease-in-out",
            lineHeight: 1,
            margin: 0,
            padding: 0,
          }}
        >
          {number}
        </h1>
        <p
          className="middleLogo workInfoClose"
          onClick={() => {
            handleTimer();
          }}
        >
          {isCounting ? "stop" : "start"}
        </p>

        <div style={{ marginTop: "20px" }}>
          <select
            value={intervalRate}
            onChange={(e) => setIntervalRate(Number(e.target.value))}
            disabled={isCounting}
            style={{
              padding: "8px 12px",
              fontSize: "16px",
              borderRadius: "4px",
              cursor: isCounting ? "not-allowed" : "pointer",
            }}
          >
            <option value={1000}>1 second</option>
            <option value={2000}>2 seconds</option>
            <option value={2500}>2.5 seconds</option>
            <option value={3000}>3 seconds</option>
            <option value={3500}>3.5 seconds</option>
            <option value={4000}>4 seconds</option>
            <option value={4500}>4.5 seconds</option>
            <option value={5000}>5 seconds</option>
          </select>
        </div>
      </div>
    </>
  );
}
