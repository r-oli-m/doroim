import React from "react";
import "./Home.css";
import home from "./home_page.png";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-img">
        <img src={home} alt="Home Page" height={700} width={1500} />
      </div>

      <div className="table-container">
        <div className="box">
          <img src="/box.png" alt="Box" className="box-image" />
        </div>
        <div className="checklist">
          <img
            src="/checklist.png"
            alt="Checklist"
            className="checklist-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
