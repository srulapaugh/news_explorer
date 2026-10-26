import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "../Header/Header";
import Main from "../Main/Main";
//import LoginModal from "../LoginModal/LoginModal";
//import RegisterModal from "../RegisterModal/RegisterModal";

//import { sampleArticles } from "../../utils/constants";
import "./App.css";

function App() {
  const [activeModal, setActiveModal] = useState("");

  const [articles, setArticles] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleRegistration = ({ name, avatar, email, password }) => {
    signup({ name, avatar, email, password })
      .then(() => handleLogin({ email, password }))
      .catch(console.error);
  };

  const handleOpenModal = (modalName) => setActiveModal(modalName);
  const closeActiveModal = () => setActiveModal("");

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    return signin({ email, password })
      .then((res) => {
        if (!res.token) {
          return;
        }
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        closeActiveModal();
        return checkToken(res.token);
      })
      .then((userData) => {
        if (userData) {
          setCurrentUser(userData);
        }
      })
      .catch(console.error);
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
  };

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    setHasSearched(true);
    setIsLoading(true);

    setTimeout(() => {
      setArticles(sampleArticles);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="app">
      <Header />
      <Main
        articles={articles}
        isLoading={isLoading}
        hasSearched={hasSearched}
        // savedArticles={savedArticles}
        //onSearch={onSearch}
        //onSaveArticle={onSaveArticle}
      />
      {/*
      <RegisterModal
        isOpen={activeModal === "register"}
        onRegister={handleRegistration}
        onClose={closeActiveModal}
        onSwitchModal={() => handleOpenModal("login")}
      />
      <LoginModal
        isOpen={activeModal === "login"}
        onLogin={handleLogin}
        onClose={closeActiveModal}
        onSwitchModal={() => handleOpenModal("register")}
      />{" "}
      */}
    </div>
  );
}

export default App;
