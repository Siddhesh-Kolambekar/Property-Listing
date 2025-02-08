import {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "../Home";
import Navbar from "./Navbar";
import Footer from "./Footer";
import About from "../About";
import Contact from "../Contact";
import "../../App.css";
import SignIn from "../SignIn";
import LogIn from "../LogIn";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

const Parent = () => {
  return (
    <>
      <ScrollToTop/>
      <div className="container">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/login" element={<LogIn/>}/>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Parent;
