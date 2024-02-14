// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Checklist from "./SubPages/Checklist";
import Inventory from "./SubPages/Inventory";
import GoogleLogin from "./GoogleLogin";
import ResetPassword from "./ResetPassword";
import LoginSignUp from "./LoginSignUp";
import CreateGroup from './CreateGroup';
import JoinGroup from './JoinGroup';

const App = () => {
  const [user, setUser] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null); // Initialize userProfile state


  const handleLoginSuccess = (user) => {
    setUser(user);
  };
  const openPopup = () => {
    setPopupOpen(true);
  };
  const closePopup = () => {
    setPopupOpen(false);
  };
  

  return (
    <div>
      <Navbar user={user}/>
      <CreateGroup />
      <JoinGroup />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checklist" element={<Checklist />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/google-login" element={<GoogleLogin />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/auth" element={<LoginSignUp closePopup={closePopup} onLoginSuccess={handleLoginSuccess} />} />
      </Routes>
    </div>
  );
};

export default App;
