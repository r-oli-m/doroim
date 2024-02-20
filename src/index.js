import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import App from './App';
import { getAuth, signOut } from 'firebase/auth';
// when u reload it clears user state, no user signed in
// important bc otherwise create group always signs previous user in

const clearUserAuthenticationState = async () => {
    try {
        const auth = getAuth();
        await signOut(auth);
    } catch (error) {
        console.error('Error clearing user authentication state:', error);
    }
};
clearUserAuthenticationState().then(() => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<App />} />
                </Routes>
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
});
