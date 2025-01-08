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
        <h1 className="middleLogo">
          Svarog
        </h1>
        <p className={"middleLogo"} style={{ textAlign: "center", width: "30%" }}>a study tool combining modern studying methods and the latest technology to boost focus, strengthen memory, and build lasting study endurance</p>
        <p className="middleLogo">Closed Beta | Early 2025</p>
        <p className={"middleLogo", "workInfoClose"} onClick={() => {navigate("/")}}>back</p>
      </div >
    </>
  )
}
