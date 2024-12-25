import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Notes from "./Notes.tsx";
import Svarog from "./Svarog.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/svarog" element={<Svarog />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
