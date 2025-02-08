import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignedOutParent from "./SignedOut/common/Parent";
import SignedInParent from "./SignedUp/common/Parent";
import Login from "./SignedOut/LogIn";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Default route - Show SignedOut Parent */}
        <Route path="*" element={<SignedOutParent />} />

        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* SignedIn Parent - Protected Route */}
        <Route
          path="/dashboard/*"
          element={token ? <SignedInParent /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
