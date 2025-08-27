import { useState } from "react";
import css from "./Filters.module.css";

export default function Filters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    language: "",
    level: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...filters, [name]: value };
    setFilters(updated);
    onFilterChange(updated);
  };

  return (
    <div className={css.filters}>
      <div className={css.blok}>
        <p className={css.text}>Language</p>
        <select
          name="language"
          className={css.select}
          value={filters.language}
          onChange={handleChange}
        >
          <option value="">All</option>
          <option value="French">French</option>
          <option value="English">English</option>
          <option value="German">German</option>
          <option value="Spanish">Spanish</option>
          <option value="Italian">Italian</option>
          <option value="Korean">Korean</option>
          <option value="Mandarin Chinese">Mandarin Chinese</option>
          <option value="Vietnamese">Vietnamese</option>
        </select>
      </div>

      <div className={css.blok}>
        <p className={css.text}>Level of Knowledge</p>
        <select
          name="level"
          className={css.select}
          value={filters.level}
          onChange={handleChange}
        >
          <option value="">All</option>
          <option value="A1 Beginner">A1 Beginner</option>
          <option value="A2 Elementary">A2 Elementary</option>
          <option value="B1 Intermediate">B1 Intermediate</option>
          <option value="B2 Upper-Intermediate">B2 Upper-intermediate</option>
          <option value="C1 Advanced">C1 Advanced</option>
          <option value="C2 Proficient">C2 Proficient</option>
        </select>
      </div>

      <div className={css.blok}>
        <p className={css.text}>Price</p>
        <select
          name="price"
          className={css.select}
          value={filters.price}
          onChange={handleChange}
        >
          <option value="">All</option>

          <option value="20">20 $</option>
          <option value="25">25 $</option>
          <option value="30">30 $</option>
          <option value="35">35 $</option>
          <option value="40">40 $</option>
        </select>
      </div>
    </div>
  );
}
