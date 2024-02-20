import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import CreateGroup from './CreateGroup';

const CreateGroupContainer = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const navigate = useNavigate(); 

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false); // Set loading to false after user state is set
        });
        return unsubscribe;
    }, []);

    // Render CreateGroup only if user is logged in and loading is false
    // Also, render CreateGroup only if the user was explicitly set (not due to automatic sign-in)
    // return !loading && user ? <CreateGroup user={user} /> : null;
    return <CreateGroup user={user} />
};

export default CreateGroupContainer;
