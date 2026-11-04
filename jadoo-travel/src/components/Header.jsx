import React from "react";

function Header() {
  return (
    <header className="header">
      <div className="logo">Jadoo<span>.</span></div>

      <nav className="navigation">
        <a href="#destinations">Destinations</a>
        <a href="#services">Hotels</a>
        <a href="#booking">Flights</a>
        <a href="#booking">Bookings</a>
      </nav>

      <div className="header-actions">
        <a href="#login" className="login-link">Login</a>
        <a href="#signup" className="signup-button">Sign up</a>
        <button className="language-button">EN <span>⌄</span></button>
      </div>
    </header>
  );
}

export default Header;