import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import "./Header.css";
import logo from "../../assets/newsexplorerlogowhite.png";

function Header({}) {
  return (
    <header className="header">
      <NavLink className="header__logo"></NavLink>
    </header>
  );
}
