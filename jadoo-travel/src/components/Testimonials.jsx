import React from "react";

function Testimonials() {
  return (
    <section className="testimonials">

      <div className="testimonial-heading">
        <p>TESTIMONIALS</p>
        <h2>
          What People Say
          <br />
          About Us.
        </h2>

        <div className="testimonial-dots">
          <span className="active-dot"></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className="testimonial-content">

        <div className="testimonial-card">

          <div className="customer-avatar">
            <img
              src="/images/customer.jpg"
              alt="Customer"
            />
          </div>

          <p className="review-text">
            "On the Windows talking painted pasture yet its express
            parties use. Sure last upon he same as knew next. Of
            believed or diverted no."
          </p>

          <h3>Mike Taylor</h3>
          <p className="customer-location">
            Lahore, Pakistan
          </p>

        </div>

        <div className="testimonial-next">
          <span>⌃</span>
          <span>⌄</span>
        </div>

        <div className="next-testimonial">
          <h3>Chris Thomas</h3>
          <p>CEO of Red Button</p>
        </div>

      </div>

    </section>
  );
}

export default Testimonials;