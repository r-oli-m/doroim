import React from "react";
import "./Home.css";
import box from "../pictures/boxnav.png";
import list from "../pictures/notepadnav.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <div className="text-box">
        <p>Welcome to DoroIM!</p>
        <ul>
          <li>find roommates</li>
          <li>decide what items to bring</li>
          <li>keep track of supplies</li>
        </ul>
      </div>
      <div className="dorm1"></div>
      <div className="dorm2"></div>
      <div className="dorm3"></div>
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
