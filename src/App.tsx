import { useState, useRef, useEffect } from "react";
import "./App.css";
import { easing } from "maath";
import Keyboards from "./Keyboards";

function Overlay({ handleCurrentPage }) {
  {
    /**/
  }
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [menuWidth, setMenuWidth] = useState(300);
  const ref = useRef(null);

  const handleExpandedItem = (itemName: string) => {
    const menu = ref.current as HTMLElement;
    if (expandedItem === itemName || itemName === "") {
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
        className="topLeftLogo"
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          fontSize: "13px",
        }}
        onClick={() => {
          handleCurrentPage("");
        }}
      >
        c\w
      </div>
      <div>
        <div ref={ref} className="topMenu" style={{ width: `${menuWidth}px` }}>
          <p
            className={menuItemClass("about")}
            onMouseOver={() => {
              handleExpandedItem("about");
            }}
            onMouseOut={() => {
              handleExpandedItem("");
            }}
          >
            about
          </p>
          <p
            className={menuItemClass("keyboards")}
            onMouseOver={() => {
              handleExpandedItem("keyboards");
            }}
            onMouseOut={() => {
              handleExpandedItem("");
            }}
            onClick={() => {
              handleCurrentPage("keyboards");
            }}
          >
            keyboards
          </p>
          <p
            className={menuItemClass("works")}
            onMouseOver={() => {
              handleExpandedItem("works");
            }}
            onMouseOut={() => {
              handleExpandedItem("");
            }}
          >
            works
          </p>
        </div>
      </div>
    </>
  );
}

function App() {
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState("");
  function handleCurrentPage(page: string) {
    setCurrentPage(page);
  }

  return (
    <>
      <Overlay handleCurrentPage={handleCurrentPage}></Overlay>
      <div
        style={{
          marginTop: "30vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {currentPage === "keyboards" && <Keyboards></Keyboards>}
        {currentPage === "" && <h1>cheok.works</h1>}
      </div>
    </>
  );
}

export default App;
