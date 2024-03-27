import { useState } from "react";
import "./App.css";

function Overlay() {
  {
    /**/
  }
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [menuWidth, setMenuWidth] = useState(200);
  // const oldflexRatios = (expandedItem: string | null) => { flex: expandedItem ? 1 : 0.5 };
  // const [flexRatios, setFlexRatios] = useState(oldflexRatios)
  const handleExpandedItem = (itemName: string) => {
    if (expandedItem === itemName) {
      setExpandedItem(null);
      setMenuWidth(200);
      // flexRatios(expandedItem);
    } else {
      setExpandedItem(itemName);
      setMenuWidth(300);
      // flexRatios(expandedItem);
    }
  };
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
        <div className="topMenu" style={{ width: `${menuWidth}px` }}>
          {/*top has keyboards, about, works in a menu clickable*/}
          <p onClick={() => handleExpandedItem("keyboards")}>keyboards</p>
          <p onClick={() => handleExpandedItem("about")}>about</p>
          <p onClick={() => handleExpandedItem("works")}>works</p>
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
