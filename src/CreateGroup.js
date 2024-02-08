import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const CreateGroup = () => {
    const navigate = useNavigate(); // Initialize the navigate function
    const auth = getAuth();
    const firestore = getFirestore();
    const [groupName, setGroupName] = useState('');
    const [permissionCode, setPermissionCode] = useState('');
    const generatePermissionCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const codeLength = 6; // Change the length of the code as needed
        let code = '';
        for (let i = 0; i < codeLength; i++) {
          code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return code;
    };

    const handleCreateGroup = async (e) => {
        e.preventDefault();
        if (auth.currentUser===null) {
            navigate('/auth');
            return;
        }
        const generatedCode = generatePermissionCode();
        setPermissionCode(generatedCode); // Set the generated code to state
        try {
            // Add code to create group in Firestore
            const docRef = await addDoc(collection(firestore, 'groups'), {
                groupName,
                permissionCode: generatedCode, // Use the generated code
                members: { [auth.currentUser.uid]: true } // Add creator as member
            });
            console.log('Group created with ID: ', docRef.id);
        } catch (error) {
            console.error('Error creating group: ', error);
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
            {permissionCode && (
                <p>Permission Code: {permissionCode}</p>
            )}
        </div>
    );
};

export default CreateGroup;
