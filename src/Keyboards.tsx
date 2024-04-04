import { useState, useRef, useEffect } from "react";
import "./App.css";

const keyboardDescriptions = [
  {
    title: "GMMK Pro",
    switches: "Banana Split",
    keycaps: "EnjoyPBT WoB",
  },
  {
    title: "Mode Eighty First Edition",
    switches: "Original Aspiration",
    keycaps: "GMK Honor Dark",
  },
  {
    title: "KBD8X MKII",
    switches: "Boba U4T",
    keycaps: "EnjoyPBT Sky Dolch",
  },
  {
    title: "Mode SixtyFive",
    switches: "NovelKeys Cream",
    keycaps: "EnjoyPBT Blumen",
  },
  {
    title: "Rama M65-B",
    switches: "Boba U4T",
    keycaps: "GMK Hallyu",
  },
  {
    title: "Tofu 65",
    switches: "Hako Clear",
    keycaps: "PG Retro",
  },
  {
    title: "NK65 Entry Edition",
    switches: "Boba U4T",
    keycaps: "XDA Apollo",
  },
  {
    title: "Rama U80-A SEQ2",
    switches: "Boba U4T",
    keycaps: "EnjoyPBT Miami Nights",
  },
  {
    title: "Bakeneko 65",
    switches: "Mauve",
    keycaps: "NicePBT Sugarplum",
  },
  {
    title: "NK87",
    switches: "Boba U4 Silent",
    keycaps: "NovelKeys Cherry Blossom",
  },
  {
    title: "Mode Eighty 2022",
    switches: "Pewter",
    keycaps: "XY Kitty Paw",
  },
  {
    title: "Owlab Spring",
    switches: "Original Aspiration Creamsicle",
    keycaps: "GMK Alter",
  },
  {
    title: "Monokei x TGR Tomo",
    switches: "MX Brown",
    keycaps: "NicePBT Noel",
  },
  {
    title: "Norbauer Heavy Grail",
    switches: "Topre",
    keycaps: "Stock HHKB",
  },
  {
    title: "Wooting 60HE in Mekanisk Fjell",
    switches: "Geon Raptor HE",
    keycaps: "GMK Hallyu",
  },
  {
    title: "Mode Sonnet",
    switches: "Boba U4T",
    keycaps: "NovelKeys Cherry Taro",
  },
  {
    title: "Mode Envoy",
    switches: "NK Dream",
    keycaps: "MW Heresy",
  },
  {
    title: "Tofu 65 2.0",
    switches: "Coffee Chip Ice Cream",
    keycaps: "GMK Hanok",
  },
];

function Scene() {
  const imagePaths = Array.from(
    { length: 18 },
    (_, i) => `/assets/Keyboards/${i + 1}.jpg`
  );
  const [scrolling, setScrolling] = useState(true);
  const containerRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleVertScroll = (e) => {
    if (containerRef.current != null) {
      containerRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <>
      <div className="kbBigCont">
        {/* <p className="kbArrow">&lt;</p> */}
        <div ref={containerRef} onWheel={handleVertScroll} className="kbCont">
          {imagePaths.map((url, i) => (
            <img
              className="kbImage"
              src={url}
              key={i}
              width="100"
              height="100"
            />
          ))}
          <p>commissions</p>
        </div>
        {/* <p className="kbArrow">&gt;</p> */}
      </div>
    </>
  );
}

function Keyboards() {
  return (
    <>
      <Scene></Scene>
    </>
  );
}

export default Keyboards;
