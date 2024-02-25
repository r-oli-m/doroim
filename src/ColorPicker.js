import React, { useState, useEffect } from "react";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const ColorPicker = ({ user, memberId, selectedColor, onUpdateColor }) => {
  const [currentColor, setCurrentColor] = useState(selectedColor || "#000000"); // Default color

  const handleColorSelection = async (color) => {
    try {
      await onUpdateColor(color);
      setCurrentColor(color);
    } catch (error) {
      console.error("Error updating color:", error);
    }
  };

  return (
    <div>
      <input
        type="color"
        value={currentColor}
        onChange={(e) => handleColorSelection(e.target.value)}
      />
      <p style={{ color: currentColor }}>Sample Text</p> {/* Text whose color will change dynamically */}
    </div>
  );
};

export default ColorPicker;
