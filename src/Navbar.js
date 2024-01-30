import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import AuthSection from './AuthSection';

const Navbar = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div className="Navbar">
      {/* Your existing code */}
      <button onClick={openPopup}>Login</button>

      {isPopupOpen && (
        <div className="PopupBackground">
          <AuthSection closePopup={closePopup} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
