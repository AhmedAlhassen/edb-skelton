import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useLocalStorage("presist", {});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
