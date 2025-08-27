import { ref, set, get } from "firebase/database";
import { db } from "../../src/services/firebase.js";
import { useEffect, useState } from "react";

export const useFavorites = (user, isAuth, itemId) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (isAuth && user) {
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
    if (!isAuth || !user) {
      return;
    }

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
