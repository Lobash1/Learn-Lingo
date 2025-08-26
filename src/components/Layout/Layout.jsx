import { Outlet, NavLink, Link } from "react-router-dom";
import css from "./Layout.module.css";
import { useState } from "react";
import { auth } from "../../services/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import logo from "../../assets/LogoUK.png";
import login from "../../assets/log-in-01.png";

import Container from "../Container/Container.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import Registration from "../Registration/Registration.jsx";
import LogoutButton from "../LogoutButton/LogoutButton.jsx";

export default function Layout() {
  const [user] = useAuthState(auth);
  const isAuth = !!user;

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [menuOpen, setmenuOpen] = useState(false);

  return (
    <>
      <header className={css.header}>
        <Container>
          <div className={css.headerInner}>
            <Link to="/" className={css.logo}>
              <img src={logo} width={28} height={28} alt="flag Ukraine" />
              <p className={css.logoText}>LearnLingo</p>
            </Link>

            <nav className={`${css.nav} ${menuOpen ? css.open : ""}`}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? `${css.link} ${css.active}` : css.link
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/teachers"
                className={({ isActive }) =>
                  isActive ? `${css.link} ${css.active}` : css.link
                }
              >
                Teachers
              </NavLink>

              {isAuth && (
                <NavLink
                  to="/favorites"
                  className={({ isActive }) =>
                    isActive ? `${css.link} ${css.active}` : css.link
                  }
                >
                  Favorites
                </NavLink>
              )}
            </nav>

            <div className={css.auth}>
              {user ? (
                <LogoutButton />
              ) : (
                <>
                  <button
                    className={css.btnLog}
                    onClick={() => setIsLoginOpen(true)}
                  >
                    <img
                      className={css.imgLogin}
                      src={login}
                      alt="login icon"
                    />
                    Log in
                  </button>

                  <LoginModal
                    isOpen={isLoginOpen}
                    onClose={() => setIsLoginOpen(false)}
                  />
                  <button
                    className={css.btnReg}
                    onClick={() => setIsRegister(true)}
                  >
                    Registration
                  </button>

                  <Registration
                    isOpen={isRegister}
                    onClose={() => setIsRegister(false)}
                  />
                </>
              )}
            </div>

            {/* burger */}
            <button
              className={css.burger}
              onClick={() => setmenuOpen((prev) => !prev)}
            >
              ☰
            </button>
          </div>
        </Container>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
