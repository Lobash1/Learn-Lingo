import { Outlet, NavLink, Link } from "react-router-dom";
import css from "./Layout.module.css";
import Container from "../Container/Container.jsx";
import logo from "../../assets/LogoUK.png";
import login from "../../assets/log-in-01.png";

export default function Layout() {
  return (
    <>
      <header className={css.header}>
        <Container>
          <div className={css.headerInner}>
            <Link to="/" className={css.logo}>
              <img src={logo} width={28} height={28} alt="flag Ukraine" />
              <p className={css.logoText}>LearnLingo</p>
            </Link>

            <nav className={css.nav}>
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
              {/* <NavLink to="/favorites" className={({ isActive }) => isActive ? `${css.link} ${css.active}` : css.link}>Favorites</NavLink> */}
            </nav>

            <div className={css.auth}>
              <button className={css.btnLog}>
                <img className={css.imgLogin} src={login} />
                Log in
              </button>
              <button className={css.btnReg}>Registration</button>
            </div>
          </div>
        </Container>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
