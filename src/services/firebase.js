let firebaseApp = null;
let firebaseAuth = null;
let firebaseDb = null;

const firebaseConfig = {
  apiKey: "AIzaSyAIjaw8kJF8vpRBdXUlLWF8gTw5MMxQtEc",
  authDomain: "learn-lingo-c9dbd.firebaseapp.com",
  databaseURL:
    "https://learn-lingo-c9dbd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "learn-lingo-c9dbd",
  storageBucket: "learn-lingo-c9dbd.appspot.com",
  messagingSenderId: "558535624208",
  appId: "1:558535624208:web:267ed6065dfde587aa2c95",
};

export async function getFirebase() {
  if (!firebaseApp) {
    const { initializeApp } = await import("firebase/app");
    const { getAuth } = await import("firebase/auth");
    const { getDatabase } = await import("firebase/database");

    firebaseApp = initializeApp(firebaseConfig);
    firebaseAuth = getAuth(firebaseApp);
    firebaseDb = getDatabase(firebaseApp);
  }

  return { app: firebaseApp, auth: firebaseAuth, db: firebaseDb };
}
