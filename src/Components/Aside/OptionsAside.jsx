import React, { useEffect } from "react";
import "./Options.scss";
import { useGlobalContext } from "../../ContextApi/GlobalContext";
import useHandleComments from "../../Hooks/useHandleComments";
import useHandlePostOptions from "../../Hooks/useHandlePostOptions";
import { useSelector } from "react-redux";

const OptionsAside = ({ userId, handleEditPost }) => {
  const { moreRef } = useGlobalContext();
  const {} = useHandleComments();
  const { closePotionOnmousedown } = useHandlePostOptions();
  const { currentUser } = useSelector((state) => state.auth);

  // const closePotionOnmousedown = (e) => {
  //   e.stopPropagation();
  //   if (!moreRef.current.contains(e.target)) {
  //     isMore(false);
  //   }
  // };
  useEffect(() => {
    document.addEventListener("mousedown", closePotionOnmousedown);
    return () => {
      document.removeEventListener("mousedown", closePotionOnmousedown);
    };
  }, []);

  return (
    <div className="Post-Options" ref={moreRef}>
      {currentUser?._id === userId ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span onClick={handleEditPost}>Edit</span>
          <span>Delete</span>
        </div>
      ) : (
        ""
      )}
      <div>
        <span>Bookmark</span>
      </div>
    </div>
  );
};

export default OptionsAside;
