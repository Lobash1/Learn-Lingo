import { useState } from "react";

import css from "./TeachersList.module.css";
import TeacherCard from "../TeacherCard/TeacherCard.jsx";
import Loader from "../Loader/Loader.jsx";
import LoadMoreButton from "../../components/LoadMoreButton/LoadMoreButton.jsx";

export default function TeachersList({
  teachers,
  onToggleFavorite,
  onRemoveFavorite,
  isFavoritePage = false,
}) {
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = async () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 4);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className={css.wrapper}>
      <div className={css.teachersList}>
        {teachers.slice(0, visibleCount).map((teacher, index) => (
          <TeacherCard
            key={teacher.id || index}
            teacher={teacher}
            isFavoritePage={isFavoritePage}
            onToggleFavorite={onToggleFavorite}
            onRemoveFavorite={() => onRemoveFavorite(teacher.id)}
          />
        ))}

        {visibleCount < teachers.length &&
          (loading ? (
            <div className={css.loaderWrapper}>
              <Loader />
            </div>
          ) : (
            <LoadMoreButton onClick={handleLoadMore} />
          ))}
      </div>
    </div>
  );
}
