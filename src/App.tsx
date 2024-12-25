// @ts-nocheck
import { Suspense, useState, useRef, useEffect } from "react";
import "./App.css";
import Keyboards from "./Keyboards.tsx";
import About from "./About.tsx";
import Works from "./Works.tsx";
import { useNavigate } from "react-router";
import { grid } from "ldrs";

grid.register();

function Overlay({ handleCurrentPage }) {
  const keybPaths = Array.from(
    { length: 20 },
    (_, i) => `/assets/Keyboards/${i + 1}.webp`
  );
  const workPaths = Array.from(
    { length: 12 },
    (_, i) => `/assets/Works/${i + 1}.webp`
  );
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
      {/* preload all images from keybPaths and workPaths */}
      {keybPaths.map((path, i) => (
        <link key={i} rel="preload" as="image" href={path} />
      ))}
      {workPaths.map((path, i) => (
        <link key={i} rel="preload" as="image" href={path} />
      ))}
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
            onClick={() => {
              handleCurrentPage("about");
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
            onClick={() => {
              handleCurrentPage("works");
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
  const [currentPage, setCurrentPage] = useState("");
  const title = useRef(null);
  const subtitle = useRef(null);

  function handleCurrentPage(page: string) {
    if (page == currentPage) {
      return;
    }
    if (title.current != null) {
      const titleEle = title.current as HTMLElement;
      titleEle.classList.add("deleting");
      const subtitleEle = subtitle.current as HTMLElement;
      subtitleEle.classList.add("deleting");
    }
    setCurrentPage(page);
  }
  const navigate = useNavigate();
  function navigateToSvarog() {
    console.log("navigating to svarog");
    navigate("/svarog");
  }

  return (
    <>
      <Suspense
        fallback={<l-grid size="60" speed="1.5" color="black"></l-grid>}
      >
        <Overlay handleCurrentPage={handleCurrentPage}></Overlay>
        <div
          style={{
            marginTop: "10vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            height: "70vh",
          }}
        >
          {currentPage === "keyboards" && <Keyboards></Keyboards>}
          {currentPage === "about" && <About></About>}
          {currentPage === "works" && <Works></Works>}
          {currentPage === "" && (
            <>
              <h1 ref={title} className="middleLogo">
                cheok.works
              </h1>
              <h3 ref={subtitle} className="middleLogo">
                working on <a onClick={navigateToSvarog}>svarog</a>
              </h3>
            </>
          )}
        </div>
      </Suspense>
    </>
  );
}

export default App;
