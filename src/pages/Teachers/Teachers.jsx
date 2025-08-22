import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../../services/firebase.js";
import css from "../../pages/Teachers/Teachers.module.css";
import Container from "../../components/Container/Container";
import Filters from "../../components/Filters/Filters";
import TeachersList from "../../components/TeachersList/TeachersList";
import Loader from "../../components/Loader/Loader";

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchTeachers() {
      try {
        setLoading(true);
        const snapshot = await get(ref(db, "teachers"));

        if (snapshot.exists()) {
          const data = snapshot.val();
          const formatted = Object.entries(data).map(([id, teacher]) => ({
            id,
            ...teacher,
          }));
          setTeachers(formatted);
        } else {
          console.log("No teachers found");
        }
      } catch (error) {
        console.log("not", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTeachers();
  }, []);

  return (
    <div className={css.wrapper}>
      <Container>
        <Filters />
        {loading ? <Loader /> : <TeachersList teachers={teachers} />}

        {/* <LoadMoreButton /> */}
      </Container>
    </div>
  );
}
