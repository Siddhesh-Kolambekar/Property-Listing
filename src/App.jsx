import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignedOutParent from "./SignedOut/common/Parent";
import SignedInParent from "./SignedUp/common/Parent";
import Login from "./SignedOut/LogIn";
import Home from "./SignedUp/Home";
import Properties from "./SignedUp/Property";
import Agents from "./SignedUp/Agents";
import About from "./SignedUp/About";
import Contact from "./SignedUp/Contact";
import PropertyDetails from "./SignedUp/PropertyDetails";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Signed Out Routes */}
        <Route path="/*" element={<SignedOutParent />} />
        <Route path="home" element={<Home/>}/>
        <Route path="about" element={<About/>}/>
        <Route path="contact" element={<Contact/>}/>
        <Route path="login" element={<Login />} />

        {/* Signed In Routes (Protected) */}
        <Route path="/dashboard/*" element={token ? <SignedInParent /> : <Navigate to="/login" />} />
        <Route path="home" element={<Home />} />
        <Route path="properties" element={<Properties />} />
        <Route path="agents" element={<Agents />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="property-details/:id" element={<PropertyDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
