import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Checklist from "./SubPages/Checklist";
import Inventory from "./SubPages/Inventory";
import ResetPassword from "./ResetPassword";
import LoginSignUp from "./LoginSignUp";
import CreateGroupContainer from './CreateGroupContainer'; // Changed import to CreateGroupContainer
import JoinGroup from './JoinGroup';

const App = () => {
  const [user, setUser] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleLoginSuccess = (user) => {
    setUser(user);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };


  return (
    <div>
      <Navbar user={user} />
      <CreateGroupContainer />
      <JoinGroup />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checklist" element={<Checklist />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/auth" element={<LoginSignUp closePopup={closePopup} onLoginSuccess={handleLoginSuccess} />} />
      </Routes>
    </div>
  );
};

export default App;
