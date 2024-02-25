import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMuuDFk2Ik5qU8dDJpKD4PXfIRF5xNtZA",
  authDomain: "doroim.firebaseapp.com",
  projectId: "doroim",
  storageBucket: "doroim.appspot.com",
  messagingSenderId: "857835517865",
  appId: "1:857835517865:web:cdbcfaad96ed3693ad76b8",
  measurementId: "G-45W97KS3HG",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Authentication persistence set to local.");
  })
  .catch((error) => {
    console.error("Error setting authentication persistence:", error.message);
  });

const googleProvider = new GoogleAuthProvider();

const firestore = getFirestore(app);

export { auth, googleProvider, firestore };
