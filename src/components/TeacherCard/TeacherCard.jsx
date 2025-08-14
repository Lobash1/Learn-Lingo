import css from "./TeacherCard.module.css";
import React from "react";

export default function TeacherCard({ teacher }) {
  const {
    name,
    surname,
    languages,
    lesson_info,
    conditions,
    reviews,
    levels,
    rating,
    price_per_hour,
    lessons_done,
    avatar_url,
  } = teacher;

  return (
    <div className={css.card}>
      <img src={avatar_url} alt={name} className={css.avatar} />

      <div className={css.infoTop}>
        <p>Language</p>
        <p>
          Lessons online | Lessons done: {lessons_done} | Rating: {rating} |
          Price / 1 hour:{price_per_hour}$
        </p>
      </div>

      <div className={css.infoMain}>
        <h3>
          {name} {surname}
        </h3>
        <p>
          <strong>Speaks:</strong> {languages.join(", ")}
        </p>
        <p>{lesson_info}</p>
        <p>{conditions}</p>

        <p>{reviews}</p>
        <div className={css.levels}>
          {levels.map((level, idx) => (
            <span key={idx} className={css.levelTag}>
              {level}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
