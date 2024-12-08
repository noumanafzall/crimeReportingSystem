import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./menuBar.css"; // Path to your CSS file

const MenuBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
<div className={`menu-container ${menuOpen ? "menu-open" : ""}`}>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰ Menu
      </button>
      <nav className="menu">
        <ul>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/admin_dashboard" onClick={() => setMenuOpen(false)}>Admin Dashboard</Link>
          </li>
          <li>
            <Link to="/admin_login" onClick={() => setMenuOpen(false)}>Admin Login</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MenuBar;
