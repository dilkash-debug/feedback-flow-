// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD33PkwzRATmVPjF054kJ5PshZuyx1f2DQ",
  authDomain: "feedback-flow-tnxre.firebaseapp.com",
  projectId: "feedback-flow-tnxre",
  storageBucket: "feedback-flow-tnxre.firebasestorage.app",
  messagingSenderId: "587110227338",
  appId: "1:587110227338:web:db7501f391c6f089e87c73",
  measurementId: "",
};

// Initialize Firebase
let app;
// Check if all required environment variables are present
const firebaseCredentialsProvided =
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId;

if (firebaseCredentialsProvided) {
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApp();
    }
}


const auth = firebaseCredentialsProvided ? getAuth(app) : null;
const db = firebaseCredentialsProvided ? getFirestore(app) : null;
const googleProvider = firebaseCredentialsProvided ? new GoogleAuthProvider() : null;

export { app, auth, db, googleProvider, firebaseCredentialsProvided };
