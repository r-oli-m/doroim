import "./LoginSignUp.css";
import user_icon from "./assets/user.png";
import email_icon from "./assets/email.png";
import password_icon from "./assets/password.png";
import GoogleLogin from "./GoogleLogin";
import { useState, useEffect } from "react"; // Added useEffect
import { useNavigate } from "react-router-dom";
import "./Navbar";
import { auth } from "./firebase";
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
} from "firebase/auth";

const LoginSignUp = ({ closePopup }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLoginSignUp, setShowLoginSignUp] = useState(true);
    const [action, setAction] = useState("Sign Up");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(null);
    const [registrationError, setRegistrationError] = useState(null);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetPasswordError, setResetPasswordError] = useState(null);
    const [resetPasswordSuccess, setResetPasswordSuccess] = useState(null);
    const navigate = useNavigate();
    const [displayName, setDisplayName] = useState("");
    

    const formatErrorMessage = (errorMessage) => {
        return errorMessage
            .replace(/Firebase: Error \(auth\/|-\b/g, ' ') // Replace 'Firebase: Error (auth/' and dashes with spaces
            .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize the first letter of each word
            .replace(').', ''); // Remove trailing ').' if present
    };



    const handleRegister = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            user.displayName = displayName;
            console.log("User registered:", user);
            console.log("User Name:", user.displayName);
            console.log("User Email:", user.email);
            setRegistrationError(null);
            setIsAuthenticated(true);
            closePopup();
            navigate('/checklist');
        } catch (error) {
            console.error('Registration error:', formatErrorMessage(error.message));
            setLoginError(formatErrorMessage(error.message));
        }
    };

    const handleForgotPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            setResetPasswordError(null);
            setResetPasswordSuccess(`Password reset email sent to ${email}. Check your inbox.`);
        } catch (error) {
            console.error('Reset pw error:', formatErrorMessage(error.message));
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
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            user.displayName = displayName;
            console.log("User Logged In:", user);
            console.log("User Name:", user.displayName);
            console.log("User Email:", user.email);
            setLoginError(null);
            setIsAuthenticated(true);
            closePopup();
            navigate('/checklist');
        } catch (error) {
            console.error('Login error:', formatErrorMessage(error.message));
            setLoginError(formatErrorMessage(error.message));
        }
    };

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
                        <img src={user_icon} alt="" />
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
                    <img src={email_icon} alt="" />
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
                    <img src={password_icon} alt="" />
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
            {action === "Sign Up" ? ( // Fixed condition here
                <div className="forgot-password" onClick={() => setShowForgotPassword(true)}>
                    Forgot Password? <span> Click Here!</span>
                </div>
            ) : null}
            <div className="error-message">{loginError}</div>
            <div className="error-message">{registrationError}</div>

            <div className="submit-container">
                <div
                    className={action === "Login" ? "submit gray" : "submit"}
                    onClick={action === "Sign Up" ? handleRegister : () => switchAction("Sign Up")}
                >
                    Sign Up
                </div>
                <div
                    className={action === "Sign Up" ? "submit gray" : "submit"}
                    onClick={action === "Login" ? handleLogin : () => switchAction("Login")}
                >
                    Login
                </div>
            </div>
            <div className="google-login">
                <GoogleLogin />
            </div>
            {showForgotPassword && (
                <div className="overlay">
                    <div className="popup">
                        <span className="close" onClick={() => setShowForgotPassword(false)}>
                            &times;
                        </span>
                        <h2>Forgot Password</h2>
                        {resetPasswordSuccess ? ( // Check if resetPasswordSuccess is not empty
                            <div className="success-message">{resetPasswordSuccess}</div>
                        ) : (
                            <p>
                                Enter your email address, and we'll send you a link to reset your password.
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
