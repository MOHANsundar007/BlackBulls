import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAu6IPgLS_yFZso9VrSMPx57Tu_puoBgzc",
    authDomain: "videocall-e0734.firebaseapp.com",
    databaseURL: "https://videocall-e0734-default-rtdb.firebaseio.com",
    projectId: "videocall-e0734",
    storageBucket: "videocall-e0734.firebasestorage.app",
    messagingSenderId: "158863531761",
    appId: "1:158863531761:web:76208a78dcf185f98cd350",
    measurementId: "G-PXKJT4NGEE"
  };

// Initialize Firebase


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth };