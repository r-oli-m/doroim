import "./LoginSignUp.css";
/*
import user_icon from "./assets/user.png";
import email_icon from "./assets/email.png";
import password_icon from "./assets/password.png";
*/
import { useState } from "react"; // Removed unused import
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const LoginSignUp = ({ closePopup, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [registrationError, setRegistrationError] = useState(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetPasswordError, setResetPasswordError] = useState(null);
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(null);
  const [action, setAction] = useState("Sign Up");
  const navigate = useNavigate();
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const firestore = getFirestore();

  const formatErrorMessage = (errorMessage) => {
    return errorMessage
      .replace(/Firebase: Error \(auth\/|-\b/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase())
      .replace(").", "");
  };

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = userCredential.user;
      newUser.displayName = displayName;

      // Check if the user document already exists in Firestore
      const userDocRef = doc(firestore, "users", newUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // Create a new document for the user with their UID as the document ID
        await setDoc(userDocRef, {
          displayName: newUser.displayName,
          email: newUser.email,
          // Add other fields as needed
        });
      }

      setRegistrationError(null);
      onLoginSuccess(newUser); // Pass user info to parent component
      closePopup();
      navigate("/checklist");
    } catch (error) {
      console.error("Registration error:", formatErrorMessage(error.message));
      setLoginError(formatErrorMessage(error.message));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const google_user = result.user;

      console.log("Google user logged in:", google_user);

      // Check if the user document already exists in Firestore
      const userDocRef = doc(firestore, "users", google_user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // Create a new document for the user with their UID as the document ID
        await setDoc(userDocRef, {
          displayName: google_user.displayName,
          email: google_user.email,
          // Add other fields as needed
        });
      }

      // Call the handleGoogleLoginSuccess function passed from Navbar
      onLoginSuccess(google_user);

      // Redirect or perform other actions after successful login
    } catch (error) {
      console.error("Google login error:", error.message);
      // Handle login errors (e.g., display an error message to the user)
    }
  };

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setResetPasswordError(null);
      setResetPasswordSuccess(
        `Password reset email sent to ${email}. Check your inbox.`
      );
    } catch (error) {
      console.error("Reset pw error:", formatErrorMessage(error.message));
      setResetPasswordError(formatErrorMessage(error.message));
    }
  };

  const switchAction = (newAction) => {
    setLoginError(null);
    setRegistrationError(null);
    setResetPasswordError(null);
    setResetPasswordSuccess(null);
    setAction(newAction);
  };

  const handleInputChange = () => {
    setLoginError(null);
    setRegistrationError(null);
    setResetPasswordError(null);
    setResetPasswordSuccess(null);
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const oldUser = userCredential.user;
      oldUser.displayName = displayName;
      setLoginError(null);
      onLoginSuccess(oldUser); // Pass user info to parent component
      closePopup();
      navigate("/checklist");
    } catch (error) {
      console.error("Login error:", formatErrorMessage(error.message));
      setLoginError(formatErrorMessage(error.message));
    }
  };

  googleProvider.setCustomParameters({
    prompt: "select_account",
  });

  return (
    <div className="container">
      <div className="close-container">
        <span className="close" onClick={closePopup}>
          &times;
        </span>
      </div>
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="three-inputs">
        {action === "Login" ? null : (
          <div className="input">
            <input
              type="text"
              placeholder="Name"
              value={displayName}
              onChange={(e) => {
                handleInputChange();
                setDisplayName(e.target.value);
              }}
            />
          </div>
        )}
        <div className="input">
          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => {
              handleInputChange();
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="input">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              handleInputChange();
              setPassword(e.target.value);
            }}
          />
        </div>
      </div>
      {action === "Sign Up" ? (
        <div
          className="forgot-password"
          onClick={() => setShowForgotPassword(true)}
        >
          Forgot Password? <span> Click Here!</span>
        </div>
      ) : null}
      <div className="error-message">{loginError}</div>
      <div className="error-message">{registrationError}</div>

      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={
            action === "Sign Up"
              ? handleRegister
              : () => switchAction("Sign Up")
          }
        >
          Sign Up
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={
            action === "Login" ? handleLogin : () => switchAction("Login")
          }
        >
          Login
        </div>
      </div>
      {/* --------------------------------------  google login -------------------------------------- */}
      <div className="google-login">
        <button onClick={handleGoogleLogin}>Or Continue with Google</button>
      </div>

      {/* --------------------------------------  ------- -------------------------------------- */}
      {showForgotPassword && (
        <div className="overlay">
          <div className="popup">
            <span
              className="close"
              onClick={() => setShowForgotPassword(false)}
            >
              &times;
            </span>
            <h2>Forgot Password</h2>
            {resetPasswordSuccess ? (
              <div className="success-message">{resetPasswordSuccess}</div>
            ) : (
              <p>
                Enter your email address, and we'll send you a link to reset
                your password.
              </p>
            )}
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="error-message">{resetPasswordError}</div>
            <button onClick={handleForgotPassword}>Send Reset Email</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginSignUp;
