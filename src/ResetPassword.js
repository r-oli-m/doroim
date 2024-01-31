// ResetPassword.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { auth } from './firebase';
import {
    verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth'; 

const ResetPassword = () => {
  const location = useLocation();
  const [newPassword, setNewPassword] = useState('');
  const [resetCode, setResetCode] = useState(location.search.split('oobCode=')[1]);
  const [resetError, setResetError] = useState(null);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleResetPassword = async () => {
    try {
      await verifyPasswordResetCode(auth, resetCode);
      await confirmPasswordReset(auth, resetCode, newPassword);
      setResetSuccess(true);
    } catch (error) {
      setResetError(error.message);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {resetSuccess ? (
        <p>Password reset successful. You can now login with your new password.</p>
      ) : (
        <>
          <p>Enter your new password:</p>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handleResetPassword}>Reset Password</button>
          {resetError && <p>{resetError}</p>}
        </>
      )}
    </div>
  );
};

export default ResetPassword;
