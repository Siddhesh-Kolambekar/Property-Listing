import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Home";
import Property from "../Property";
import PropertyDetails from "../PropertyDetails";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../../../src/App.css"

const Parent = () => {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Property />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default Parent;
