import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "../Header/Header";
import Main from "../Main/Main";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import Footer from "../Footer/Footer";

//import { sampleArticles } from "../../utils/constants";
import "./App.css";

function App() {
  const [activeModal, setActiveModal] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser] = useState({ name: "" });

  const [articles, setArticles] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [registerError, setRegisterError] = useState("");

  const handleRegistration = ({ email }) => {
    if (email === "example@test.com") {
      setRegisterError("This email is not available");
      return;
    }

    setRegisterError("");
    handleOpenModal("login");
  };

  const handleOpenModal = (modalName) => setActiveModal(modalName);
  const handleCloseModal = () => setActiveModal("");

  useEffect(() => {
    if (!activeModal) return;

    const handleEscape = (evt) => {
      if (evt.key === "Escape") handleCloseModal();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [activeModal]);

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

  const handleRegister = () => handleOpenModal("login");

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
      <Header
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onSignInClick={() => handleOpenModal("login")}
        onSignOut={handleSignOut}
      />
      <Main
        articles={articles}
        isLoading={isLoading}
        hasSearched={hasSearched}
        // savedArticles={savedArticles}
        //onSearch={onSearch}
        //onSaveArticle={onSaveArticle}
      />
      <Footer />

      <LoginModal
        isOpen={activeModal === "login"}
        onClose={handleCloseModal}
        onLogin={handleLogin}
        onToggleClick={() => handleOpenModal("register")}
      />
      <RegisterModal
        isOpen={activeModal === "register"}
        onRegister={handleRegister}
        onClose={handleCloseModal}
        onToggleClick={() => handleOpenModal("login")}
        submitError={registerError}
      />
    </div>
  );
}

export default App;
