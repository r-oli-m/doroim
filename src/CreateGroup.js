import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const CreateGroup = ({ user }) => {
    const navigate = useNavigate();
    const auth = getAuth();
    const firestore = getFirestore();
    const [groupName, setGroupName] = useState('');
    const [permissionCode, setPermissionCode] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

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
                    setLoading(false);
                }
            }
        };

        fetchUserInfo();
    }, [user]);

    const generatePermissionCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const codeLength = 6;
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
            return;
        }

        const generatedCode = generatePermissionCode();
        setPermissionCode(generatedCode);
        try {
            const docRef = await addDoc(collection(firestore, 'groups'), {
                groupName,
                permissionCode: generatedCode,
                members: { [user.uid]: true }
            });
            console.log('Group created with ID: ', docRef.id);
        } catch (error) {
            console.error('Error creating group: ', error);
        }
    };

    if (!user && !loading) {
        return (
            <div>
                <p>Please sign in to create a group.</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Create a Group</h2>
            {userInfo && (
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
                    onChange={(e) => setGroupName(e.target.value)}
                />
                <button type="submit">Create Group</button>
            </form>
            {user && (
                <p>Permission Code: {permissionCode}</p>
            )}
            {!user && (
                <p>Please sign in to create a group.</p>
            )}
        </div>
    );
};

export default CreateGroup;
