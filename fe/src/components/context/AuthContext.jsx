import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(() => localStorage.getItem("isLogged") === "true");
  const [user, setUser] = useState(() => localStorage.getItem("username") || "");

  useEffect(() => {
    localStorage.setItem("isLogged", isLogged);
    if (!isLogged) {
      localStorage.removeItem("username");
    }
  }, [isLogged]);

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
