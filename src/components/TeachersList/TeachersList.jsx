import css from "./TeachersList.module.css";
import React from "react";
import TeacherCard from "../TeacherCard/TeacherCard.jsx";

export default function TeachersList({ teachers }) {
  return (
    <div className={css.teachersList}>
      {teachers.map((teacher) => (
        <TeacherCard key={teacher.id} teacher={teacher} />
      ))}
    </div>
  );
}
