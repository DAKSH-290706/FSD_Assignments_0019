import React from "react";

const steps = [
  {
    icon: "🟨",
    title: "Choose Destination",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus.",
  },
  {
    icon: "🟧",
    title: "Make Payment",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus.",
  },
  {
    icon: "🟦",
    title: "Reach Airport on Selected Date",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus.",
  },
];

function BookingSteps() {
  return (
    <section className="booking" id="booking">

      <div className="booking-content">

        <p className="booking-subtitle">Easy and Fast</p>

        <h2>
          Book Your Next Trip
          <br />
          In 3 Easy Steps
        </h2>

        <div className="steps-container">
          {steps.map((step, index) => (
            <div className="booking-step" key={index}>

              <div className={`step-icon step-${index + 1}`}>
                {step.icon}
              </div>

              <div className="step-details">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>

            </div>
          ))}
        </div>

      </div>

      <div className="trip-card">

        <img
          src="/images/trip-greece.jpg"
          alt="Trip to Greece"
          className="trip-image"
        />

        <h3>Trip To Greece</h3>

        <p className="trip-date">
          14-29 June | by Robin
        </p>

        <div className="trip-icons">
          <span>♧</span>
          <span>▧</span>
          <span>➤</span>
        </div>

        <div className="trip-people">
          <span>👥</span>
          <p>24 people going</p>
        </div>

        <div className="trip-status">
          <span>📍</span>
          <div>
            <p>Ongoing</p>
            <h4>Trip to Rome</h4>
            <small>40% completed</small>
            <div className="progress-bar">
              <div></div>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}

export default BookingSteps;