import React, { useState, useEffect } from "react";
import "./Checklist.css";
import addBtn from "./addChecklistItem.png";
import dropBtn from "./dropdown.png";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const Checklist = ({ userGroupColor, group, groupId, user }) => {
  const groupMembers = group?.members || [];


  const firestore = getFirestore();
  const [items, setItems] = useState([]);
  const [newItemText, setNewItemText] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [userId, setUserId] = useState(null); // Declare userId state

  useEffect(() => {
    const fetchChecklistData = async () => {
      try {
        const checklistDocRef = doc(firestore, "checklists", groupId);
        const docSnapshot = await getDoc(checklistDocRef);
        if (docSnapshot.exists()) {
          const checklist = docSnapshot.data().items;
          setItems(checklist);
        } else {
          console.log("No checklist data found.");
        }
      } catch (error) {
        console.error("Error fetching checklist data: ", error);
      }
    };

    fetchChecklistData();
  }, [firestore, groupId]);

  useEffect(() => {
    // Extract userId from user object
    if (user) {
      setUserId(user.uid);
    }
  }, [user]);

  const handleToggle = async (itemId) => {
    try {
      const updatedItems = items.map((item) =>
        item.id === itemId
          ? {
            ...item,
            checked: !item.checked,
            checkedBy: item.checked ? null : userId,
          }
          : item
      );
      setItems(updatedItems);
      const checklistDocRef = doc(firestore, "checklists", groupId);
      await setDoc(checklistDocRef, { items: updatedItems });
    } catch (error) {
      console.error("Error updating checklist item: ", error);
    }
  };

  const handleAddItem = async () => {
    const trimmedNewItemText = newItemText.trim();
    if (trimmedNewItemText !== "") {
      const newItem = {
        id: items.length + 1,
        text: trimmedNewItemText,
        checked: false,
        checkedBy: null,
        details: "New Detail",
        addedBy: userId,
      };
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      const checklistDocRef = doc(firestore, "checklists", groupId);
      await setDoc(checklistDocRef, { items: updatedItems });
      setNewItemText("");
      setShowInput(false);
    } else {
      alert("Please enter a valid item text.");
    }
  };

  const handleDropdown = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, showDetails: !item.showDetails } : item
      )
    );
  };
  return (
    <div className="checklist-page">
      <h2>Checklist</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <div className="item-and-btns">
              <label>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleToggle(item.id)}
                  style={{
                    outline: `2px solid ${item.addedBy === userId
                      ? userGroupColor
                      : item.addedBy
                        ? groupMembers.find((member) => member.uid === item.addedBy)?.color
                        : "black"
                      }`
                  }}
                />
                {item.text}
              </label>
              <div className="dropdown-btn">
                <button
                  className={`dropbtn ${item.showDetails ? "dropbtn-flipped" : ""}`}
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
      <button
        className="add-btn"
        onClick={() => setShowInput(true)}
        disabled={showInput}
      >
        <img src={addBtn} alt="Add" height={70} width={70} />
      </button>
    </div>
  );
};

export default Checklist;
