import React, { useState, useEffect } from "react";
import { getFirestore, doc, setDoc, collection, addDoc, getDoc } from "firebase/firestore";

const CreateGroup = ({ user }) => {
  const firestore = getFirestore();
  const [groupName, setGroupName] = useState("");
  const [permissionCode, setPermissionCode] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user && !user.isAnonymous) {
        try {
          const { displayName, email } = user;

          // Initialize userData with displayName and email
          const userData = { displayName, email };

          // Fetch additional user information from Firestore
          const userDocRef = doc(firestore, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          // If user document exists, merge data with userData
          if (userDocSnap.exists()) {
            const additionalData = userDocSnap.data();
            Object.assign(userData, additionalData);
          } else {
            console.error("User document does not exist");
          }

          // Update userInfo with merged data
          setUserInfo(userData);
        } catch (error) {
          console.error("Error fetching user information: ", error);
        } finally {
          console.log("User information fetched");
          setLoading(false);
        }
      }
    };


    fetchUserInfo();
  }, [user, firestore]);

  const generatePermissionCode = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const codeLength = 6;
    let code = "";
    for (let i = 0; i < codeLength; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (!user || loading) {
      console.log("Not signed in");
      setPermissionCode("PLEASE SIGN IN before creating a group");
      return;
    }

    const generatedCode = generatePermissionCode();
    setPermissionCode(generatedCode);

    // Create an array of user objects
    const members = [
      {
        uid: user.uid,
        displayName: userInfo.displayName, // Use the fetched displayName
        color: userInfo.color || "#000000"
      }
    ];

    try {
      const docRef = await addDoc(collection(firestore, "groups"), {
        groupName,
        permissionCode,
        members: members // Pass the array of user objects
      });
      console.log("Group created with ID: ", docRef.id); // Log group name as ID
    } catch (error) {
      console.error("Error creating group: ", error);
    }
  };

  if (!user && !loading) {
    return (
      <div>
        <p>Please sign in to create a group.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Create a Group</h2>
      {userInfo && (
        <div>
          <p>User Name: {userInfo.displayName}</p>
          <p>User Email: {userInfo.email}</p>
        </div>
      )}
      <form onSubmit={handleCreateGroup}>
        <input
          type="text"
          placeholder="Enter group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <button type="submit">Create Group</button>
      </form>
      {user && <p>Permission Code: {permissionCode}</p>}
      {!user && <p>Please sign in to create a group.</p>}
    </div>
  );
};

export default CreateGroup;
