import { useContext, createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export const AppProvider = ({ children }) => {
  const [isDarkMode, setIsModeDark] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  useEffect(() => {
    localStorage.getItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const modeToggle = () => {
    setIsModeDark(!isDarkMode);
  };
  return (
    <GlobalContext.Provider value={{ isDarkMode, modeToggle }}>
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
