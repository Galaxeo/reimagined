import "./App.css";
import headshot from "/assets/headshot.jpg";
import { useNavigate } from "react-router-dom";

const researchInterests = ["Educational Technology", "Human-Computer Interaction", "Learning Sciences"];

function About() {
  const navigate = useNavigate();
  function navigateToBadminton() {
    navigate("/badminton");
  }
  return (
    <>
      <div className="about">
        <img
          src={headshot}
          style={{
            height: "110px",
            borderRadius: "50%",
            border: "1px solid white",
          }}
        />
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "1.6rem", letterSpacing: "0.04em" }}>Justin Cheok</p>
          <p style={{ color: "darkgrey", fontSize: "0.8rem", marginTop: "6px", lineHeight: "1.6" }}>
            Research Associate, Digital Learning Lab @ UCI
            <br />
            MCS, UIUC
          </p>
        </div>

        <p
          style={{ lineHeight: "1.7", color: "darkgrey", fontSize: "0.85rem", maxWidth: "380px", textAlign: "center" }}
        >
          I build and study tools at the intersection of computing and education. My work focuses on how digital systems
          can better support and evaluate learning and human cognition.
        </p>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
          {researchInterests.map((tag) => (
            <span
              key={tag}
              style={{
                border: "1px solid darkgrey",
                padding: "2px 10px",
                fontSize: "0.72rem",
                color: "darkgrey",
                letterSpacing: "0.03em",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="aboutLinks">
          <a href="https://github.com/Galaxeo" target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/jhcheok/" target="_blank" rel="noreferrer noopener">
            LinkedIn
          </a>
          <a
            href="https://drive.google.com/file/d/1ruBMpq06NN1lkmKuMDuX4M0W1sTwDbkr/view?usp=sharing"
            target="_blank"
            rel="noreferrer noopener"
          >
            CV
          </a>
          <a href="mailto:hwjustincheok@gmail.com">Email</a>
        </div>

        <p style={{ fontSize: "0.72rem", color: "darkgrey", letterSpacing: "0.03em" }}>
          keyboards &nbsp;·&nbsp;{" "}
          <span onClick={navigateToBadminton} style={{ cursor: "pointer" }}>
            badminton
          </span>
          &nbsp;·&nbsp; weightlifting
        </p>
      </div>
    </>
  );
}
export default About;
