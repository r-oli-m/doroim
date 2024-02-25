// Checklist.js

import React, { useState } from "react";
import "./Checklist.css";
import addBtn from "../pictures/addChecklistItem.png";
import dropBtn from "../pictures/dropdown.png";

const Checklist = () => {
  //----------------- Variables -----------------------------------------------
  //some sample items for testing
  const [items, setItems] = useState([
    {
      id: 1,
      text: "Item 1",
      checked: false,
      details: "Detail 1",
      showDetails: false,
    },
    {
      id: 2,
      text: "Item 2",
      checked: false,
      details:
        "Detail 2 some more details some more details some more details some more details some more details",
      showDetails: false,
    },
    {
      id: 3,
      text: "Item 3",
      checked: false,
      details: "Detail 3",
      showDetails: false,
    },
  ]);

  const [showInput, setShowInput] = useState(false);
  const [newItemText, setNewItemText] = useState("");
  const [showFirstChecklist, setShowFirstChecklist] = useState(true);

  //----------------- Functions -----------------------------------------------
  const handleToggle = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleAddItem = () => {
    const trimmedNewItemText = newItemText.trim().toLowerCase();
    const isDuplicate = items.some(
      (item) => item.text.toLowerCase() === trimmedNewItemText
    );
    if (trimmedNewItemText !== "" && !isDuplicate) {
      const newItem = {
        id: items.length + 1,
        text: newItemText,
        checked: false,
        details: "New Detail",
      };
      setItems([...items, newItem]);
      setNewItemText("");
      setShowInput(false);
    } else if (isDuplicate) {
      alert("This item already exists in the checklist.");
    }
  };

  const handleDropdown = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, showDetails: !item.showDetails } : item
      )
    );
  };

  //----------------- HTML -----------------------------------------------
  return (
    <div className="checklist-page">
      {showFirstChecklist && (
        <div className="checklist-container">
          <div className="checklist-title">
            <h2>Checklist title here ? ._.</h2>
            {/* --------------- add button --------------- */}
            <button
              className="add-btn"
              onClick={() => setShowInput(true)}
              disabled={showInput}
            >
              <img src={addBtn} alt="Add" height={70} width={70} />
            </button>
          </div>
          {/* --------------- start of checklist --------------- */}
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {/* --------------- show item --------------- */}
                <div className="item-and-btns">
                  <label>
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleToggle(item.id)}
                    />
                    {item.text}
                  </label>
                  {/* --------------- dropdown --------------- */}
                  <div className="dropdown-btn">
                    <button
                      className={`dropbtn ${
                        item.showDetails ? "dropbtn-flipped" : ""
                      }`}
                      onClick={() => handleDropdown(item.id)}
                    >
                      <img
                        src={dropBtn}
                        alt="Dropdown"
                        height={30}
                        width={30}
                      />
                    </button>
                  </div>
                </div>
                <div className="dropdown-content">
                  {item.showDetails && <p>Details: {item.details}</p>}
                </div>
              </li>
            ))}

            {/* --------------- adding new checklist item --------------- */}
            {showInput && (
              <div className="new-item">
                <p> Adding a new item. . . </p>
                <div className="input-item">
                  <input
                    type="text"
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                  />
                  <button onClick={handleAddItem}>Add</button>
                  <button onClick={() => setShowInput(false)}>Cancel</button>
                </div>
              </div>
            )}
          </ul>
          {/* --------------- end of checklist --------------- */}
        </div>
      )}

      {/* --------------- checklist 2  --------------------------------------------- --------------- --------------- */}
      {!showFirstChecklist && (
        <div className="checklist-container">
          <div className="checklist-title">
            <h2>Checked Items</h2>
          </div>
          {/* --------------- start of checklist --------------- */}
          <ul>
            {items
              .filter((item) => item.checked)
              .map((item) => (
                <li key={item.id}>
                  {/* --------------- show item --------------- */}
                  <div className="item-and-btns">
                    <label>
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => handleToggle(item.id)}
                      />
                      {item.text}
                    </label>
                    {/* --------------- dropdown --------------- */}
                    <div className="dropdown-btn">
                      <button
                        className={`dropbtn ${
                          item.showDetails ? "dropbtn-flipped" : ""
                        }`}
                        onClick={() => handleDropdown(item.id)}
                      >
                        <img
                          src={dropBtn}
                          alt="Dropdown"
                          height={30}
                          width={30}
                        />
                      </button>
                    </div>
                  </div>
                  <div className="dropdown-content">
                    {item.showDetails && <p>Details: {item.details}</p>}
                  </div>
                </li>
              ))}
          </ul>
          {/* --------------- end of checklist --------------- */}
        </div>
      )}
      <button
        className="secondPageBtn"
        onClick={() => setShowFirstChecklist(!showFirstChecklist)}
      ></button>
    </div>
  );
};

export default Checklist;
