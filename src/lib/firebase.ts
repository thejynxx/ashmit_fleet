import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC5F0yPJH4JV1N2JLiiXrDb9Uvlo8p9W14",
    authDomain: "ashmit-cef97.firebaseapp.com",
    projectId: "ashmit-cef97",
    storageBucket: "ashmit-cef97.firebasestorage.app",
    messagingSenderId: "850629713062",
    appId: "1:850629713062:web:e60f3c9ad5fb11debe6867",
    measurementId: "G-5C04P29VWP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export services for use in your app
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;