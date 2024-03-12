import { useContext, createContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export const AppProvider = ({ children }) => {
  const [isDarkMode, setIsModeDark] = useState(
    JSON.parse(localStorage.getItem("DarkMode")) || false
  );

  const [editDetails, setEditDetails] = useState(false);

  const openEditInfo = () => {
    setEditDetails(true);
  };
  const closeEditInfo = () => {
    setEditDetails(false);
  };

  useEffect(() => {
    localStorage.setItem("DarkMode", isDarkMode);
  }, [isDarkMode]);

  const modeToggle = () => {
    setIsModeDark(!isDarkMode);
  };

  return (
    <GlobalContext.Provider
      value={{
        isDarkMode,
        modeToggle,
        openEditInfo,
        closeEditInfo,
        editDetails,
        setEditDetails,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
