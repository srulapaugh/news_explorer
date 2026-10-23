import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "../Header/Header";
import Main from "../Main/Main";

//import { sampleArticles } from "../../utils/constants";
import "./App.css";

function App() {
  const [activeModal, setActiveModal] = useState("");

  return (
    <div className="app">
      <Header />
      <Main />
    </div>
  );
}

export default App;
