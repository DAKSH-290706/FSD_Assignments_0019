import { useState } from "react";
import "./App.css";

function App() {
  const [participant, setParticipant] = useState({
    studentName: "",
    email: "",
    contact: "",
    university: "",
    accessCode: "",
    session: "",
  });

  const [message, setMessage] = useState("");

  const changeInput = (e) => {
    const { name, value } = e.target;

    setParticipant({
      ...participant,
      [name]: value,
    });
  };

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const registerParticipant = (e) => {
    e.preventDefault();

    if (
      !participant.studentName ||
      !participant.email ||
      !participant.contact ||
      !participant.university ||
      !participant.accessCode ||
      !participant.session
    ) {
      showMessage(" Please enter all the required information.");
      return;
    }

    if (!participant.email.includes("@")) {
      showMessage(" Please enter a correct email address.");
      return;
    }

    if (participant.contact.length !== 10) {
      showMessage(" Contact number must have 10 digits.");
      return;
    }

    if (participant.accessCode.length < 6) {
      showMessage(" Access code must contain at least 6 characters.");
      return;
    }

    showMessage(" Your seat has been successfully reserved!");

    console.log("Workshop Registration:", participant);

    setParticipant({
      studentName: "",
      email: "",
      contact: "",
      university: "",
      accessCode: "",
      session: "",
    });
  };

  const openRegistration = () => {
    document
      .getElementById("signup")
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="page">

      {message && (
        <div className="message-box">
          {message}
        </div>
      )}

      {/* Navigation Bar */}
      <header className="navbar">

        <div className="logo">
          <h2>SkillSphere </h2>
        </div>

        <nav>
          <a href="#home">Home</a>
          <a href="#programs">Programs</a>
          <a href="#signup">Enroll</a>
        </nav>

      </header>

      {/* Hero Section */}
      <section className="banner" id="home">

        <div className="banner-content">

          <span className="tagline">
            LEARN • BUILD • GROW
          </span>

          <h1>SkillSphere 2026</h1>

          <p>
            Discover practical skills, attend expert-led
            sessions and take the next step toward your
            professional journey.
          </p>

          <button onClick={openRegistration}>
            Reserve Your Seat
          </button>

        </div>

      </section>

      {/* Programs Section */}
      <section className="programs" id="programs">

        <h2>What You Can Learn</h2>

        <p className="program-intro">
          Choose from engaging learning sessions designed
          to help students develop useful modern skills.
        </p>

        <div className="program-list">

          <div className="program-card">

            <span className="program-icon">💻</span>

            <h3>Web Development</h3>

            <p>
              Learn the fundamentals of modern websites,
              interfaces and interactive web applications.
            </p>

          </div>

          <div className="program-card">

            <span className="program-icon"></span>

            <h3>Data Analytics</h3>

            <p>
              Understand data, discover patterns and learn
              how information can support better decisions.
            </p>

          </div>

          <div className="program-card">

            <span className="program-icon"></span>

            <h3>Career Mastery</h3>

            <p>
              Improve your communication, presentation and
              professional skills for future opportunities.
            </p>

          </div>

        </div>

      </section>

      {/* Registration Section */}
      <section className="signup-section" id="signup">

        <div className="signup-card">

          <h2>Workshop Enrollment</h2>

          <p>
            Complete the form below to register for your
            preferred learning session.
          </p>

          <form onSubmit={registerParticipant}>

            <label>Student Name</label>

            <input
              type="text"
              name="studentName"
              placeholder="Enter your name"
              value={participant.studentName}
              onChange={changeInput}
            />

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={participant.email}
              onChange={changeInput}
            />

            <label>Contact Number</label>

            <input
              type="tel"
              name="contact"
              placeholder="Enter your contact number"
              value={participant.contact}
              onChange={changeInput}
            />

            <label>University / College</label>

            <input
              type="text"
              name="university"
              placeholder="Enter your institution"
              value={participant.university}
              onChange={changeInput}
            />

            <label>Access Code</label>

            <input
              type="password"
              name="accessCode"
              placeholder="Create an access code"
              value={participant.accessCode}
              onChange={changeInput}
            />

            <label>Choose Session</label>

            <select
              name="session"
              value={participant.session}
              onChange={changeInput}
            >

              <option value="">
                -- Select a session --
              </option>

              <option value="Web Development">
                Web Development
              </option>

              <option value="Data Analytics">
                Data Analytics
              </option>

              <option value="Career Mastery">
                Career Mastery
              </option>

            </select>

            <button type="submit">
              Confirm Enrollment
            </button>

          </form>

        </div>

      </section>

      {/* Footer */}
      <footer className="site-footer">

        <h3>SkillSphere </h3>

        <p>
          Learn something useful. Build something meaningful.
        </p>

        <p>
          © 2026 SkillSphere. All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default App;