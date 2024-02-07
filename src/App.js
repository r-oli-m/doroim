// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Navbar from "./Navbar";
//sub pages:
import Checklist from "./SubPages/Checklist";
import Inventory from "./SubPages/Inventory";
import GoogleLogin from "./GoogleLogin";
import LoginSignUp from "./LoginSignUp";
import ResetPassword from "./ResetPassword"; // Adjust the path based on your file structure


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
          <Route path="/checklist" element={<Checklist />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/google-login" element={<GoogleLogin />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/auth" element={<LoginSignUp />} />
      </Routes>
    </div>
  );
};

export default App;