import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAIjaw8kJF8vpRBdXUlLWF8gTw5MMxQtEc",
  authDomain: "learn-lingo-c9dbd.firebaseapp.com",
  databaseURL:
    "https://learn-lingo-c9dbd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "learn-lingo-c9dbd",
  storageBucket: "learn-lingo-c9dbd.firebasestorage.app",
  messagingSenderId: "558535624208",
  appId: "1:558535624208:web:267ed6065dfde587aa2c95",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//serveces firebase
export const auth = getAuth(app);
export const db = getDatabase(app);

export default app;

// auth — для логіну, реєстрації, логауту
// db — для читання/запису викладачів
