import { useNavigate } from "react-router-dom";
import css from "./Hero.module.css";
import hero from "../../assets/hero.jpg";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className={css.hero}>
      <div className={css.content}>
        <div className={css.textWrapper}>
          <h1 className={css.title}>
            Unlock your potential with the best{" "}
            <span className={css.span}>language</span> tutors
          </h1>
          <p className={css.text}>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>
          <button
            className={css.btn}
            onClick={() => {
              setTimeout(() => {
                navigate("/teachers");
              }, 180);
            }}
          >
            Get started
          </button>
        </div>

        <div className={css.imgWrapper}>
          <img src={hero} alt="image girl with laptop" className={css.image} />
        </div>
      </div>

      <div className={css.statsWrapper}>
        <div className={css.statItem}>
          <span className={css.statNumber}>32,000 +</span>
          <span className={css.statLabel}>Experienced tutors</span>
        </div>
        <div className={css.statItem}>
          <span className={css.statNumber}>300,000 +</span>
          <span className={css.statLabel}>5-star tutor reviews</span>
        </div>
        <div className={css.statItem}>
          <span className={css.statNumber}>120 +</span>
          <span className={css.statLabel}>Subjects taught</span>
        </div>
        <div className={css.statItem}>
          <span className={css.statNumber}>200 +</span>
          <span className={css.statLabel}>Tutor nationalities</span>
        </div>
      </div>
    </section>
  );
}
