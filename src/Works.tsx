// @ts-nocheck
import "./App.css";
import { useState } from "react";
const workDescriptions = [
  {
    title: "Keyboard Data Analysis",
    tools: "Python, Pandas, Matplotlib, Seaborn",
    description:
      "A data analysis project conducted to see if marketing tactics within the mechanical keyboard industry in the early 2010s were able to continue to have effects on sales in the 2020s.",
    link: "https://github.com/Galaxeo/keyboard-data-analysis",
  },
  {
    title: "Futoshiki Solver",
    tools: "Python",
    description:
      "A Python program that solves Futoshiki puzzles using a backtracking & forward checking algorithm.",
    link: "https://github.com/Galaxeo/futoshiki",
  },
  {
    title: "15-Puzzle Solver",
    tools: "Python",
    description:
      "A Python program that solves 15-puzzle problems using the A* algorithm with the Manhattan Distance heuristic.",
    link: "https://github.com/Galaxeo/15-puzzle",
  },
  {
    title: "Pokemon Memory Game",
    tools: "JavaScript, React, Vite",
    description:
      "A memory game built using React and Vite focusing on the utilization of useEffect by dealing with external sources like the PokéAPI.",
    link: "https://github.com/Galaxeo/memory-game",
    demo: "https://galaxeo.github.io/memory-game/",
  },
  {
    title: "CV/Resume Maker",
    tools: "JavaScript, React, Vite",
    description: "A CV/Resume maker built using React and Vite",
    link: "https://github.com/Galaxeo/cv-applicationk",
    demo: "https://galaxeo.github.io/cv-application/",
  },
  {
    title: "SAP Script (Artemis Networks)",
    tools: "Python",
    description:
      "A Python script that accepts phone IDs or the IPs of phones and returns their location within the SAP stadium. Reduced the time it took to locate phones from 30 minutes to mere seconds.",
    link: "https://github.com/Galaxeo/SAP-script",
  },
  {
    title: "Website (Version 1.0)",
    tools: "HTML, CSS",
    description:
      "The first version of my personal website, utilizing vanilla HTML and CSS, designed from the ground up to be responsive and mobile-friendly.",
    link: "https://github.com/Galaxeo/webpage",
  },
  {
    title: "Basketball Data Analysis",
    tools: "Python, Pandas, Numpy, Matplotlib",
    description:
      "A data analysis project conducted to test whether or not monikers given to certain basketball players based on their performance in the playoffs were accurate.",
    link: "https://github.com/Galaxeo/basketballproject",
  },
  {
    title: "To-do List Web Application",
    tools: "HTML, CSS, JavaScript, Webpack",
    description:
      "A to-do list web application built using HTML, CSS, and JavaScript. The main focus of this project was to become familiar with the webpack module builder in order to separate and bundle the JS files.",
    link: "https://github.com/Galaxeo/todo-list",
    demo: "https://galaxeo.github.io/todo-list/",
  },
  {
    title: "The Odin Project repository",
    tools: "HTML, CSS, JavaScript, React",
    description:
      "A repository of all the projects I've completed from The Odin Project's full stack curriculum.",
    link: "https://github.com/Galaxeo/odin",
  },
  {
    title: "3D Portfolio",
    tools: "React, Vite, Three.js (React-Three-Fiber)",
    description:
      "A 3D iteration of my portfolio, made to be interactive and visually appealing.",
    link: "https://github.com/Galaxeo/3d-gallery",
    demo: "https://nimble-daffodil-21602f.netlify.app/",
  },
  {
    title: "Portfolio (Version 2.0)",
    tools: "React, Vite, TypeScript, CSS, HTML",
    description:
      "The second version of my personal website, built using React, Vite, and TypeScript.",
    link: "https://github.com/Galaxeo/reimagined",
  },
];
function Works() {
  const imagePaths = Array.from(
    { length: 12 },
    (_, i) => `/assets/Works/${i + 1}.webp`
  );
  const [selectedImage, setSelectedImage] = useState(null);
  const handleSelectedImage = (i) => {
    setSelectedImage(i);
  };

  return (
    <>
      <div
        className="worksInfoLayer"
        onClick={() => {
          handleSelectedImage(null);
        }}
      >
        {selectedImage != null && (
          <>
            <div className="workInfo">
              <img className="workImg" src={imagePaths[selectedImage]}></img>
              <div className="workDesc">
                <p style={{ fontSize: ".75rem", color: "grey" }}>Project</p>
                <p style={{ fontSize: "1.5rem" }}>
                  {workDescriptions[selectedImage].title}
                </p>
                <p style={{ fontSize: ".75rem", color: "grey" }}>Tools</p>
                <p>{workDescriptions[selectedImage].tools}</p>
                <p style={{ fontSize: ".75rem", color: "grey" }}>Description</p>
                <p>{workDescriptions[selectedImage].description}</p>
                <div className="workHelpers">
                  <a
                    href={workDescriptions[selectedImage].link}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Repo
                  </a>
                  {workDescriptions[selectedImage].demo && (
                    <a
                      href={workDescriptions[selectedImage].demo}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Demo
                    </a>
                  )}
                </div>
                <p
                  style={{ marginTop: "10px" }}
                  className="workInfoClose"
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
      <div className="works">
        <div className="worksCont">
          {imagePaths.map((url, i) => {
            return (
              <img
                key={i}
                src={url}
                className="worksPreview"
                onClick={() => {
                  handleSelectedImage(i);
                }}
              ></img>
            );
          })}
        </div>
        <a
          className="kbCommissions"
          href={"https://github.com/galaxeo"}
          target="_blank"
          rel="noreferrer noopener"
        >
          github
        </a>
      </div>
    </>
  );
}

export default Works;
