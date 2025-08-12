import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import css from "./LogoutButton.module.css";
import login from "../../assets/log-in-01.png";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
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
