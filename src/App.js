// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Navbar from "./Navbar";
//sub pages:
import Checklist from "./SubPages/Checklist";
import Inventory from "./SubPages/Inventory";
import Login from "./Login";
import Register from "./Register";
import GoogleLogin from "./GoogleLogin";
import AuthSection from "./AuthSection";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checklist" element={<Checklist />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} /> {/* Closing parenthesis added here */}
        <Route exact path="/login" element={<Login />} />
        <Route path="/google-login" element={<GoogleLogin />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
