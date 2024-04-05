import { useState, useRef } from "react";
import "./App.css";
import headshot from "/assets/headshot.jpg";

function About() {
  const title = useRef(null);
  return (
    <>
      <div className="about">
        <h1 ref={title}>About</h1>
        <img src={headshot}></img>
        <p>
          I'm a full-stack developer based in the Bay Area, CA, currently
          working as a software engineer at Reactor8. Passionate about front-end
          development/design and data-driven projects. Building keyboards &
          weightlifting on the side.
        </p>
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
