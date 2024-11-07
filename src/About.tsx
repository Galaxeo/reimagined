import "./App.css";
import icon from "/assets/icon.png";

function About() {
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
          <p>
            Full-stack developer based in the Bay Area, CA, currently working as
            a software engineer at Reactor8.{" "}
          </p>
          <p>
            Passionate about full-stack development and daily improvement.
          </p>
          <p>Building keyboards, badminton, & weightlifting on the side.</p>
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
            href="https://drive.google.com/file/d/1-QUcfhdvOjK8JXWm_yfDs_Df5nz9iogv/view?usp=sharing"
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
