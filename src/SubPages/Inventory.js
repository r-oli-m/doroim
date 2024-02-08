import React from "react";
import "./Inventory.css";

import postit from "./postit.png";

const Inventory = () => {
  return (
    <div className="inventory-container">
      {/* --------------- clipboard --------------- */}
      <div className="clipboard-container">
        <div className="metal"></div>
        <div className="paper">
          <div className="suggestions">
            <h1>Suggested Dorm Items</h1>
            <h3>Organization and Storage:</h3>
            <ul>
              <li>item 1</li>
              <li>item 2</li>
              <li>item</li>
              <li>item</li>
              <li>item</li>
              <li>item</li>
              <li>item</li>
              <li>item</li>
            </ul>
          </div>
        </div>
      </div>
      {/* --------------- --------------- --------------- */}
      <div className="right-container">
        <div className="imgs-container">
          <img src={postit} alt="post-it" height={300} width={300} />
          <img
            className="second-postit"
            src={postit}
            alt="post-it"
            height={300}
            width={300}
          />
        </div>

        <div className="chatbot-container">
          <div className="second-chatbot-container">
            <p>chatbot goes here</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Inventory;
