import { useDispatch, useSelector } from "react-redux";
import { setLoading, setPostcomments } from "../Reduxtoolkit/postSlice";
import axios from "../API/axios";

const useHandleAddComment = (Comment, postId, comments) => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  //   console.log("comments in use add comment", comments);
  //   console.log("postId in ue handle add comment:", postId);
  //   console.log("length of comment:", comments.length);

  const handleComment = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    if (Comment.current.value !== "") {
      try {
        const form = {
          userId: currentUser?._id,
          username: currentUser?.username,
          profilePicture: currentUser?.profilePicture,
          comments: Comment.current.value,
        };
        const response = await axios.post(
          `/api/posts/${postId}/comments`,
          form
        );

        const newComment = response.data;
        const updatedComments = [newComment, ...comments];

        dispatch(
          setPostcomments({ post_id: postId, comments: updatedComments })
        );
        Comment.current.value = "";
      } catch (error) {
        alert("Failed to add comment: " + error.message);
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  return { handleComment };
};

export default useHandleAddComment;
