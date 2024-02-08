import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import doroLogo from "./doro_logo.png";
function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
          <Link to="/about">Log in</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
