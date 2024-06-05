import { useCallback, useEffect, useState } from "react";
import { useGlobalContext } from "../ContextApi/GlobalContext";

const useHandlePostOptions = () => {
  const { moreRef, editPostRef,} =
    useGlobalContext();
  const [more, setMore] = useState(false);

  const handleMoreOptions = () => {
    setMore(!more);
  };

  const closePotionOnmousedown = (event) => {
    if (moreRef.current && !moreRef.current.contains(event.target)) {
      setMore(false);
    } else {
      event.stopPropagation();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", closePotionOnmousedown);
    return () => {
      document.removeEventListener("mousedown", closePotionOnmousedown);
    };
  }, []);

  return {
    more,
    setMore,
    handleMoreOptions,
    closePotionOnmousedown,
  };
};

export default useHandlePostOptions;
