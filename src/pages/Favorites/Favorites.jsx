import { useEffect, useState, useContext } from "react";
import { ref, get, remove } from "firebase/database";
import { getFirebase } from "../../services/firebase.js";
import { AuthContext } from "../../services/AuthContext.jsx";
import TeachersList from "../../components/TeachersList/TeachersList.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import Container from "../../components/Container/Container.jsx";
import css from "../../components/TeachersList/TeachersList.module.css";
import iziToast from "izitoast";

export default function Favorites() {
  const { user, isAuth } = useContext(AuthContext);
  const [favoriteTeachers, setFavoriteTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firebaseDb, setFirebaseDb] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      const { db } = await getFirebase();
      setFirebaseDb(db);

      if (!isAuth || !user) {
        setFavoriteTeachers([]);
        setLoading(false);
        return;
      }

      try {
        const { db } = await getFirebase(); // ← получаем db асинхронно

        const favSnapshot = await get(ref(db, `favorites/${user.uid}`));
        const favoriteIds = favSnapshot.exists()
          ? Object.keys(favSnapshot.val())
          : [];

        const teacherPromises = favoriteIds.map(async (id) => {
          const teacherSnap = await get(ref(db, `teachers/${id}`));
          return teacherSnap.exists() ? { id, ...teacherSnap.val() } : null;
        });

        const teachers = await Promise.all(teacherPromises);
        setFavoriteTeachers(teachers.filter(Boolean));
      } catch (error) {
        console.error("Error fetching favorites:", error);
        iziToast.error({ message: "Failed to load favorites." });
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user, isAuth]);

  const handleRemoveFavorite = async (teacherId) => {
    if (!user || !teacherId) return;

    const userFavRef = ref(firebaseDb, `favorites/${user.uid}/${teacherId}`);

    try {
      await remove(userFavRef);

      setFavoriteTeachers((prev) =>
        prev.filter((teacher) => teacher.id !== teacherId)
      );
      iziToast.success({
        message: "The teacher has been removed from your favorites!",
        position: "topCenter",
        timeout: 3000,
      });
    } catch (error) {
      console.error("Error delete", error);
      iziToast.error({ message: "Unable to delete teacher." });
    }
  };

  if (loading) return <Loader />;

  return (
    <div className={css.wrapper}>
      <Container>
        <div className={css.favoritesPage}>
          <h2 className={css.titleFavorite}>My chosen teachers</h2>
          {loading ? (
            <Loader />
          ) : favoriteTeachers.length === 0 ? (
            <p className={css.emp}>You don't have any teachers selected yet.</p>
          ) : (
            <TeachersList
              teachers={favoriteTeachers}
              isFavoritePage={true}
              onRemoveFavorite={handleRemoveFavorite}
            />
          )}
        </div>
      </Container>
    </div>
  );
}
