import { useCallback, useEffect, useState } from "react";
import { useGlobalContext } from "../ContextApi/GlobalContext";

const useHandlePostOptions = () => {
  const { moreRef, editPostRef } = useGlobalContext();
  const [more, setMore] = useState(false);

  const handleMoreOptions = () => {
    setMore(!more);
  };

  const closePotionOnmousedown = (event) => {
    event.stopPropagation();
    if (!moreRef.current.contains(event.target)) {
      setMore(false);
    }
  };

  return {
    more,
    setMore,
    handleMoreOptions,
    closePotionOnmousedown,
  };
};

export default useHandlePostOptions;
