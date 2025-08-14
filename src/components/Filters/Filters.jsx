import React from "react";
import css from "./Filters.module.css";

export default function Filters() {
  return (
    <div className={css.filters}>
      <div className={css.blok}>
        <p className={css.text}>Language</p>
        <select className={css.select}>
          <option className={css.option}>French</option>
          <option>English</option>
          <option>German</option>
          <option>Ukrainian</option>
          <option>Polish</option>
        </select>
      </div>

      <div className={css.blok}>
        <p className={css.text}>Level of Knowledge</p>
        <select className={css.select}>
          <option>A1 Beginner</option>
          <option>A2 Elementary</option>
          <option>B1 Intermediate</option>
          <option>B2 Upper-intermediate</option>
        </select>
      </div>

      <div className={css.blok}>
        <p className={css.text}>Price</p>
        <select className={css.select}>
          <option>10 $</option>
          <option>20 $</option>
          <option>30 $</option>
          <option>40 $</option>
        </select>
      </div>
    </div>
  );
}
