

// import axios from "../API/axios";
// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { setLikes, setLoading, setError } from "../Reduxtoolkit/postSlice";

// const useHandleLike = (Likes, feeds) => {
//   const { currentUser } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   const [likeCount, setLikeCount] = useState(Likes?.length || 0);
//   const [isLiked, setIsLiked] = useState(false);

//   useEffect(() => {
//     // Check if the current user has already liked the post
//     if (feeds && Array.isArray(feeds.Likes) && currentUser?._id) {
//       setIsLiked(feeds.Likes.includes(currentUser?._id));
//     }
//   }, [currentUser?._id, feeds?.Likes]);

//   const likeHandler = async () => {
//     try {
//       dispatch(setLoading());

//       // Send like/unlike request to the server
//       const response = await axios.put(`/api/posts/${feeds._id}/like`, {
//         userId: currentUser?._id,
//       });

//       // Extract updated likes count from the response
//       const updatedLikesCount = response.data.likes;

//       // Update local state
//       setIsLiked(!isLiked);
//       setLikeCount(updatedLikesCount);

//       // Update Redux store with the updated likes
//       dispatch(setLikes({ post_id: feeds._id, likes: updatedLikesCount }));
//     } catch (error) {
//       dispatch(setError(error.message));
//       console.error("Error liking post:", error);
//     }
//   };

//   return {
//     likeCount,
//     isLiked,
//     likeHandler,
//   };
// };

// export default useHandleLike;


import axios from "../API/axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPostLikes, setLoading, setError } from "../Reduxtoolkit/postSlice";

const useHandPostleLike = (Likes, feeds) => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
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
