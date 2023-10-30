import { useContext } from "react";
import { AuthContext } from "./authProvider";

export const useUserContext = () => {
  return useContext(AuthContext);
};
