import React, { useState, useEffect } from "react";
import logo from "../../../public/logo.png";
import "../../App.css"; // Import the CSS file

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-content">
        <a href="/" className="logo">
          <img src={logo} alt="Logo" />
          HomeHarbor
        </a>
        <button className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
        <div className={isMobile && isMenuOpen ? "nav-links-mobile" : "nav-links"}>
          <a href="/" className="nav-link">Home</a>
          <a href="/properties" className="nav-link">Properties</a>
          <a href="/agents" className="nav-link">Agents</a>
          <a href="/about" className="nav-link">About</a>
          <a href="/contact" className="nav-link">Contact</a>
          <button className="button">Get Started</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
