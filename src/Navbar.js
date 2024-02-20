import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import LoginSignUp from "./auth/LoginSignUp.js";
//images:
import doroLogo from "./doro_logo.png";
import userIcon from "./userIcon.png";

const Navbar = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const handleDropdownToggle2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
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
          <div>
            <Link to="/" className="link">
              home
            </Link>
          </div>
          {isDropdownOpen && (
            <div className="DropdownContent">
              <div>
                <Link className="link" to="/inventory">
                  inventory
                </Link>
              </div>
              <div>
                <Link className="link" to="/checklist">
                  checklist
                </Link>
              </div>
            </div>
          )}
        </div>

        <div>
          <Link className="link" to="/groups">
            groups
          </Link>
        </div>

        <div>
          <Link className="link" to="/about">
            about
          </Link>
        </div>
        {/* --------------------- LOGIN -------------------- */}
        <div className="loginstuff">
          {userProfile ? (
            <div
              className="Dropdown"
              onMouseEnter={handleDropdownToggle2}
              onMouseLeave={handleDropdownToggle2}
            >
              <div>
                <img src={userIcon} width="60vh" alt="Logo" />
              </div>
              {isDropdownOpen2 && (
                <div className="Dropdown2">
                  <div className="userinfo">
                    <p>Name: </p>
                    <p>{userProfile.displayName}</p>
                  </div>
                  <div className="userinfo">
                    <p>Email:</p>
                    <p>{userProfile.email}</p>
                  </div>
                  <button className="logout-btn" onClick={handleLogout}>
                    logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link className="link" onClick={openPopup}>
              login
            </Link>
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
