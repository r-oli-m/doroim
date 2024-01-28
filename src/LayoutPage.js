// ContactPage.js

import React from 'react';
import { Link } from 'react-router-dom';

const LayoutPage = () => {
  return (
    <div>
      <h2>Layout Page</h2>
      <Link to="/contact">
        <button>Contact</button>
      </Link>
      <Link to="/about">
        <button>About</button>
      </Link>
      <h2>PLASEAS</h2>
    </div>
  );
};

export default LayoutPage;
