import React from "react";
import useHandlePostOptions from "./useHandlePostOptions";
import useReload from "./useReload";
import axios from "../API/axios";
import { useSelector } from "react-redux";

const useHandleDelete = (postId) => {
  const { currentUser } = useSelector((state) => state.auth);
  const { setMore } = useHandlePostOptions();
  const { handleReload } = useReload();
//   console.log("postId in use delete:", postId);

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
  return { handleDeletePost };
};

export default useHandleDelete;
