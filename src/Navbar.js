import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import LoginSignUp from './LoginSignUp';

const Navbar = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null); // Initialize userProfile state

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleLoginSuccess = (user) => {
    // Update the userProfile state with user data
    setUserProfile({
      displayName: user.displayName,
      email: user.email
    });
    // Close the popup
    closePopup();
  };

  const handleLogout = () => {
    // Clear userProfile state
    setUserProfile(null);
  };

  return (
    <div className="Navbar">
      {userProfile ? (
        <div className="UserProfile">
          <p>Name: {userProfile.displayName}</p>
          <p>Email: {userProfile.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={openPopup}>Login</button>
      )}

      {isPopupOpen && (
        <div className="PopupBackground">
          <LoginSignUp closePopup={closePopup} onLoginSuccess={handleLoginSuccess} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
