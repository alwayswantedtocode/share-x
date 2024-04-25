import axios from "../API/axios";
import { useEffect, useState } from "react";
import { useAuthenticationContext } from "../ContextApi/AuthenticationContext";
import { useDispatch, useSelector } from "react-redux";
import { setLikes } from "../Reduxtoolkit/postSlice";

const useHandleLike = (Likes, feeds) => {
  const [like, setLike] = useState(Likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const { AuthUser } = useAuthenticationContext();
  const { likes } = useSelector((state) => state.post);
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLiked(feeds.Likes.includes(currentUser?._id));
  }, [currentUser?._id, feeds.Likes]);

  const likeHandler = async() => {
    try {
     await axios.put("/api/posts/" + feeds._id + "/like", { userId: currentUser?._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
    // dispatch(setLikes());
  };
  return { like, likes, isLiked, likeHandler };
};

export default useHandleLike;
