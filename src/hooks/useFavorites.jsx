import { ref, set, get } from "firebase/database";
import { db } from "../../src/services/firebase.js";
import { useEffect, useState } from "react";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

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
      iziToast.warning({
        title: "Attention",
        message: "This functionality is available only to authorized users.",
        position: "topCenter",
        timeout: 3000,
        transitionIn: "fadeInDown",
        transitionOut: "fadeOutUp",
        progressBar: true,
        close: true,
      });
      return;
    }

    const userFavRef = ref(db, `favorites/${user.uid}`);
    const snapshot = await get(userFavRef);
    const currentFavorites = snapshot.exists() ? snapshot.val() : {};

    // let updatedFavorites;
    if (currentFavorites[itemId]) {
      // видалити
      delete currentFavorites[itemId];
    } else {
      // додати
      currentFavorites[itemId] = true;
    }

    await set(userFavRef, currentFavorites);
    setIsFavorite(!isFavorite);
  };

  return { isFavorite, toggleFavorite };
};
