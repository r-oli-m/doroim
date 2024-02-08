// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'; // Import the Firestore module

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMuuDFk2Ik5qU8dDJpKD4PXfIRF5xNtZA",
  authDomain: "doroim.firebaseapp.com",
  projectId: "doroim",
  storageBucket: "doroim.appspot.com",
  messagingSenderId: "857835517865",
  appId: "1:857835517865:web:cdbcfaad96ed3693ad76b8",
  measurementId: "G-45W97KS3HG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Use getAuth to get the authentication object
const googleProvider = new GoogleAuthProvider(); // Fix the typo here

// Get a Firestore instance
const firestore = getFirestore(app);

export { auth, googleProvider,firestore};