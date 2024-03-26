import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function Overlay() {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          pointerEvents: "none",
          fontSize: "13px",
        }}
      >
        cheok.works
      </div>
      <div>
        <div className="topMenu">
          {/*top has keyboards, about, works in a menu clickable*/}
          <p>keyboards</p>
          <p>about</p>
          <p>works</p>
        </div>
        <hr className="topMenuHr"></hr>
      </div>
    </>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Overlay></Overlay>
      <div
        style={{
          marginTop: "30vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
