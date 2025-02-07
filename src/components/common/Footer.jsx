import React, { useState, useEffect } from "react";
import "../../../src/App.css"

const Footer = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">HomeHarbor</h3>
          <p className="footer-link">
            Find your perfect home with our extensive listing of properties across the country.
          </p>
          <div className="social-links">
            <a href="#" className="footer-link">Facebook</a>
            <a href="#" className="footer-link">Twitter</a>
            <a href="#" className="footer-link">Instagram</a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <a href="/properties" className="footer-link">Properties</a>
          <a href="/agents" className="footer-link">Agents</a>
          <a href="/about" className="footer-link">About Us</a>
          <a href="/contact" className="footer-link">Contact</a>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Resources</h3>
          <a href="#" className="footer-link">Blog</a>
          <a href="#" className="footer-link">Market Updates</a>
          <a href="#" className="footer-link">Buying Guide</a>
          <a href="#" className="footer-link">Selling Guide</a>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Contact Us</h3>
          <p className="footer-link">1234 Real Estate Ave</p>
          <p className="footer-link">New York, NY 10001</p>
          <p className="footer-link">Phone: (555) 123-4567</p>
          <p className="footer-link">Email: info@homeharbor.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 HomeHarbor. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
