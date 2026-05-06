/* ============================================
   Footer Component
   - Displayed at the bottom of every page
   - Contains quick links, contact info, social
   ============================================ */

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer" id="main-footer">
      <div className="footer__container">
        {/* Brand Section */}
        <div className="footer__section">
          <h3 className="footer__brand">
            🚗 car<span className="footer__accent">Go</span>
          </h3>
          <p className="footer__description">
            Premium car rental service offering the finest vehicles for every occasion. Experience luxury on the road.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer__section">
          <h4 className="footer__title">Quick Links</h4>
          <ul className="footer__links">
            <li><Link to="/" className="footer__link">Home</Link></li>
            <li><Link to="/cars" className="footer__link">Our Cars</Link></li>
            <li><Link to="/booking" className="footer__link">Book Now</Link></li>
            <li><Link to="/contact" className="footer__link">Contact Us</Link></li>
            <li><Link to="/track" className="footer__link">Track Your Ride</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer__section">
          <h4 className="footer__title">Contact</h4>
          <ul className="footer__links">
            <li className="footer__info">📍 Gandhipuram Bus Stand, Coimbatore</li>
            <li className="footer__info">📞 +91 98765 43210</li>
            <li className="footer__info">✉️ cargo@gmail.com</li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="footer__section">
          <h4 className="footer__title">Follow Us</h4>
          <div className="footer__socials">
            <a href="#" className="footer__social" aria-label="Facebook">📘</a>
            <a href="#" className="footer__social" aria-label="Twitter">🐦</a>
            <a href="#" className="footer__social" aria-label="Instagram">📸</a>
            <a href="#" className="footer__social" aria-label="YouTube">▶️</a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="footer__bottom">
        <p>&copy; 2026 carGo. All rights reserved. | Built for Student Project</p>
      </div>
    </footer>
  );
};

export default Footer;
