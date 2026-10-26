import { NavLink } from "react-router-dom";

import logoutIconLight from "../../assets/logout-light.png";
import logoutIconDark from "../../assets/logout-dark.png";

import "./Navigation.css";

function Navigation({
  isLoggedIn,
  currentUser,
  isOpen,
  onLinkClick,
  onSignInClick,
  onSignOut,
}) {
  const getLinkClass = ({ isActive }) =>
    isActive ? "navigation__link navigation__link_active" : "navigation__link";

  return (
    <nav
      className={isOpen ? "navigation navigation_opened" : "navigation"}
      title="Main"
    >
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink to="/" end className={getLinkClass} onClick={onLinkClick}>
            Home
          </NavLink>
        </li>

        {isLoggedIn && (
          <li className="navigation__item">
            <NavLink
              to="/saved-news"
              className={getLinkClass}
              onClick={onLinkClick}
            >
              Saved articles
            </NavLink>
          </li>
        )}
      </ul>

      {isLoggedIn ? (
        <button
          type="button"
          className="navigation__button"
          onClick={onSignOut}
        >
          {currentUser.name}
          {}
          <img
            className="navigation__icon navigation__icon_theme_light"
            src={logoutIconLight}
            alt="Logout"
          />
          <img
            className="navigation__icon navigation__icon_theme_dark"
            src={logoutIconDark}
            alt="Logout"
          />
        </button>
      ) : (
        <button
          type="button"
          className="navigation__button"
          onClick={onSignInClick}
        >
          Sign in
        </button>
      )}
    </nav>
  );
}

export default Navigation;
