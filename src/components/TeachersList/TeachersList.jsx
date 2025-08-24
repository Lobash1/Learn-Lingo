import { useState } from "react";

import css from "./TeachersList.module.css";
import TeacherCard from "../TeacherCard/TeacherCard.jsx";
import Loader from "../Loader/Loader.jsx";
import LoadMoreButton from "../../components/LoadMoreButton/LoadMoreButton.jsx";
import BookingModal from "../BookingModal/BookingModal.jsx";

export default function TeachersList({
  teachers,
  onToggleFavorite,
  onRemoveFavorite,
  isFavoritePage = false,
}) {
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const handleLoadMore = async () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 4);
      setLoading(false);
    }, 1000);
  };

  const handleBook = (teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleCloseModal = () => {
    setSelectedTeacher(null);
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
            onBook={handleBook}
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

      {selectedTeacher && (
        <BookingModal teacher={selectedTeacher} onClose={handleCloseModal} />
      )}
    </div>
  );
}
