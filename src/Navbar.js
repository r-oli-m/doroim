import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import doroLogo from "./doro_logo.png";
import LoginSignUp from "./auth/LoginSignUp.js";

const Navbar = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
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
      email: user.email,
    });
    console.log("User logged in!", user);
    // Close the popup
    closePopup();
  };

  const handleLogout = () => {
    console.log("User logged out :(", user);
    setUserProfile(null);
  };

  return (
    <div className="Navbar">
      <div className="title">
        <img src={doroLogo} width="350vh" alt="Logo" />
      </div>

      <div className="right">
        <div
          className="Dropdown"
          onMouseEnter={handleDropdownToggle}
          onMouseLeave={handleDropdownToggle}
        >
          <div className="link">
            <Link to="/">home</Link>
          </div>
          {isDropdownOpen && (
            <div className="DropdownContent">
              <div className="link">
                <Link to="/inventory">inventory</Link>
              </div>
              <div className="link">
                <Link to="/checklist">checklist</Link>
              </div>
            </div>
          )}
        </div>

        <div className="link">
          <Link to="/contact">contact</Link>
        </div>

        <div className="link">
          <Link to="/about">about</Link>
        </div>

        <div className="link">
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
              <LoginSignUp
                closePopup={closePopup}
                onLoginSuccess={handleLoginSuccess}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
