import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore"; // Import Firestore functions

const JoinGroup = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const auth = getAuth();
  const firestore = getFirestore();
  const [permissionCode, setPermissionCode] = useState("");

  const handleJoinGroup = async (e) => {
    e.preventDefault();
    if (auth.currentUser === null) {
      // Redirect user to sign-in page if not signed in
      navigate("/auth");
      return;
    }
    try {
      // Check if group exists with given permission code
      const q = query(
        collection(firestore, "groups"),
        where("permissionCode", "==", permissionCode)
      );
      const groupSnapshot = await getDocs(q);

      if (!groupSnapshot.empty) {
        // Get the first group document
        const groupDoc = groupSnapshot.docs[0];
        const groupId = groupDoc.id;

        // Add user to the group in Firestore
        const groupRef = doc(firestore, "groups", groupId);
        await updateDoc(groupRef, {
          [`members.${auth.currentUser.uid}`]: true,
        });

        console.log("Joined group with ID: ", groupId);
      } else {
        console.log("Group not found");
      }
    } catch (error) {
      console.error("Error joining group: ", error);
    }
  };

  return (
    <div>
      <h2>Join a Group</h2>
      <form onSubmit={handleJoinGroup}>
        <input
          type="text"
          placeholder="Enter permission code"
          value={permissionCode}
          onChange={(e) => setPermissionCode(e.target.value)}
        />
        <button type="submit">Join Group</button>
      </form>
    </div>
  );
};

export default JoinGroup;
