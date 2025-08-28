import { useContext } from "react";
import { AuthContext } from "../services/AuthContext.jsx";

export default function useAuth() {
  return useContext(AuthContext);
}
