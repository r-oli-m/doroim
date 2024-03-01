import React, { useState } from "react";
import "./Tools.css";
import box1 from "./pictures/boxClosed.png";
import box2 from "./pictures/boxOpen.png";
import notepad1 from "./pictures/notepad.png"
import notepad2 from "./pictures/notepadScatter.png";
import { Link } from "react-router-dom";

const Tools = () => {
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [isPadOpen, setIsPadOpen] = useState(false);


  return (
    <div className="tools-container">
      <div className="text-box">
        <p>Tools Offered:</p>
        <ul>
          <li>find roommates</li>
          <li>decide what items to bring</li>
          <li>keep track of supplies</li>
        </ul>
      </div>
      <div className="dorm1"></div>
      <div className="dorm2"></div>
      {/* <div className="dorm3"></div> */}
      <div className="table-container">
        <div className="box">
          <Link to="/inventory">
            <img
              src={isBoxOpen ? box2 : box1} // Toggle between box1 and box2 based on isBoxOpen state
              alt="Box"
              className="box-image"
              title="go to inventory"
              onMouseEnter={() => setIsBoxOpen(true)}
              onMouseLeave={() => setIsBoxOpen(false)}
            />
          </Link>
        </div>
        <div className="checklist">
          <Link to="/checklist">
            <img
              src={isPadOpen ? notepad2 : notepad1} // Toggle between box1 and box2 based on isBoxOpen state
              alt="Notepad"
              className="checklist-image"
              title="go to checklist"
              onMouseEnter={() => setIsPadOpen(true)}
              onMouseLeave={() => setIsPadOpen(false)}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Tools;
