import { useState, useEffect } from "react";
import { useGlobalContext } from "../ContextApi/GlobalContext";


const useSearch = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };



  return {
    isSearchVisible,
    setIsSearchVisible,
    toggleSearchVisibility,

  };
};

export default useSearch;
