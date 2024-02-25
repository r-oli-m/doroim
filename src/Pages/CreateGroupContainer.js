import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import CreateGroup from "../auth/CreateGroup";
import JoinGroup from "../auth/JoinGroup"; // Import JoinGroup component
import ColorPicker from "../ColorPicker";

const CreateGroupContainer = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      <CreateGroup user={user} />
      <JoinGroup user={user} />
      <ColorPicker user={user} /> 
    </div>
  );
};

export default CreateGroupContainer;
