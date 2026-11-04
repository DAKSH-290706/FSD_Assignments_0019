import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Destinations from "./components/Destinations";
import BookingSteps from "./components/BookingSteps";
import Testimonials from "./components/Testimonials";
import Partners from "./components/Partners";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <Services />
      <Destinations />
      <BookingSteps />
      <Testimonials />
      <Partners />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;