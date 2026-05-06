/* ============================================
   Navbar Component
   - Responsive navigation bar on all pages
   - Shows links to Home, Cars, Booking, Contact
   - Displays login/logout button based on auth
   - Hamburger menu for mobile devices
   ============================================ */

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn, user, logout } = useAppContext();
  const location = useLocation();

  // Add scroll effect to change navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Check if the current path matches the link
  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`} id="main-navbar">
      <div className="navbar__container">
        {/* Brand Logo */}
        <Link to="/" className="navbar__brand" id="navbar-brand">
          <span className="navbar__logo-icon">🚗</span>
          <span className="navbar__logo-text">
            car<span className="navbar__logo-accent">Go</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`} id="navbar-links">
          <li>
            <Link to="/" className={`navbar__link ${isActive("/") ? "navbar__link--active" : ""}`} id="nav-home">
              Home  
            </Link>
          </li>
          <li>
            <Link to="/cars" className={`navbar__link ${isActive("/cars") ? "navbar__link--active" : ""}`} id="nav-cars">
              Cars
            </Link>
          </li>
          <li>
            <Link to="/booking" className={`navbar__link ${isActive("/booking") ? "navbar__link--active" : ""}`} id="nav-booking">
              Booking
            </Link>
          </li>
          <li>
            <Link to="/about" className={`navbar__link ${isActive("/about") ? "navbar__link--active" : ""}`} id="nav-about">
              About
            </Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link to="/my-bookings" className={`navbar__link ${isActive("/my-bookings") ? "navbar__link--active" : ""}`} id="nav-my-bookings">
                My Bookings
              </Link>
            </li>
          )}
          <li>
            <Link to="/contact" className={`navbar__link ${isActive("/contact") ? "navbar__link--active" : ""}`} id="nav-contact">
              Contact
            </Link>
          </li>
          <li className="navbar__auth-mobile">
            {isLoggedIn ? (
              <div className="navbar__user-info" style={{ textAlign: 'center' }}>
                <div className="navbar__user-name" style={{ fontWeight: 'bold' }}>👤 {user?.name}</div>
                <div className="navbar__user-email" style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.5rem' }}>{user?.email}</div>
                <button onClick={logout} className="navbar__btn navbar__btn--logout" id="nav-logout-mobile">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="navbar__btn navbar__btn--login" id="nav-login-mobile">
                Login / Register
              </Link>
            )}
          </li>
        </ul>

        {/* Auth Button (Desktop) */}
        <div className="navbar__auth-desktop">
          {isLoggedIn ? (
            <div className="navbar__user-info" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', lineHeight: '1.2' }}>
              <span className="navbar__user-name" style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>👤 {user?.name}</span>
              <span className="navbar__user-email" style={{ fontSize: '0.7rem', opacity: 0.7 }}>{user?.email}</span>
              <button onClick={logout} className="navbar__btn navbar__btn--logout" id="nav-logout" style={{ marginTop: '4px' }}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="navbar__btn navbar__btn--login" id="nav-login">
              Login / Register
            </Link>
          )}
        </div>

        {/* Hamburger Menu Button */}
        <button
          className={`navbar__hamburger ${menuOpen ? "navbar__hamburger--active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          id="navbar-hamburger"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
