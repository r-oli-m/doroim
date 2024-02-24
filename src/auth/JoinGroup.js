import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, doc, updateDoc, query, where, getDocs } from "firebase/firestore";

const JoinGroup = ({ user }) => {
  const navigate = useNavigate();
  const firestore = getFirestore();
  const [permissionCode, setPermissionCode] = useState("");
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groupsCollection = collection(firestore, "groups");
        const groupsSnapshot = await getDocs(groupsCollection);

        const fetchedGroups = [];
        groupsSnapshot.forEach((doc) => {
          const groupData = doc.data();
          const group = {
            id: doc.id,
            ...groupData
          };
          fetchedGroups.push(group);
        });

        const filteredGroups = fetchedGroups.filter(group => {
          return group.members && user && group.members[user.uid]; // Check if user is a member
        });

        setGroups(filteredGroups);
      } catch (error) {
        console.error("Error fetching groups: ", error);
      }
    };

    fetchGroups();
  }, [firestore, user]);

  const handleJoinGroup = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/auth");
      return;
    }

    try {
      const q = query(
        collection(firestore, "groups"),
        where("permissionCode", "==", permissionCode)
      );
      const groupSnapshot = await getDocs(q);

      if (!groupSnapshot.empty) {
        const groupDoc = groupSnapshot.docs[0];
        const groupId = groupDoc.id;

        const groupRef = doc(firestore, "groups", groupId);
        await updateDoc(groupRef, {
          [`members.${user.displayName}`]: true,
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
      <h2>Groups</h2>
      {groups.map((group) => (
        <div key={group.id}>
          <h3>{group.groupName}</h3>
          <p>Permission Code: {group.permissionCode}</p>
          <h4>Members:</h4>
          <ul>
            {Object.entries(group.members).map(([username, isMember]) => (
              <li key={username}>{group.members[username].displayName}</li>
            ))}

          </ul>
        </div>
      ))}
    </div>
  );
};

export default JoinGroup;
