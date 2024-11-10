import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "../API/axios";
import { useGlobalContext } from "../ContextApi/GlobalContext";

const useHandleComments = (comment, feeds) => {
  const { commentRef } = useGlobalContext();
  const { currentUser } = useSelector((state) => state.auth);

  const [isCommentOpen, setIsCommentOpen] = useState(false);

  //Open Comment section
  const commentHandle = () => {
    setIsCommentOpen(!isCommentOpen);
  };

  const closeCommentOnMousedown = (e) => {
   
    if (commentRef.current && !commentRef.current.contains(e.target)) {
      setIsCommentOpen(false);
    } else {
       e.stopPropagation();
    }
  };

   useEffect(() => {
     document.addEventListener("mousedown", closeCommentOnMousedown);
     return () => {
       document.removeEventListener("mousedown", closeCommentOnMousedown);
     };
   }, []);

  const commentLikes = comment?.Likes?.length || 0;
  const [likedComment, setLikedComment] = useState(commentLikes);

  const [isLikedComment, setIsLikedComment] = useState(false);

  useEffect(() => {
    if (comment?.Likes && currentUser?._id) {
      setIsLikedComment(comment.Likes.includes(currentUser._id));
    }
  }, [currentUser?._id, comment?.Likes]);

  const commentLikeHandler = async () => {
    console.log("Current User ID:", currentUser?._id); // Log current user
    try {
      console.log("Sending like request...");
      await axios.put(`/api/posts/${feeds?._id}/comments/${comment?._id}/like`, {
        userId: currentUser?._id,
      });
      console.log("Like request sent successfully.");
    } catch (err) {
      console.error("Error liking comment:", err);
    }

    setLikedComment(isLikedComment ? likedComment - 1 : likedComment + 1);
    setIsLikedComment(!isLikedComment);
  };

  return {
    isCommentOpen,
    commentHandle,
    closeCommentOnMousedown,
    commentLikeHandler,
    likedComment,
    isLikedComment,
  };
};
export default useHandleComments;
