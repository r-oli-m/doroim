import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
// Import the Firebase functionalities directly from firebase.js
import { auth, googleProvider, firestore } from "./auth/firebase";

// Import pages and components
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Navbar from "./Navbar";
import Checklist from "./SubPages/Checklist";
import Inventory from "./SubPages/Inventory";
import ResetPassword from "./auth/ResetPassword";
import LoginSignUp from "./auth/LoginSignUp";

const App = () => {
  const [user, setUser] = useState(null);
  const [setPopupOpen] = useState(false);

  const handleLoginSuccess = (user) => {
    setUser(user);
  };
  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checklist" element={<Checklist />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/groups" element={<Contact />} user={user} />
        <Route path="/about" element={<About />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/auth"
          element={
            <LoginSignUp
              closePopup={closePopup}
              onLoginSuccess={handleLoginSuccess}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
