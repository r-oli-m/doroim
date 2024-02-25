// ColorPicker.js
import React, { useState, useEffect } from "react";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";

const ColorPicker = ({ user }) => {
  const [selectedColor, setSelectedColor] = useState("#000000"); // Default color

  useEffect(() => {
    const fetchUserColor = async () => {
      try {
        const firestore = getFirestore();
        const userDocRef = doc(firestore, "users", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        const userData = userDocSnapshot.data();
        if (userData && userData.color) {
          setSelectedColor(userData.color); // Set the selected color from user data
        }
      } catch (error) {
        console.error("Error fetching user color:", error);
      }
    };

    if (user) {
      fetchUserColor();
    }
  }, [user]);

  const handleColorSelection = async (color) => {
    try {
      const firestore = getFirestore();
      const userDocRef = doc(firestore, "users", user.uid);
      await updateDoc(userDocRef, { color });
      console.log("Color updated successfully!");
      console.log(color)
      setSelectedColor(color);
    } catch (error) {
      console.error("Error updating color:", error);
    }
  };

  return (
    <div>
      <h2>Choose a Color</h2>
      <input
        type="color"
        value={selectedColor}
        onChange={(e) => handleColorSelection(e.target.value)}
      />
    </div>
  );
};

export default ColorPicker;
