import { useEffect, useState, useMemo } from "react";
import { ref, get } from "firebase/database";
import { getFirebase } from "../../services/firebase.js";
import css from "../../pages/Teachers/Teachers.module.css";
import Container from "../../components/Container/Container";
import Filters from "../../components/Filters/Filters";
import TeachersList from "../../components/TeachersList/TeachersList";
import Loader from "../../components/Loader/Loader";

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    async function fetchTeachers() {
      try {
        setLoading(true);
        const { db } = await getFirebase();
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

  const filteredTeachers = useMemo(() => {
    const toNumber = (v) => {
      if (v === undefined || v === null) return NaN;
      const m = String(v).match(/[\d.]+/);
      return m ? Number(m[0]) : NaN;
    };

    const maxPrice = toNumber(filters.price);

    return teachers.filter((t) => {
      if (filters.language && !t.languages?.includes(filters.language)) {
        return false;
      }

      if (filters.level && !t.levels?.includes(filters.level)) {
        return false;
      }

      if (!Number.isNaN(maxPrice)) {
        const teacherPrice = toNumber(t.price_per_hour);
        if (!Number.isNaN(teacherPrice) && teacherPrice > maxPrice) {
          return false;
        }
      }

      return true;
    });
  }, [teachers, filters]);

  return (
    <div className={css.wrapper}>
      <Container>
        <Filters onFilterChange={setFilters} />
        {loading ? <Loader /> : <TeachersList teachers={filteredTeachers} />}
      </Container>
    </div>
  );
}
