import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import App from "./App";
import { getAuth, signOut } from "firebase/auth";

const clearUserAuthenticationState = async () => {
  try {
    const auth = getAuth();
    await signOut(auth);
  } catch (error) {
    console.error("Error clearing user authentication state:", error);
  }
};

// Wait for the user state to be cleared before rendering the app
clearUserAuthenticationState().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
  );
});