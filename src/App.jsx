import { Routes, Route } from "react-router";

import Layout from "./components/Layout/Layout.jsx";

import Home from "./pages/Home/Home.jsx";
import Teachers from "./pages/Teachers/Teachers.jsx";
import Favorites from "./pages/Favorites/Favorites.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="favorites" element={<Favorites />} />
      </Route>
    </Routes>
  );
}
