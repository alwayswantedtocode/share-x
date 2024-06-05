import React, { useEffect } from "react";
import "./Options.scss";
import { useGlobalContext } from "../../ContextApi/GlobalContext";
import useReload from "../../Hooks/useReload";
import useHandleComments from "../../Hooks/useHandleComments";
import useHandlePostOptions from "../../Hooks/useHandlePostOptions";
import { useSelector } from "react-redux";
import axios from "../../API/axios";

const OptionsAside = ({ userId, postId, handleEditPost }) => {
  const { moreRef } = useGlobalContext();
  const { currentUser } = useSelector((state) => state.auth);
  const { handleReload } = useReload();
  const {} = useHandleComments();
  const { closePotionOnmousedown } = useHandlePostOptions();

  // const handleEditPost = () => {
  //   console.log(true);
  //   setIsEdit(true);
  //   setMore(false);
  // };

  // const closePotionOnmousedown = (e) => {
  //   e.stopPropagation();
  //   if (!moreRef.current.contains(e.target)) {
  //     isMore(false);
  //   }
  // };
  // useEffect(() => {
  //   document.addEventListener("mousedown", closePotionOnmousedown);
  //   return () => {
  //     document.removeEventListener("mousedown", closePotionOnmousedown);
  //   };
  // }, []);

  // Delete Post

  const handleDeletePost = async () => {
    try {
      await axios.delete(`/api/posts/${postId}`, {
        params: { userId: currentUser._id },
      });
      handleReload();
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    }
  };

  return (
    <div className="Post-Options" ref={moreRef}>
      {currentUser?._id === userId ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span onClick={handleEditPost}>Edit</span>
          <span onClick={handleDeletePost}>Delete</span>
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
