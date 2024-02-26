import React, { useState } from "react";
import { getFirestore, doc, setDoc, collection, addDoc } from "firebase/firestore";

const CreateGroup = ({ user }) => {
  const firestore = getFirestore();
  const [groupName, setGroupName] = useState("");
  const [permissionCode, setPermissionCode] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const generatePermissionCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const codeLength = 6;
    let code = "";
    for (let i = 0; i < codeLength; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (!user) {
      console.log("Not signed in");
      setPermissionCode("PLEASE SIGN IN before creating a group");
      return;
    }

    const generatedCode = generatePermissionCode();
    setPermissionCode(generatedCode);

    const members = [];
    const creator = {
      uid: user.uid,
      displayName: userInfo.displayName,
      color: userInfo.color || "#FF0000"
    };
    members.push(creator);

    try {
      const groupData = {
        groupName,
        permissionCode: generatedCode,
        members: members
      };

      // Create the group document in Firestore
      const groupDocRef = await addDoc(collection(firestore, "groups"), groupData);
      console.log("Group created with ID: ", groupDocRef.id);

      // Other operations related to group creation
    } catch (error) {
      console.error("Error creating group: ", error);
      // Handle error gracefully, maybe show a message to the user
    }
  };

  return (
    <div>
      <h2>Create a Group</h2>
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
