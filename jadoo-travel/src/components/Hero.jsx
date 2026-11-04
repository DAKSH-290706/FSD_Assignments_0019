import React from "react";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">

        <p className="hero-subtitle">
          BEST DESTINATIONS AROUND THE WORLD
        </p>

        <h1>
          Travel, enjoy
          <br />
          and live a new
          <br />
          and full life
        </h1>

        <p className="hero-description">
          Built Wicket longer admire do barton vanity itself do in it.
          Preferred to sportsmen it engrossed listening. Park gate
          sell they west hard for the.
        </p>

        <div className="hero-buttons">
          <a href="#destinations" className="find-button">
            Find out more
          </a>

          <button className="play-button">
            <span className="play-icon">▶</span>
            Play Demo
          </button>
        </div>

      </div>

      <div className="hero-image">
        <img
          src="/images/hero-traveller.png"
          alt="Traveller with luggage"
        />
      </div>

    </section>
  );
}

export default Hero;