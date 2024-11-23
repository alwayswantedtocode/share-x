import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../API/axios";
import { useGlobalContext } from "../ContextApi/GlobalContext";
import {
  setCommentLikes,
  setError,
  setLoading,
} from "../Reduxtoolkit/postSlice";

const useHandleCommentsLikes = (comment, feeds) => {
  const { commentRef } = useGlobalContext();
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log("comments in use handle comment:", comment);
  console.log("commentId in use handle comment:", comment?._id);
  console.log("postId in use handle comments: ", feeds?._id);
  console.log(
    "coments like in use handle comments: ",
    comment?.Likes, + comment?.Likes?.length
  );

  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [commentLikesCount, setCommentLikesCount] = useState(
    comment?.Likes?.length || 0
  );
  const [isCommentLiked, setIsCommentLiked] = useState(false);

  //Toggle Comments section
  const commentHandle = () => {
    setIsCommentOpen(!isCommentOpen);
  };
  const toggleComments = () => {
    setIsCommentOpen((prev) => !prev);
  };

  // close comments on mousedown
  const closeCommentOnMousedown = (e) => {
    if (commentRef.current && !commentRef.current.contains(e.target)) {
      setIsCommentOpen(false);
    } else {
      e.stopPropagation();
    }
  };
  // close comments on mousedown
  useEffect(() => {
    document.addEventListener("mousedown", closeCommentOnMousedown);
    return () => {
      document.removeEventListener("mousedown", closeCommentOnMousedown);
    };
  }, []);

  // Check if the current user has already liked the comment
  useEffect(() => {
    if (Array.isArray(comment?.Likes) && currentUser?._id) {
      setIsCommentLiked(comment?.Likes.includes(currentUser?._id));
    }
  }, [currentUser?._id, comment?.Likes]);

  const commentLikeHandler = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axios.put(
        `/api/posts/${feeds?._id}/comments/${comment?._id}/like`,
        { userId: currentUser?._id }
      );

      const updatedLikesCount = response.data.likes;

      setIsCommentLiked((prev) => !prev);
      setCommentLikesCount(updatedLikesCount);

      dispatch(
        setCommentLikes({
          post_id: feeds?._id,
          comment_id: comment?._id,
          commentlikes: updatedLikesCount,
        })
      );
    } catch (error) {
      dispatch(setError(error.message));
      console.error("Error liking comment:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    isCommentOpen,
    commentHandle,
    closeCommentOnMousedown,
    commentLikesCount,
    isCommentLiked,
    toggleComments,
    commentLikeHandler,
  };
};
export default useHandleCommentsLikes;
