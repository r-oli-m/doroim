import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


const Navbar = () => {
  return (
    <div className="Navbar">
      <div className="Dropdown">
        <Link to="/">Home</Link>
        <div className="DropdownContent">
          <Link to="/inventory">Inventory</Link>
          <Link to="/checklist">Checklist</Link>
        </div>
      </div>
      <Link to="/contact">Contact</Link>
      <Link to="/about">About</Link>
    </div>
  );
};

export default Navbar;
