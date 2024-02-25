import React, { useState } from "react";

const ColorPicker = ({ user, memberId, selectedColor, onUpdateColor }) => {
  // Default color
  const [currentColor, setCurrentColor] = useState(selectedColor || "#000000");

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
      <p style={{ color: currentColor }}>Choose your color</p>
    </div>
  );
};

export default ColorPicker;
