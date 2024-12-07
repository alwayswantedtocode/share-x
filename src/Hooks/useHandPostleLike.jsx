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
import { useSocketContext } from "../ContextApi/SocketContext";

const useHandPostleLike = (Likes, feeds) => {
  const { currentUser } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const { username } = useParams();
  const { socket, initialized, listenToEvent, stopListeningToEvent } =
    useSocketContext();
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
console.log("data:",response.data)
      const updatedLikesCount = response.data.likes;
      const updateLikes = response.data.List

      setIsLiked(!isLiked);
      setLikeCount(updatedLikesCount);

      dispatch(setPostLikes({ post_id: feeds._id, likes: updateLikes }));
      if (initialized) {
        // Emit the like event
        socket.emit("likePost", feeds._id, updateLikes);
      }
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

  useEffect(() => {
    if (!initialized || !feeds?._id) return;

    const handleNewLike = ({ userId, action }) => {
      const postLikes = posts
        .filter((post) => post._id === feeds._id)
        .map((post) => post.Likes || [])
        .flat();

      if (action === "liked" && !postLikes.includes(userId)) {
        // Add like
        const updatedLikes = [...postLikes, userId];
        dispatch(setPostLikes({ post_id: feeds._id, likes: updatedLikes })); // Sync Redux
      } else if (action === "disliked" && postLikes.includes(userId)) {
        // Remove like
        const updatedLikes = postLikes.filter((id) => id !== userId);
        dispatch(setPostLikes({ post_id: feeds._id, likes: updatedLikes })); // Sync Redux
      }
    };

    listenToEvent(`newLike-${feeds._id}`, handleNewLike);

    return () => {
      stopListeningToEvent(`newLike-${feeds._id}`, handleNewLike);
    };
  }, [
    feeds,
    posts,
    initialized,
    listenToEvent,
    stopListeningToEvent,
    dispatch,
  ]);



  return {
    likeCount,
    isLiked,
    likeHandler,
  };
};

export default useHandPostleLike;
