import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import CreateGroup from "../auth/CreateGroup";
import JoinGroup from "../auth/JoinGroup";
import ColorPicker from "../ColorPicker";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import "../Pages/GroupContainer.css";

const GroupContainer = () => {
  const [user, setUser] = useState(null);
  // eslint-disable-next-line
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
      const unsubscribe = onSnapshot(
        collection(firestore, "groups"),
        (snapshot) => {
          const fetchedGroups = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setGroups(fetchedGroups);
        }
      );
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
          ),
      });
    } catch (error) {
      console.error("Error updating member color:", error);
    }
  };

  return (
    <>
      <h1 className="group-container-title">Manage Your Roomate Group Here:</h1>
      <div className="group-container">
        <div className="options">
          <div>
            <CreateGroup user={user} />
          </div>
          <div>
            <JoinGroup user={user} />
          </div>
        </div>
        <div className="all-cards">
          <h2 className="current-groups">Your current groups:</h2>
          {groups.map((group) => (
            <div key={group.id} className="my-group-card">
              <h2>Group Name: {group.groupName}</h2>
              <h3>Code: {group.permissionCode}</h3>
              <h3>Members:</h3>
              <ul>
                {group.members.map((member) => (
                  <li key={member.uid} style={{ color: member.color }}>
                    {member.displayName}
                    <ColorPicker
                      user={user}
                      memberId={member.uid}
                      selectedColor={member.color}
                      onUpdateColor={(color) =>
                        handleColorChange(group.id, member.uid, color)
                      }
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GroupContainer;
