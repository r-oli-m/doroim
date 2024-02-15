import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { getAuth, getUser } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const CreateGroup = ({ user }) => {
    const my_user = user;
    const navigate = useNavigate(); // Initialize the navigate function
    const auth = getAuth();
    const firestore = getFirestore();
    const [groupName, setGroupName] = useState('');
    const [permissionCode, setPermissionCode] = useState('');
    const [userInfo, setUserInfo] = useState(null); // State to store user information
    const [loading, setLoading] = useState(true);

    const handleInputChange = (e) => {
        setGroupName(e.target.value);
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (user) {
                try {
                    const { displayName, email } = user;
                    setUserInfo({ displayName, email });
                } catch (error) {
                    console.error('Error fetching user information: ', error);
                } finally {
                    console.log('User information fetched');
                    setLoading(false); // Set loading to false after fetching user info
                }
            }
        };

        fetchUserInfo();
    }, [auth]);

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
        if (!user) {
            console.log('Not signed in');
            setPermissionCode('PLEASE SIGN IN before creating a group');
            return; // Exit early if user is not signed in
        }
        navigate(CreateGroup);

        const generatedCode = generatePermissionCode();
        setPermissionCode(generatedCode); // Set the generated code to state
        try {
            // Add code to create group in Firestore
            const docRef = await addDoc(collection(firestore, 'groups'), {
                groupName,
                permissionCode: generatedCode, // Use the generated code
                members: { [user.uid]: true } // Add creator as member
            });
            console.log('Group created with ID: ', docRef.id);
        } catch (error) {
            console.error('Error creating group: ', error);
        }
    };
    
    if (!user && !loading) {
        return (
            <div>
                <p>Please sign in to create a group.</p>=
            </div>
        );
    }

    return (
        <div>
            <h2>Create a Group</h2>
            {userInfo && ( // Conditional rendering user info available
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
                    onChange={handleInputChange}
                />
                <button type="submit">Create Group</button>
            </form>
            {my_user && ( // Conditional rendering permission code and user available
                <p>Permission Code: {permissionCode}</p>
            )}
            {!my_user && (
                <p>Please sign in to create a group.</p>
            )}
        </div>
    );
};

export default CreateGroup;
