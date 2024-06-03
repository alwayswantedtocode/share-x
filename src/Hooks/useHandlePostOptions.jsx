import { useCallback, useEffect, useState } from "react";
import { useGlobalContext } from "../ContextApi/GlobalContext";

const useHandlePostOptions = () => {
  const { moreRef, editPostRef } = useGlobalContext();
  const [more, setMore] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleEditPost = () => {
    console.log(true);
    setIsEdit(true);
    // setMore(false);
  };

  const handleMoreOptions = () => {
    setMore(!more);
  };

  const closePotionOnmousedown = (e) => {
    if (moreRef.current && !moreRef.current.contains(e.target)) {
      setMore(false);
    } else {
      e.stopPropagation();
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
    isEdit,
    setIsEdit,
    handleEditPost,
    closePotionOnmousedown,
  };
};

export default useHandlePostOptions;
