import React, { useState } from 'react';
import GoogleLogin from './GoogleLogin';
import Login from './Login';
import Register from './Register';

const AuthSection = ({ closePopup }) => {
  return (
    <div className="auth-section">
      <h2>Welcome!</h2>
      <div className="auth-buttons">
        <GoogleLogin />
        <Login />
        <Register />
      </div>
      <button onClick={closePopup} className="close-button">
        Close
      </button>
    </div>
  );
};

export default AuthSection;
