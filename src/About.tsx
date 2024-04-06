import { useRef } from "react";
import "./App.css";
import github from "/assets/About/github.png";
import linkedin from "/assets/About/linkedin.png";
import utube from "/assets/About/utube.png";

function About() {
  const imagePaths = Array.from(
    { length: 5 },
    (_, i) => `/assets/About/${i + 1}.jpg`
  );
  const title = useRef(null);
  return (
    <>
      <div className="about">
        <h1 ref={title}>About</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p>
            Full-stack developer based in the Bay Area, CA, currently working as
            a software engineer at Reactor8.{" "}
          </p>
          <p>
            Passionate about front-end development/design and data-driven
            projects.
          </p>
          <p>Building keyboards & weightlifting on the side.</p>
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
            style={{
              color: "white",
              textDecoration: "underline",
            }}
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/jhcheok/"
            target="_blank"
            rel="noreferrer noopener"
            style={{
              color: "white",
              textDecoration: "underline",
            }}
          >
            LinkedIn
          </a>
          <a
            href="https://drive.google.com/file/d/1YCOsxZgn9JpehumWu_langLEVhcbsFm9/view?usp=sharing"
            target="_blank"
            rel="noreferrer noopener"
            style={{
              color: "white",
              textDecoration: "underline",
            }}
          >
            Resume
          </a>
        </div>
      </div>
    </>
  );
}
export default About;
