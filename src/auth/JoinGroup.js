import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, doc, updateDoc, query, where, getDocs, onSnapshot } from "firebase/firestore";

const JoinGroup = ({ user, userColor }) => {
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

        const filteredGroups = fetchedGroups.filter(group => group.members && user && group.members.find(member => member.uid === user.uid));

        setGroups(filteredGroups);
      } catch (error) {
        console.error("Error fetching groups: ", error);
      }
    };

    fetchGroups();

    // Real-time updates for group members
    const unsubscribe = onSnapshot(collection(firestore, "groups"), (snapshot) => {
      fetchGroups();
    });

    return () => unsubscribe();
  }, [firestore, user]);

  const handleJoinGroup = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/auth");
      return;
    }

    try {
      const groupsCollection = collection(firestore, "groups");
      const groupsSnapshot = await getDocs(groupsCollection);

      let foundGroup = null;

      groupsSnapshot.forEach((doc) => {
        const groupData = doc.data();
        if (groupData.permissionCode === permissionCode) {
          foundGroup = {
            id: doc.id,
            ...groupData
          };
        }
      });

      if (foundGroup) {
        const groupId = foundGroup.id;

        const groupRef = doc(firestore, "groups", groupId);
        await updateDoc(groupRef, {
          members: [...foundGroup.members, { uid: user.uid, displayName: user.displayName, color: userColor || "#FF0000" }]
        });

        console.log("Joined group with ID: ", groupId, userColor);
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
