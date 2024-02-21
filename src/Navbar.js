import React, { useState, useEffect } from 'react';
import './Navbar.css';
import LoginSignUp from './LoginSignUp';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUserProfile(user);
  }, [user]);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleLoginSuccess = (user) => {
    setUserProfile({
      displayName: user.displayName,
      email: user.email
    });
    closePopup();
  };

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      setUserProfile(null);
      // Redirect to login page after logout
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
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
