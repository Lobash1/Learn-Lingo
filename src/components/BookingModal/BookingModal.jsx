import css from "./BookingModal.module.css";
import close from "../../assets/close.png";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const schema = yup.object().shape({
  reason: yup.string().required("Select reason"),
  fullName: yup.string().required("Enter yuor name"),
  email: yup
    .string()
    .email("Email address is not correct")
    .required("Email is required"),
  phone: yup.string().required("Phone number is required"),
});

export default function BookingModal({ teacher, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    iziToast.success({
      title: "Success",
      message: "You trial lesson has been booked!",
      position: "topCenter",
    });
    reset();
    onClose();
  };

  // Закриття по Esc
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.btn} onClick={onClose} aria-label="Close modal">
          <img src={close} alt="close" />
        </button>

        <div className={css.textWrapper}>
          <h2 className={css.title}>Book trial lesson</h2>
          <p className={css.text}>
            Our experienced tutor will assess your current language level,
            discuss your learning goals, and tailor the lesson to your specific
            needs.
          </p>

          <div className={css.teacherInfo}>
            <img
              src={teacher.avatar_url}
              alt={`${teacher.name} ${teacher.surname}`}
              className={css.avatar}
            />
            <p className={css.speaks}>
              Your teacher:{" "}
              <strong className={css.strong}>
                {teacher.name} {teacher.surname}
              </strong>
            </p>
          </div>

          <div>
            <div className={css.radioGroup}>
              <p className={css.main}>
                What is your main reason for learning English?
              </p>

              {[
                "Career and business",
                "Lesson for kids",
                "Living abroad",
                "Exams and coursework",
                "Culture, travel or hobby",
              ].map((option) => (
                <label key={option} className={css.radioLabel}>
                  <input
                    type="radio"
                    value={option}
                    {...register("reason")}
                    className={css.radioInput}
                  />
                  <span className={css.customRadio}></span>
                  <span>{option}</span>
                </label>
              ))}
            </div>
            <p className={css.error}>
              {errors.reason ? errors.reason.message : ""}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
            <input
              type="text"
              {...register("fullName")}
              className={css.input}
              placeholder="Full Name"
            />

            <p className={css.error}>
              {errors.fullName ? errors.fullName.message : ""}
            </p>

            <input
              type="email"
              {...register("email")}
              className={css.input}
              placeholder="Email"
            />
            <p className={css.error}>
              {errors.email ? errors.email.message : ""}
            </p>

            <input
              type="tel"
              {...register("phone")}
              className={css.input}
              placeholder="Phone number"
            />

            <p className={css.error}>
              {errors.phone ? errors.phone.message : ""}
            </p>

            <button type="submit" className={css.submitBtn}>
              Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
