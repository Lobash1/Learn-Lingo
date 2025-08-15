import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../../services/firebase.js";
import css from "../../pages/Teachers/Teachers.module.css";
import Container from "../../components/Container/Container";
import Filters from "../../components/Filters/Filters";
import TeachersList from "../../components/TeachersList/TeachersList";
import LoadMoreButton from "../../components/LoadMoreButton/LoadMoreButton.jsx";

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    async function fetchTeachers() {
      try {
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
      }
    }

    fetchTeachers();
  }, []);

  return (
    <div className={css.wrapper}>
      <Container>
        <Filters />
        <TeachersList teachers={teachers} />
        <LoadMoreButton />
      </Container>
    </div>
  );
}
