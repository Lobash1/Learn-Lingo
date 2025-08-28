// import { signOut } from "firebase/auth";
// import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import css from "./LogoutButton.module.css";
import login from "../../assets/log-in-01.png";
import { getFirebase } from "../../services/firebase.js";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { auth } = await getFirebase();
      const { signOut } = await import("firebase/auth");

      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("login error", error);
    }
  };
  return (
    <button className={css.btn} onClick={handleLogout}>
      <img className={css.imgLogin} src={login} alt="login icon" />
      Logout
    </button>
  );
}
