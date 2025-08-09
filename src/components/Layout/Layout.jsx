import { Outlet, Link } from "react-router-dom";
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
            <div className={css.logo}>
              <img src={logo} width={28} height={28} alt="flag Ukraine" />
              <p className={css.logoText}>LearnLingo</p>
            </div>

            <nav className={css.nav}>
              <Link to="/">Home</Link>
              <Link to="/teachers">Teachers</Link>
              {/* <Link to="/favorites">Favorites</Link> */}
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
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  );
}
