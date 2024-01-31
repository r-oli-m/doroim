// GoogleLogin.js
import React from "react";
import { auth, googleProvider } from "./firebase";
import { signInWithPopup } from "firebase/auth"; // Import signInWithPopup


const GoogleLogin = () => {
  const handleGoogleLogin = async () => {
    try {
      // Sign in with Google
      const result = await signInWithPopup(auth, googleProvider);
      
      // Access user information
      const user = result.user;
      console.log("Google user logged in:", user);

      // Redirect or perform other actions after successful login
    } catch (error) {
      console.error("Google login error:", error.message);
      // Handle login errors (e.g., display an error message to the user)
    }
  };

  return (
    <div className="google-login">
      <h2>Google Login</h2>
      <img src = "/google-logo.png" alt = "Google Logo" />
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
    </div>
  );
};

export default GoogleLogin;
