import { ref, set, get } from "firebase/database";
import { useEffect, useState } from "react";
import { getFirebase } from "../../src/services/firebase.js";

export const useFavorites = (user, isAuth, itemId) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (isAuth && user) {
        const { db } = await getFirebase();
        const snapshot = await get(ref(db, `favorites/${user.uid}`));

        const userFavorites = snapshot.exists()
          ? Object.keys(snapshot.val())
          : [];
        setIsFavorite(userFavorites.includes(itemId));
      } else {
        setIsFavorite(false);
      }
    };

    fetchFavorites();
  }, [itemId, isAuth, user]);

  const toggleFavorite = async () => {
    if (!isAuth || !user) return;

    const { db } = await getFirebase();
    const userFavRef = ref(db, `favorites/${user.uid}`);
    const snapshot = await get(userFavRef);
    const currentFavorites = snapshot.exists() ? snapshot.val() : {};

    if (currentFavorites[itemId]) {
      delete currentFavorites[itemId];
    } else {
      currentFavorites[itemId] = true;
    }

    await set(userFavRef, currentFavorites);
    setIsFavorite(!isFavorite);
  };

  return { isFavorite, toggleFavorite };
};
