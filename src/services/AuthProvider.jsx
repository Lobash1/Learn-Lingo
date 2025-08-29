import { useEffect, useState } from "react";
import { getFirebase } from "./firebase.js";
import { AuthContext } from "./AuthContext.jsx";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = null;

    (async () => {
      const { auth } = await getFirebase();
      const { onAuthStateChanged } = await import("firebase/auth");

      unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
      });
    })();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuth: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
