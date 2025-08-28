import css from "./LoginModal.module.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import close from "../../assets/close.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getFirebase } from "../../services/firebase.js";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email address is not correct")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

export default function LoginModal({ isOpen, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const successMessage = (message) => {
    iziToast.success({
      title: "Success",
      message,
      position: "topCenter",
      timeout: 3000,
    });
  };

  // close modal
  useEffect(() => {
    function onEsc(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", onEsc);
    }
    return () => {
      window.removeEventListener("keydown", onEsc);
    };
  }, [isOpen, onClose]);

  const onSubmit = async (data) => {
    try {
      const { auth } = await getFirebase();
      const { signInWithEmailAndPassword } = await import("firebase/auth");
      await signInWithEmailAndPassword(auth, data.email, data.password);
      successMessage(`Welcome, ${data.email}!`);
      reset();
      onClose();
    } catch (error) {
      iziToast.error({
        title: "Error",
        message: error.message,
        position: "topCenter",
        timeout: 5000,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.btn} onClick={onClose} aria-label="Close modal">
          <img src={close} alt="close" />
        </button>

        <div className={css.textWrapper}>
          <h2 className={css.title}>Log in</h2>
          <p className={css.text}>
            Welcome back! Please enter your credentials to access your account
            and continue your search for an teacher.
          </p>
        </div>

        <form
          className={css.inputs}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <input
            className={css.input}
            type="email"
            placeholder="Email"
            {...register("email")}
          />

          <p className={css.error}>
            {errors.email ? errors.email.message : ""}
          </p>

          <div className={css.passwordWrapper}>
            <input
              className={css.input}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
            />
            <button
              type="button"
              className={css.eyeBtn}
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>

          <p className={css.error}>
            {errors.password ? errors.password.message : ""}
          </p>

          <button type="submit" disabled={isSubmitting} className={css.button}>
            {isSubmitting ? "Log in" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
