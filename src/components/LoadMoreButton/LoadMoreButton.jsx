import css from "./LoadMoreButton.module.css";

export default function LoadMoreButton({ onClick, disabled }) {
  return (
    <div className={css.button}>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={css.btn}
      >
        Load More
      </button>
    </div>
  );
}
