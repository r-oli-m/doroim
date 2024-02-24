import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import CreateGroup from "./CreateGroup";

const CreateGroupContainer = () => {
  const [user, setUser] = useState(null);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // Set loading to false after user state is set
    });
    return unsubscribe;
  }, [setLoading]);

  return <CreateGroup user={user} />;
};

export default CreateGroupContainer;
