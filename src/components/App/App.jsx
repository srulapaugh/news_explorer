import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "../Header/Header";
import Main from "../Main/Main";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import RegistrationSuccessModal from "../RegistrationSuccessModal/RegistrationSuccessModal";
import Footer from "../Footer/Footer";

import { searchArticles } from "../../utils/newsApi";

function App() {
  const [activeModal, setActiveModal] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: "" });

  const [articles, setArticles] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [hasSearchError, setHasSearchError] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [savedArticles, setSavedArticles] = useState([]);

  const handleOpenModal = (modalName) => {
    setRegisterError("");
    setActiveModal(modalName);
  };

  const handleCloseModal = () => {
    setRegisterError("");
    setActiveModal("");
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscape = (evt) => {
      if (evt.key === "Escape") handleCloseModal();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [activeModal]);

  const handleRegistration = ({ email }) => {
    if (email === "example@test.com") {
      setRegisterError("This email is not available");
      return;
    }

    setRegisterError("");
    handleOpenModal("success");
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    setCurrentUser({ name: "" });
    setIsLoggedIn(true);
    handleCloseModal();
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
    setHasSearchError(false);
    setArticles([]);

    searchArticles(keyword)
      .then(setArticles)
      .catch((err) => {
        console.error(err);
        setHasSearchError(true);
      })
      .finally(() => setIsLoading(false));
  };

  const handleSaveArticle = (article) => {
    if (!isLoggedIn) {
      handleOpenModal("login");
      return;
    }

    setSavedArticles((prev) =>
      prev.some((a) => a.url === article.url)
        ? prev.filter((a) => a.url !== article.url)
        : [...prev, { ...article, keyword: searchKeyword }],
    );
  };

  return (
    <div className="app">
      <Header
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onSignInClick={() => handleOpenModal("login")}
        onSignOut={handleSignOut}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Main
              articles={articles}
              isLoading={isLoading}
              hasSearched={hasSearched}
              savedArticles={savedArticles}
              isLoggedIn={isLoggedIn}
              onSearch={handleSearch}
              onSaveArticle={handleSaveArticle}
            />
          }
        />
        {/* TODO: add <Route path="/saved-news" element={<SavedNews ... />} /> once SavedNews is built */}
      </Routes>

      <Footer />

      <LoginModal
        isOpen={activeModal === "login"}
        onClose={handleCloseModal}
        onLogin={handleLogin}
        onToggleClick={() => handleOpenModal("register")}
      />
      <RegisterModal
        isOpen={activeModal === "register"}
        onRegister={handleRegistration}
        onClose={handleCloseModal}
        onToggleClick={() => handleOpenModal("login")}
        submitError={registerError}
      />

      <RegistrationSuccessModal
        isOpen={activeModal === "success"}
        onClose={handleCloseModal}
        onSignInClick={() => handleOpenModal("login")}
      />
    </div>
  );
}

export default App;
