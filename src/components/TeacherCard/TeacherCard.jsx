import css from "./TeacherCard.module.css";
import { IoIosStar } from "react-icons/io";
import { IoBookOutline } from "react-icons/io5";
import heart from "../../assets/heart.png";
import { useState } from "react";

export default function TeacherCard({ teacher }) {
  const {
    name,
    surname,
    languages,
    lesson_info,
    conditions,
    reviews = [],
    levels,
    rating,
    price_per_hour,
    lessons_done,
    avatar_url,
  } = teacher;

  const getRandomSeed = () => Math.random().toString(36).substring(2, 10);
  const seed = getRandomSeed();
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;

  const [review, setReview] = useState(false);
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
          {/* =========================================== */}

          <div className={css.textRight}>
            <div className={css.wrap}>
              <div className={css.infoItem}>
                <IoBookOutline className={css.iconBook} />
                <span>Lessons online</span>
              </div>

              <div className={css.infoItem}>
                <span>Lessons done: {lessons_done}</span>
              </div>

              <div className={css.infoItem}>
                <IoIosStar className={css.iconStar} />
                <span>Rating: {rating}</span>
              </div>

              <div className={css.infoItem}>
                <span>Price / 1 hour:</span>
                <span className={css.prices}>{price_per_hour}$</span>
              </div>
            </div>
            <div className={css.btn}>
              <button className={css.heartBtn}>
                <img src={heart} alt="heart" />
              </button>
            </div>
          </div>
        </div>
        {/* =============================================================================================================================== */}
        <div className={css.infoMain}>
          <p className={css.speak}>
            <strong className={css.strong}>Speaks:</strong>{" "}
            {languages.join(", ")}
          </p>
          <p className={css.speaks}>
            <strong className={css.strong}>Lesson info:</strong> {lesson_info}
          </p>

          <p className={css.speaks}>
            <strong className={css.strong}>Conditions:</strong> {conditions}
          </p>

          {/* ========close card======================= */}

          {!review && (
            <button className={css.button} onClick={() => setReview(true)}>
              Read more
            </button>
          )}

          {/* ========open card======================= */}

          {review && (
            <div className={css.reviews}>
              {reviews.map((review, idx) => (
                <div key={idx} className={css.reviewCard}>
                  <div className={css.header}>
                    <img
                      src={avatarUrl}
                      alt="Random avatar"
                      className={css.ava}
                    />

                    <div className={css.infoText}>
                      <p className={css.name}>{review.reviewer_name}</p>

                      <p className={css.rat}> ⭐ {review.reviewer_rating}</p>

                      {/* <div className={css.rat}>
                        <FaStar className={css.star} /> {rating.toFixed(1)}
                      </div> */}
                    </div>
                  </div>
                  <p className={css.comment}>{review.comment}</p>
                </div>
              ))}
            </div>
          )}

          {/* levels */}
          <div className={css.levels}>
            {levels.map((level, idx) => (
              <span
                key={idx}
                className={`${css.levelTag} ${idx === 0 ? css.highlight : ""}`}
              >
                #{level}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
