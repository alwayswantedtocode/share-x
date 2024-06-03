import axios from "../API/axios";
import { useEffect, useState } from "react";
import { useAuthenticationContext } from "../ContextApi/AuthenticationContext";
import { useDispatch, useSelector } from "react-redux";


const useHandleLike = (Likes, feeds) => {
  const { AuthUser } = useAuthenticationContext();
  const { likes, posts } = useSelector((state) => state.post);
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [like, setLike] = useState(Likes.length);
  const [isLiked, setIsLiked] = useState(false);
  
  useEffect(() => {
    setIsLiked(feeds.Likes.includes(currentUser?._id));
  }, [currentUser?._id, feeds?.Likes]);

  const likeHandler = async () => {
    try {
      await axios.put("/api/posts/" + feeds._id + "/like", {
        userId: currentUser?._id,
      });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

 
  return {
    like,
    likes,
    isLiked,
    likeHandler,
    
  };
};

export default useHandleLike;
