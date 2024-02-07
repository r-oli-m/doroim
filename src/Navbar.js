import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import LoginSignUp from './LoginSignUp';

const Navbar = ({ user }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null); // Initialize userProfile state

  useEffect(() => {
    // Set userProfile state when user prop changes
    setUserProfile(user);
  }, [user]);

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
    console.log('User logged in!', user);
    // Close the popup
    closePopup();
  };

  const handleLogout = () => {
    console.log('User logged out :(', user);
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
