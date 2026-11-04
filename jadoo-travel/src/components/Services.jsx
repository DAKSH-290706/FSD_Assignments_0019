import React from "react";

const services = [
  {
    icon: "🌤️",
    title: "Calculated Weather",
    description:
      "Built Wicket longer admire do barton vanity itself do in it.",
  },
  {
    icon: "✈️",
    title: "Best Flights",
    description:
      "Engrossed listening. Park gate sell they west hard for the.",
  },
  {
    icon: "🎙️",
    title: "Local Events",
    description:
      "Barton vanity itself do in it. Prefer to men it engrossed listening.",
  },
  {
    icon: "⚙️",
    title: "Customization",
    description:
      "We deliver outsourced aviation services for military customers.",
  },
];

function Services() {
  return (
    <section className="services" id="services">

      <div className="services-heading">
        <p>CATEGORY</p>
        <h2>We Offer Best Services</h2>
      </div>

      <div className="services-container">
        {services.map((service, index) => (
          <div className="service-card" key={index}>

            <div className="service-icon">
              {service.icon}
            </div>

            <h3>{service.title}</h3>

            <p>{service.description}</p>

          </div>
        ))}
      </div>

    </section>
  );
}

export default Services;