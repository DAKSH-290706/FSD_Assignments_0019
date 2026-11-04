import React, { useState } from "react";

function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email address");
      return;
    }

    alert("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <section className="newsletter">

      <div className="newsletter-send">➤</div>

      <h2>
        Subscribe to get information, latest news and other
        interesting offers about Jadoo
      </h2>

      <form className="newsletter-form" onSubmit={handleSubscribe}>

        <div className="email-input">
          <span>✉</span>

          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit">
          Subscribe
        </button>

      </form>

    </section>
  );
}

export default Newsletter;