// @ts-nocheck
import { useState } from "react";
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
  {
    title: "Idobao ID67",
    switches: "Boba U4T",
    keycaps: "GMK Mizu clones",
  },
  {
    title: "AVA",
    switches: "Aflion Melody",
    keycaps: "-",
  },
];

function Scene() {
  const imagePaths = Array.from(
    { length: 20 },
    (_, i) => `/assets/Keyboards/${i + 1}.jpg`
  );
  const [selectedImage, setSelectedImage] = useState(null);
  const handleSelectedImage = (i) => {
    setSelectedImage(i);
  };

  return (
    <>
      <div
        className="kbInfoLayer"
        onClick={() => {
          handleSelectedImage(null);
        }}
      >
        {selectedImage != null && selectedImage == "commissions" && (
          <>
            <div className="kbInfo">
              <h1>Commissions</h1>
              <p>Currently reserved for friends & family</p>
              <p>Feel free to email any questions to hwjustincheok@gmail.com</p>
              <p
                className="kbInfoClose"
                onClick={() => {
                  handleSelectedImage(null);
                }}
              >
                close
              </p>
            </div>
          </>
        )}
        {selectedImage != null && selectedImage != "commissions" && (
          <>
            <div className="kbInfo">
              <img src={imagePaths[selectedImage]}></img>
              <div>
                <p style={{ fontSize: ".75rem", color: "grey" }}>Keyboard</p>
                <p style={{ fontSize: "1.5rem" }}>
                  {keyboardDescriptions[selectedImage].title}
                </p>
                <p style={{ fontSize: ".75rem", color: "grey" }}>Switches</p>
                <p>{keyboardDescriptions[selectedImage].switches}</p>
                <p style={{ fontSize: ".75rem", color: "grey" }}>Keycaps</p>
                <p>{keyboardDescriptions[selectedImage].keycaps}</p>
                <p
                  className="kbInfoClose"
                  onClick={() => {
                    handleSelectedImage(null);
                  }}
                >
                  close
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="kbBigCont">
        <div className="kbCont">
          {imagePaths.map((url, i) => (
            <img
              className="kbImage"
              src={url}
              key={i}
              onClick={() => {
                handleSelectedImage(i);
              }}
            />
          ))}
        </div>
        <p
          className="kbCommissions"
          onClick={() => {
            handleSelectedImage("commissions");
          }}
        >
          commissions
        </p>
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
