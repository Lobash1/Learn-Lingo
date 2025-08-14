// import { useEffect, useState } from "react";
// import { ref, get } from "firebase/database";
// import { db } from "../../services/firebase.js";
import css from "../../pages/Teachers/Teachers.module.css";
import Container from "../../components/Container/Container";
import Filters from "../../components/Filters/Filters";
import TeachersList from "../../components/TeachersList/TeachersList";
import LoadMoreButton from "../../components/LoadMoreButton/LoadMoreButton.jsx";

export default function Teachers() {
  return (
    <div className={css.wrapper}>
      <Container>
        <Filters />
        <TeachersList />
        <LoadMoreButton />
      </Container>
    </div>
  );
}
