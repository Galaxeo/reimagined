import "./App.css";
import headshot from "/assets/headshot.jpg";
import { Github, Linkedin, FileText, Mail } from "lucide-react";

const researchInterests = ["Educational Technology", "Human-Computer Interaction", "Learning Sciences"];

function About() {
  // const navigate = useNavigate();
  // function navigateToBadminton() {
  //   navigate("/badminton");
  // }
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
          I build and study tools at the intersection of computing and education. My work focuses on how technology can
          better support and evaluate learning and human cognition.
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
          {[
            { icon: <Github size={16} />, label: "GitHub", href: "https://github.com/Galaxeo", target: "_blank" },
            {
              icon: <Linkedin size={16} />,
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/jhcheok/",
              target: "_blank",
            },
            {
              icon: <FileText size={16} />,
              label: "Resume",
              href: "https://drive.google.com/file/d/1ruBMpq06NN1lkmKuMDuX4M0W1sTwDbkr/view?usp=sharing",
              target: "_blank",
            },
            { icon: <Mail size={16} />, label: "Email", href: "mailto:hwjustincheok@gmail.com", target: undefined },
          ].map(({ icon, label, href, target }) => (
            <div key={label} className="aboutIconLink">
              <a href={href} target={target} rel={target ? "noreferrer noopener" : undefined}>
                {icon}
              </a>
              <span className="aboutIconLabel">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default About;
