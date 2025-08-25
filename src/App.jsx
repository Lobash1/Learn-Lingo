import { Routes, Route } from "react-router";
import { Suspense, lazy } from "react";
import Layout from "./components/Layout/Layout.jsx";
import Loader from "./components/Loader/Loader.jsx";

const Home = lazy(() => import("./pages/Home/Home.jsx"));
const Teachers = lazy(() => import("./pages/Teachers/Teachers.jsx"));
const Favorites = lazy(() => import("./pages/Favorites/Favorites.jsx"));
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage.jsx")
);

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
