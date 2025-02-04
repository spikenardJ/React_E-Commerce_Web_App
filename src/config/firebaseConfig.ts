import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyA3WTJNUEofdqoSiEhPHdDTM2LMLgrfOXM",
    authDomain: "e-commerce-app-90189.firebaseapp.com",
    projectId: "e-commerce-app-90189",
    storageBucket: "e-commerce-app-90189.firebasestorage.app",
    messagingSenderId: "152498810853",
    appId: "1:152498810853:web:9d45439cbfbc59f8e3c90c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };