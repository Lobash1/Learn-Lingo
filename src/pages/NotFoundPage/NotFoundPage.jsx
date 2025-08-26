import { Link } from "react-router-dom";
import Container from "../../components/Container/Container.jsx";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <Container>
      <div className={css.container}>
        <h1 className={css.title}>404</h1>
        <p className={css.text}>Oops! Page not found</p>
        <p className={css.text}>
          It looks like you’ve come to the wrong place. <br />
          Check the URL or return to the homepage.
        </p>

        <Link to="/" className={css.link}>
          ⬅ Back to Home
        </Link>
      </div>
    </Container>
  );
}
