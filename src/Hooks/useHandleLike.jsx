import axios from "../API/axios"
import { useEffect, useState } from "react";
import { useAuthenticationContext } from "../ContextApi/AuthenticationContext";

const useHandleLike = (Likes,feeds ) => {
  const [like, setLike] = useState(Likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const { AuthUser } = useAuthenticationContext()
  
    useEffect(() => {
      setIsLiked(Likes.includes(AuthUser._id));
    }, [AuthUser._id, Likes]);

  const likeHandler = () => {
     try {
       axios.put("/posts/" + feeds._id + "/like", { userId: AuthUser._id });
     } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return { like, isLiked, likeHandler };
};

export default useHandleLike;
