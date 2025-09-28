import "./App.css";
import icon from "/assets/icon.png";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();
  function navigateToBadminton() {
    console.log("navigating to badminton");
    navigate("/badminton");
  }
  return (
    <>
      <div className="about">
        {/* <h1 ref={title}>About</h1> */}
        <p style={{ fontSize: "1.75rem" }}>Hi, I'm Justin!</p>
        <img
          src={icon}
          style={{
            height: "125px",
            borderRadius: "3%",
            // border: "1px solid white",
          }}
        ></img>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <p>Full-stack developer based in the Bay Area, CA.</p>
          <p>
            Completing a Master of Computer Science at UIUC and currently a
            Research Associate at the Digital Learning Lab @ UCI.
          </p>
          <p>
            Building keyboards,{" "}
            <span onClick={navigateToBadminton}>badminton</span>, &
            weightlifting on the side.
          </p>
        </div>
        <h2 style={{ fontSize: "1.5rem" }}>Contact</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p>Phone: +1 650-933-6363</p>
          <p>Email: hwjustincheok@gmail.com</p>
        </div>
        <div className="aboutLinks">
          <a
            href="https://github.com/Galaxeo"
            target="_blank"
            rel="noreferrer noopener"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/jhcheok/"
            target="_blank"
            rel="noreferrer noopener"
          >
            LinkedIn
          </a>
          <a
            href="https://drive.google.com/file/d/1fGCB5FFyC5KfOgfuT9GEPKRLoo1vhj_C/view?usp=sharing"
            target="_blank"
            rel="noreferrer noopener"
          >
            Resume
          </a>
        </div>
      </div>
    </>
  );
}
export default About;
