import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Navigation from "../Navigation/Navigation";

import menuIconLight from "../../assets/menu-light.png";
import menuIconDark from "../../assets/menu-dark.png";
import closeIcon from "../../assets/close.png";

import "./Header.css";

function Header({ isLoggedIn, currentUser, onSignInClick, onSignOut }) {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isSavedPage = pathname === "/saved-news";

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const headerClass = [
    "header",
    isSavedPage && "header_page_saved",
    isMenuOpen && "header_menu_open",
  ]
    .filter(Boolean)
    .join(" ");

  const menuButtonIcon = isMenuOpen
    ? closeIcon
    : isSavedPage
      ? menuIconDark
      : menuIconLight;

  return (
    <header className={headerClass}>
      <div className="header__container">
        <Link to="/" className="header__logo" onClick={closeMenu}>
          NewsExplorer
        </Link>

        <button
          type="button"
          className="header__menu-button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          <img className="header__menu-icon" src={menuButtonIcon} alt="" />
        </button>

        <Navigation
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          isOpen={isMenuOpen}
          onLinkClick={closeMenu}
          onSignInClick={() => {
            closeMenu();
            onSignInClick();
          }}
          onSignOut={() => {
            closeMenu();
            onSignOut();
          }}
        />
      </div>
    </header>
  );
}

export default Header;
