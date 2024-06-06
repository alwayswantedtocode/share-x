import { useState, useEffect } from "react";
import { useGlobalContext } from "../ContextApi/GlobalContext";

const useSearch = () => {
  const { searchBarRef } = useGlobalContext();
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const closeSearchBar = (e) => {
    e.stopPropagation();
    if (!searchBarRef.current.contains(e.target)) {
      setIsSearchVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeSearchBar);
    return () => {
      document.removeEventListener("mousedown", closeSearchBar);
    }
  },[])

  return {
    isSearchVisible,
    setIsSearchVisible,
    toggleSearchVisibility,
  };
};

export default useSearch;
