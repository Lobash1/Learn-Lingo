import css from "./TeacherCard.module.css";
import { IoIosStar } from "react-icons/io";
import { IoBookOutline } from "react-icons/io5";
import heart from "../../assets/heart.png";
import heartFilled from "../../assets/heartFilled.png";
// import BookingModal from "../BookingModal/BookingModal.jsx";

import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../services/AuthContext.js";
import { useFavorites } from "../../hooks/useFavorites.jsx";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export default function TeacherCard({
  teacher,
  isFavoritePage = false,
  onRemoveFavorite,
  onBook,
}) {
  const {
    id,
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
    experience,
  } = teacher;

  const getRandomSeed = () => Math.random().toString(36).substring(2, 10);
  const seed = getRandomSeed();
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;

  const [review, setReview] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const { isAuth, user } = useContext(AuthContext);

  const { isFavorite: isFavFromHook, toggleFavorite } = useFavorites(
    user,
    isAuth,
    id
  );

  const isFavorite = isFavoritePage ? true : isFavFromHook;

  const handleClick = async () => {
    if (!isAuth || !user) {
      iziToast.warning({
        title: "Attention",
        message: "This functionality is available only to authorized users.",
        position: "topCenter",
        timeout: 3000,
        transitionIn: "fadeInDown",
        transitionOut: "fadeOutUp",
        progressBar: true,
        close: true,
      });
      return;
    }

    await toggleFavorite();
    if (isFavoritePage && onRemoveFavorite) {
      setIsRemoving(true);

      setTimeout(() => {
        onRemoveFavorite(id);
      }, 500);
    }
  };

  return (
    <div className={`${css.card} ${isRemoving ? css.fadeOut : ""}`}>
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
                <span>Rating: {rating.toFixed(1)}</span>
              </div>

              <div className={css.infoItem}>
                <span>Price / 1 hour:</span>
                <span className={css.prices}>{price_per_hour}$</span>
              </div>
            </div>
            <div className={css.btn}>
              <button className={css.heartBtn} onClick={handleClick}>
                <img src={isFavorite ? heartFilled : heart} alt="heart" />
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
          {review && <p className={css.description}>{experience}</p>}

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
          {review && (
            <>
              <button
                className={css.btnLesson}
                onClick={() => onBook(teacher)}
                // onClick={() => setShowModal(true)}
              >
                Book trial lesson
              </button>

              {/* {showModal && (
                <BookingModal
                  teacher={teacher}
                  onClose={() => setShowModal(false)}
                />
              )} */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
