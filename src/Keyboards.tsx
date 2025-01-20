// @ts-nocheck
import { useState } from "react";
import "./App.css";

const keyboardDescriptions = [
  {
    title: "GMMK Pro",
    switches: "Banana Split",
    keycaps: "EnjoyPBT WoB",
    youtube: "https://www.youtube.com/watch?v=hZgZtVH6Nr0",
  },
  {
    title: "Mode Eighty First Edition",
    switches: "Original Aspiration",
    keycaps: "GMK Honor Dark",
    youtube: "https://www.youtube.com/watch?v=5iBzRalDywA",
  },
  {
    title: "KBD8X MKII",
    switches: "Boba U4T",
    keycaps: "EnjoyPBT Sky Dolch",
    youtube: "https://www.youtube.com/watch?v=veoZb0W0yX0",
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
    youtube: "https://www.youtube.com/watch?v=7XO5gOVhj6I",
  },
  {
    title: "Tofu 65",
    switches: "Hako Clear",
    keycaps: "PG Retro",
    youtube: "https://www.youtube.com/watch?v=kTj5T9E-GII",
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
    youtube: "https://www.youtube.com/watch?v=NluXDPRHqEE",
  },
  {
    title: "Bakeneko 65",
    switches: "Mauve",
    keycaps: "NicePBT Sugarplum",
    youtube: "https://www.youtube.com/watch?v=oevpCoap6kE",
  },
  {
    title: "NK87",
    switches: "Boba U4 Silent",
    keycaps: "NovelKeys Cherry Blossom",
    youtube: "https://www.youtube.com/watch?v=e9vDBf_oQQk",
  },
  {
    title: "Mode Eighty 2022",
    switches: "Pewter",
    keycaps: "XY Kitty Paw",
    youtube: "https://www.youtube.com/watch?v=-gMmgqHDG3M",
  },
  {
    title: "Owlab Spring",
    switches: "Original Aspiration Creamsicle",
    keycaps: "GMK Alter",
    youtube: "https://www.youtube.com/watch?v=MgbXJK-fWsY",
  },
  {
    title: "Monokei x TGR Tomo",
    switches: "MX Brown",
    keycaps: "NicePBT Noel",
    youtube: "https://www.youtube.com/watch?v=wOU4o660acs",
  },
  {
    title: "Norbauer Heavy Grail",
    switches: "Topre",
    keycaps: "Stock HHKB",
    youtube: "https://www.youtube.com/watch?v=eufD8MzQhVo",
  },
  {
    title: "Wooting 60HE in Mekanisk Fjell",
    switches: "Geon Raptor HE",
    keycaps: "GMK Hallyu",
    youtube: "https://www.youtube.com/watch?v=eufD8MzQhVo",
  },
  {
    title: "Mode Sonnet",
    switches: "Boba U4T",
    keycaps: "NovelKeys Cherry Taro",
    youtube: "https://www.youtube.com/watch?v=h5j6mmtZMso",
  },
  {
    title: "Mode Envoy",
    switches: "NK Dream",
    keycaps: "MW Heresy",
    youtube: "https://www.youtube.com/watch?v=zGyB5CJr-X4&t=18s",
  },
  {
    title: "Tofu 65 2.0",
    switches: "Coffee Chip Ice Cream",
    keycaps: "GMK Hanok",
    youtube: "https://www.youtube.com/watch?v=q0to_M_nUU0",
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
  {
    title: "Mode Envoy",
    switches: "Boba U4 Silent",
    keycaps: "NicePBT Growth (Auxo)"
  },
];

function Scene() {
  const imagePaths = Array.from(
    { length: 21 },
    (_, i) => `/assets/Keyboards/${i + 1}.webp`
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
                {keyboardDescriptions[selectedImage].youtube && (
                  <p style={{ marginTop: "5px" }}>
                    <a
                      className="kbYoutube"
                      href={keyboardDescriptions[selectedImage].youtube}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      video
                    </a>
                  </p>
                )}
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
