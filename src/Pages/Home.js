import React from "react";
import "./Home.css";
import box from "../pictures/boxnav.png";
import list from "../pictures/notepadnav.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <div className="table-container">
        <div className="box">
          <Link to="/inventory">
            <img
              src={box}
              alt="Box"
              className="box-image"
              title="go to inventory"
            />
          </Link>
        </div>
        <div className="checklist">
          <img
            src={list}
            alt="Checklist"
            className="checklist-image"
            title="go to checklist"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
