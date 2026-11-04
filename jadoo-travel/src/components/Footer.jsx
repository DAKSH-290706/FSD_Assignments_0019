import React from "react";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <h2>Jadoo<span>.</span></h2>

          <p>
            Book your trip in minutes, get full
            control for much longer.
          </p>
        </div>

        {/* Company */}
        <div className="footer-column">
          <h3>Company</h3>
          <a href="#about">About</a>
          <a href="#careers">Careers</a>
          <a href="#mobile">Mobile</a>
        </div>

        {/* Contact */}
        <div className="footer-column">
          <h3>Contact</h3>
          <a href="#help">Help/FAQ</a>
          <a href="#press">Press</a>
          <a href="#affiliates">Affiliates</a>
        </div>

        {/* More */}
        <div className="footer-column">
          <h3>More</h3>
          <a href="#airlines">Airlinefees</a>
          <a href="#airline">Airline</a>
          <a href="#lowfare">Low fare tips</a>
        </div>

        {/* Social and Apps */}
        <div className="footer-social">

          <div className="social-icons">
            <a href="#facebook">f</a>
            <a href="#instagram">◎</a>
            <a href="#twitter">♥</a>
          </div>

          <h3>Discover our app</h3>

          <div className="app-buttons">
            <a href="#google-play">
              <span>▶</span>
              <div>
                <small>GET IT ON</small>
                <strong>Google Play</strong>
              </div>
            </a>

            <a href="#app-store">
              <span>●</span>
              <div>
                <small>Download on the</small>
                <strong>App Store</strong>
              </div>
            </a>
          </div>

        </div>

      </div>

      <p className="footer-copyright">
        All rights reserved@jadoo.co
      </p>

    </footer>
  );
}

export default Footer;