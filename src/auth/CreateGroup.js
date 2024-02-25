import React, { useState, useEffect } from "react";
import {
  getFirestore,
  doc,
  collection,
  addDoc,
  getDoc,
} from "firebase/firestore";

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
          const userData = { displayName, email };
          const userDocRef = doc(firestore, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

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

    const members = [];
    const creator = {
      uid: user.uid,
      displayName: userInfo.displayName, // Use the fetched displayName
      color: userInfo.color || "#FF0000",
    };
    members.push(creator);

    try {
      const docRef = await addDoc(collection(firestore, "groups"), {
        groupName,
        permissionCode: generatedCode,
        members: members,
      });
      console.log("Group created with ID: ", docRef.id);
    } catch (error) {
      console.error("Error creating group: ", error);
    }
  };

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
