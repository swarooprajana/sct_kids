import React, { useState } from "react";
import { FaSearch, FaHeart, FaBell, FaUser } from "react-icons/fa";
import "./Navbar.scss";
 
const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
 
  return (
<nav className={`navbar ${darkMode ? "dark" : ""}`}>
<div className="logo">Giggle<span>Play</span></div>
<ul className="nav-links">
<li><a href="#" className="active">Home</a></li>
<li><a href="#">Category</a></li>
<li><a href="#">Game</a></li>
<li><a href="#">Subscription</a></li>
</ul>
<div className="nav-icons">
<FaSearch />
<FaHeart />
<FaBell />
<FaUser />
<div className="toggle-switch" onClick={() => setDarkMode(!darkMode)}>
<div className={`toggle-btn ${darkMode ? "active" : ""}`}></div>
</div>
</div>
</nav>
  );
};
 
export default Navbar;