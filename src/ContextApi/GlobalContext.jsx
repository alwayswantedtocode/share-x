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
  const [showEditbio, setShoweditbio] = useState(false);
  const [showfollowlist, setShowfollowlist] = useState(false);

  //Handle Open Bio text field
  const handleOpenEditbio = () => {
    setShoweditbio(true);
  };

  //Handle close Bio text field
  const handleCancelEditbio = (e) => {
    e.preventDefault();

    setShoweditbio(false);
  };
  //Handle Open edit/update user details text field
  const openEditInfo = () => {
    setEditDetails(true);
    if (showEditbio === true) {
      setShoweditbio(false);
    }
  };
  //Handle Close edit/update user details text field
  const closeEditInfo = () => {
    setEditDetails(false);
  };

  //Handle Open users follow list
  const openFollowsList = () => {
    setShowfollowlist(true);
  };

  //Handle close users follow list
  const closeFollowsList = () => {
    setShowfollowlist(false);
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
        showEditbio,
        setShoweditbio,
        handleOpenEditbio,
        handleCancelEditbio,
        showfollowlist,
        openFollowsList,
        closeFollowsList,
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
