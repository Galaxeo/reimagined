// @ts-nocheck
import { Suspense, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";
export default function Svarog() {
  const navigate = useNavigate();
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
        <h1>
          Svarog
        </h1>
        <p style={{ textAlign: "center", width: "35%" }}>a selfish study tool combining the latest technology to boost focus, strengthen memory, and build lasting study endurance</p>
        <p>Closed Beta | Early 2025</p>
      </div >
    </>
  )
}
