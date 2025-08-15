import css from "./TeacherCard.module.css";
import { IoIosStar } from "react-icons/io";

import { IoBookOutline } from "react-icons/io5";
import heart from "../../assets/heart.png";

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
      <div className={css.avatarWrapper}>
        <div className={css.avatarBorder}>
          <img src={avatar_url} alt={name} className={css.avatar} />
        </div>
        <span className={css.online}></span>
      </div>
      {/* =============================================================== */}
      <div className={css.textWrapper}>
        <div className={css.infoTop}>
          <div className={css.name}>
            <p className={css.textLeft}>Language</p>
            <p className={css.surname}>
              {name} {surname}
            </p>
          </div>

          <div className={css.textRight}>
            <div className={css.wrap}>
              <p className={css.onlineBox}>
                <span className={css.inlineIconText}>
                  <IoBookOutline className={css.iconBook} /> Lessons online{" "}
                </span>

                <span className={css.inlineIconText}>
                  {"   | Lessons done:  "}
                  {lessons_done}
                  {"  |  "}
                </span>

                <span className={css.inlineIconText}>
                  <IoIosStar className={css.iconStar} /> Rating: {rating}
                </span>
              </p>
              <p>
                {"  |  "}
                {"Price / 1 hour:"}
                <span className={css.prices}>{price_per_hour}$</span>
              </p>
            </div>
            <img src={heart} alt="heart" />
          </div>
        </div>
        {/* ================================================================ */}
        <div className={css.infoMain}>
          <p>
            <strong>Speaks:</strong> {languages.join(", ")}
          </p>
          <p>{lesson_info}</p>
          <p>{conditions}</p>

          <div className={css.reviews}>
            {reviews.map((review, idx) => (
              <div key={idx} className={css.reviewCard}>
                <p>
                  <strong>{review.reviewer_name}</strong> (
                  {review.reviewer_rating}★)
                </p>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
          <div className={css.levels}>
            {levels.map((level, idx) => (
              <span key={idx} className={css.levelTag}>
                {level}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
