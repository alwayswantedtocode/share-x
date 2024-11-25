import React from "react";
import useReload from "./useReload";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../Reduxtoolkit/postSlice";
import axios from "../API/axios";

const useHandleEdit = (editPost, setIsEdit, feeds) => {
  const { handleReload } = useReload();
  const { currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  //   console.log("postId in use edit:", feeds?._id);

  const onSubmitEditPost = async (e) => {
    e.preventDefault();
    dispatch(setLoading());
    const form = {
      userId: currentUser?._id,
      profilePicture: currentUser?.profilePicture,
      username: currentUser?.username,
      Fullname: currentUser?.Fullname,
      Description: editPost,
      Image: Image,
    };
    try {
      await axios.put(`/api/posts/${feeds?._id}`, form, {
        params: { userId: currentUser._id },
      });
      setIsEdit(false);
      handleReload();
    } catch (error) {
      alert(error.message);
    }
  };
  return { onSubmitEditPost };
};

export default useHandleEdit;
