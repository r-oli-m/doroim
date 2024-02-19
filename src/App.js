// App.js
import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import "./App.css";
//pages:
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Navbar from "./Navbar";
//sub pages:
import Checklist from "./SubPages/Checklist";
import Inventory from "./SubPages/Inventory";
//auth:
import ResetPassword from "./auth/ResetPassword";
import LoginSignUp from "./auth/LoginSignUp";
import CreateGroup from './auth/CreateGroup';
import JoinGroup from './auth/JoinGroup';


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
      <Navbar user={user}/>
      {/* 
      <CreateGroup user={user}/>
      <JoinGroup /> */}
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
