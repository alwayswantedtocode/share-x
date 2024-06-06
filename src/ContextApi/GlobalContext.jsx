import { useContext, createContext, useEffect, useState, useRef } from "react";

const GlobalContext = createContext();

export const AppProvider = ({ children }) => {
  const moreRef = useRef(null);
  const commentRef = useRef(null);
  const editPostRef = useRef(null);
  const closeAsideRef = useRef(null);
  const searchBarRef = useRef();
  const closeEditTexRef = useRef();
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
        moreRef,
        commentRef,
        editPostRef,
        closeAsideRef,
        searchBarRef,
        closeEditTexRef,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
