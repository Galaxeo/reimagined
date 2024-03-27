import { useState, useRef, useEffect } from "react";
import "./App.css";
import { easing } from "maath";

function Overlay() {
  {
    /**/
  }
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [menuWidth, setMenuWidth] = useState(300);
  const ref = useRef(null);

  const handleExpandedItem = (itemName: string) => {
    const menu = ref.current as HTMLElement;
    if (expandedItem === itemName) {
      setExpandedItem(null);
      setMenuWidth(300);
      menu.style.gridTemplateColumns = "1fr 1fr 1fr";
    } else {
      if (itemName === "about") {
        menu.style.gridTemplateColumns = "2fr 1fr 1fr";
      }
      if (itemName === "keyboards") {
        menu.style.gridTemplateColumns = "1fr 2fr 1fr";
      }
      if (itemName === "works") {
        menu.style.gridTemplateColumns = "1fr 1fr 2fr";
      }
      setExpandedItem(itemName);
      setMenuWidth(325);
    }
  };
  // function to add className to element
  const menuItemClass = (itemName: string) =>
    itemName === expandedItem ? "scaled" : "";

  useEffect(() => {});

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
        <div ref={ref} className="topMenu" style={{ width: `${menuWidth}px` }}>
          <p
            className={menuItemClass("about")}
            onClick={() => {
              handleExpandedItem("about");
            }}
          >
            about
          </p>
          <p
            className={menuItemClass("keyboards")}
            onClick={() => {
              handleExpandedItem("keyboards");
            }}
          >
            keyboards
          </p>
          <p
            className={menuItemClass("works")}
            onClick={() => {
              handleExpandedItem("works");
            }}
          >
            works
          </p>
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
