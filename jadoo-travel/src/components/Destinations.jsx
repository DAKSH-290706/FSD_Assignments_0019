import React from "react";

const destinations = [
  {
    name: "Rome, Italy",
    price: "$5.4k",
    days: "10 Days Trip",
    image: "/images/rome.jpg",
  },
  {
    name: "London, UK",
    price: "$4.2k",
    days: "12 Days Trip",
    image: "/images/london.jpg",
  },
  {
    name: "Full Europe",
    price: "$15k",
    days: "28 Days Trip",
    image: "/images/europe.jpg",
  },
];

function Destinations() {
  return (
    <section className="destinations" id="destinations">

      <div className="destinations-heading">
        <p>Top Selling</p>
        <h2>Top Destinations</h2>
      </div>

      <div className="destination-container">
        {destinations.map((destination, index) => (
          <div className="destination-card" key={index}>

            <img
              src={destination.image}
              alt={destination.name}
            />

            <div className="destination-info">

              <div className="destination-title">
                <h3>{destination.name}</h3>
                <span>{destination.price}</span>
              </div>

              <p>
                <span>➤</span> {destination.days}
              </p>

            </div>

          </div>
        ))}
      </div>

    </section>
  );
}

export default Destinations;