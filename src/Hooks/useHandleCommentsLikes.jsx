import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "../API/axios";

const useHandleCommentsLikes = (comment, feeds) => {
  const { currentUser } = useSelector((state) => state.auth);

  const commentLikes = comment?.Likes?.length || 0;
  console.log("commentLikes", commentLikes);
  const [likedComment, setLikedComment] = useState(commentLikes);

  const [isLikedComment, setIsLikedComment] = useState(false);

  const yourlikes = comment;
  console.log("yourlikes", yourlikes);

  useEffect(() => {
    if (comment?.Likes && currentUser?._id) {
      setIsLikedComment(comment.Likes.includes(currentUser._id));
    }
  }, [currentUser?._id, comment?.Likes]);

  const commentLikeHandler = async () => {
    try {
      await axios.put(`/api/posts/${feeds._id}/comments/${comment._id}/like`, {
        userId: currentUser?._id,
      });
    } catch (err) {}
    setLikedComment(isLikedComment ? likedComment - 1 : likedComment + 1);
    setIsLikedComment(!isLikedComment);
    // dispatch(setLikes());
  };

  return {
    commentLikeHandler,
    likedComment,
    isLikedComment,
  };
};
export default useHandleCommentsLikes;
