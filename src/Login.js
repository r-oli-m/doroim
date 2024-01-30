// Login.js
import "./Login.css";
import { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User logged in:", user);
      // Redirect or perform other actions after successful login
    } catch (error) {
      console.error("Login error:", error.message);
      // Handle login errors (e.g., display an error message to the user)
    }
  };

  return (
    <div className="login-container"> {/* Apply the CSS class to the container */}
      <h2>Login</h2>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className="login-button" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
