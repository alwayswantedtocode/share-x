import axios from "../API/axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setPostLikes,
  setLoading,
  setError,
  setPosts,
} from "../Reduxtoolkit/postSlice";
import { setUsersPost } from "../Reduxtoolkit/appUsersSlice";
import { useParams } from "react-router-dom";

const useHandPostleLike = (Likes, feeds) => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { username } = useParams();
  // console.log("likes in use post likes:", Likes);

  const [likeCount, setLikeCount] = useState(Likes?.length || 0);
  const [isLiked, setIsLiked] = useState(false);

  // Check if the current user has already liked the post
  useEffect(() => {
    if (feeds && Array.isArray(feeds.Likes) && currentUser?._id) {
      setIsLiked(feeds.Likes.includes(currentUser?._id));
    }
  }, [currentUser?._id, feeds?.Likes]);

  const likeHandler = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axios.put(`/api/posts/${feeds._id}/like`, {
        userId: currentUser?._id,
      });

      const updatedLikesCount = response.data.likes;

      setIsLiked(!isLiked);
      setLikeCount(updatedLikesCount);

      dispatch(setPostLikes({ post_id: feeds._id, likes: updatedLikesCount }));

      // a fix recieve the length of likes in realtime
      if (!username) {
        const response = await axios.get(
          `/api/posts/timeline/${currentUser._id}`
        );
        dispatch(
          setPosts(
            response.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          )
        );
      } else {
        const postsResponse = await axios.get(`/api/posts/profile/${username}`);
        dispatch(
          setUsersPost(
            postsResponse.data.sort(
              (p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)
            )
          )
        );
      }
    } catch (error) {
      dispatch(setError(error.message));
      console.error("Error liking post:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    likeCount,
    isLiked,
    likeHandler,
  };
};

export default useHandPostleLike;
