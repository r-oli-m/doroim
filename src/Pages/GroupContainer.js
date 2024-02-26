import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import CreateGroup from "../auth/CreateGroup";
import JoinGroup from "../auth/JoinGroup";
import ColorPicker from "../ColorPicker";
import { getFirestore, collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import "../Pages/GroupContainer.css";
import Checklist from "../SubPages/Checklist";

const GroupContainer = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (!user) {
        setGroups([]);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchGroups = async () => {
      const firestore = getFirestore();
      const unsubscribe = onSnapshot(collection(firestore, "groups"), (snapshot) => {
        const fetchedGroups = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setGroups(fetchedGroups);
      });
      return () => unsubscribe();
    };

    if (user) {
      fetchGroups();
    }
  }, [user]);

  const handleColorChange = async (groupId, memberId, color) => {
    try {
      const firestore = getFirestore();
      const groupRef = doc(firestore, "groups", groupId);
      await updateDoc(groupRef, {
        members: groups
          .find((group) => group.id === groupId)
          .members.map((member) =>
            member.uid === memberId ? { ...member, color: color } : member
          )
      });
    } catch (error) {
      console.error("Error updating member color:", error);
    }
  };

  // Find the group that the user is a member of
  const userGroup = user ? groups.find(group => group.members.some(member => member.uid === user.uid)) : null;

  return (
    <div className="group-container">
      <h1>Group Management</h1>
      <div className="options">
        <div>
          <CreateGroup user={user} />
        </div>
        <div>
          <JoinGroup user={user} />
        </div>
      </div>
      <div className="all-cards">
        {userGroup && (
          <div key={userGroup.id} className="my-group-card">
            <h2>Group: {userGroup.groupName}</h2>
            <h3>Code: {userGroup.permissionCode}</h3>
            <h4>Members:</h4>
            <ul>
              {userGroup.members.map((member) => (
                <li key={member.uid} style={{ color: member.color }}>
                  {member.displayName}
                  <ColorPicker
                    user={user}
                    memberId={member.uid}
                    selectedColor={member.color}
                    onUpdateColor={(color) =>
                      handleColorChange(userGroup.id, member.uid, color)
                    }
                  />
                </li>
              ))}
            </ul>
            {/* Render Checklist for the user's group */}
            <Checklist
              user={user}
              group={userGroup}
              userGroupColor={userGroup?.members.find(member => member.uid === user?.uid)?.color}
              groupId={userGroup?.id}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupContainer;
