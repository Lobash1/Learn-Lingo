import { createContext, useEffect, useState } from "react";
import { getFirebase } from "./firebase.js";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;

    (async () => {
      const { auth } = await getFirebase();
      const { onAuthStateChanged } = await import("firebase/auth");

      unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
      });
    })();

    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuth: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
