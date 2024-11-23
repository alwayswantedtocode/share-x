import React, { useEffect } from "react";
import "./Options.scss";
import { useGlobalContext } from "../../ContextApi/GlobalContext";
import useReload from "../../Hooks/useReload";
import useHandleComments from "../../Hooks/useHandleCommentsLikes";
import useHandlePostOptions from "../../Hooks/useHandlePostOptions";
import { useSelector } from "react-redux";
import axios from "../../API/axios";
import useHandleDelete from "../../Hooks/useHandleDelete";

const OptionsAside = ({ userId, handleOpenDeletePost, handleEditPost }) => {
  const { moreRef } = useGlobalContext();
  const { currentUser } = useSelector((state) => state.auth);
  const { closePotionOnmousedown } = useHandlePostOptions()
 

  useEffect(() => {
    document.addEventListener("mousedown", closePotionOnmousedown);
    return () => {
      document.removeEventListener("mousedown", closePotionOnmousedown);
    };
  }, []);


  return (
    <div className="Post-Options" ref={moreRef}>
      <div className="options-container">
        {currentUser?._id === userId ? (
          <div className="options">
            <span onClick={handleEditPost}>Edit</span>
            <span onClick={handleOpenDeletePost}>Delete</span>
          </div>
        ) : (
          ""
        )}
        <div className="options">
          <span>Bookmark</span>
        </div>
      </div>
    </div>
  );
};

export default OptionsAside;
