import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../../services/firebase.js";
import { AuthContext } from "../../services/AuthContext.js";
// import TeacherCard from "../../components/TeacherCard/TeacherCard.jsx";
import TeachersList from "../../components/TeachersList/TeachersList.jsx";
import { useContext } from "react";
import Loader from "../../components/Loader/Loader.jsx";
import css from "../../components/TeachersList/TeachersList.module.css";
import Container from "../../components/Container/Container.jsx";

export default function Favorites() {
  const { user, isAuth } = useContext(AuthContext);
  const [favoriteTeachers, setFavoriteTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  // const isFavorite = favoritesIds.includes(teacher.id);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!isAuth || !user) {
        setFavoriteTeachers([]);
        setLoading(false);
        return;
      }

      const favSnapshot = await get(ref(db, `favorites/${user.uid}`));
      const favoriteIds = favSnapshot.exists()
        ? Object.keys(favSnapshot.val())
        : [];

      const teacherPromises = favoriteIds.map(async (id) => {
        const teacherSnap = await get(ref(db, `teachers/${id}`));
        return teacherSnap.exists() ? teacherSnap.val() : null;
      });

      const teachers = await Promise.all(teacherPromises);
      setFavoriteTeachers(teachers.filter(Boolean));
      setLoading(false);
    };

    fetchFavorites();
  }, [user, isAuth]);

  return (
    <Container>
      <div className={css.favoritesPage}>
        <h2 className={css.title}>Мої обрані викладачі</h2>

        {loading ? (
          <Loader />
        ) : favoriteTeachers.length === 0 ? (
          <p className={css.empty}>У вас поки немає обраних викладачів.</p>
        ) : (
          <TeachersList
            teachers={favoriteTeachers}
            favoriteIds={favoriteTeachers.map((t) => t.id)}
            isFavoritePage={true}
          />
        )}
      </div>
    </Container>
  );
}
