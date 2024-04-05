import { useRef } from "react";
import "./App.css";
import headshot from "/assets/headshot.jpg";

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
        <img src={headshot}></img>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p>
            I'm a full-stack developer based in the Bay Area, CA, currently
            working as a software engineer at Reactor8.{" "}
          </p>
          <p>
            Passionate about front-end development/design and data-driven
            projects.
          </p>
          <p>Building keyboards & weightlifting on the side.</p>
        </div>
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
    </>
  );
}
export default About;
