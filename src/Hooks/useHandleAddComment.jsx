import { useDispatch, useSelector } from "react-redux";
import { setPostcomments } from "../Reduxtoolkit/postSlice";
import axios from "../API/axios";
import { useSocketContext } from "../ContextApi/SocketContext";
import { useCallback, useEffect } from "react";

const useHandleAddComment = (Comment, postId, comments, setIsLoading) => {
  const { currentUser } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const { socket, listenToEvent, stopListeningToEvent, initialized } =
    useSocketContext();

  console.log("comments in use add comment", comments);
  // Handle adding a comment
  const handleComment = async (e) => {
    e.preventDefault();

    if (Comment.current.value.trim() !== "") {
      setIsLoading(true);

      try {
        // Form data for the new comment
        const form = {
          userId: currentUser?._id,
          username: currentUser?.username,
          // profilePicture: currentUser?.profilePicture,
          comments: Comment.current.value.trim(),
        };
        const response = await axios.post(
          `/api/posts/${postId}/comments`,
          form
        );
        const newComment = response.data;
        dispatch(
          setPostcomments({
            post_id: postId,
            comments: [newComment, ...comments],
          })
        );
        // Emit the new comment via Socket.IO
        if (initialized && postId) {
          socket.emit("commentOnPost", postId, newComment);
        }
        //  if (initialized && postId) {
        //    socket.emit("joinPost", postId);
        //  }
        Comment.current.value = "";
      } catch (error) {
        alert("Failed to add comment: " + error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  //  useEffect(() => {
  //    if (!initialized || !postId) return;

  //    // Handle new comments received via socket
  //    const handleNewComment = ({ postId: receivedPostId, comment }) => {
  //      if (receivedPostId === postId) {
  //        const updatedComments = [comment, ...comments];
  //        dispatch(
  //          setPostcomments({
  //            post_id: postId,
  //            comments: updatedComments,
  //          })
  //        );
  //      }
  //    };

  //    // Listen to the "newComment" event
  //    listenToEvent("newComment", handleNewComment);

  //    // Clean up listener when the component unmounts or dependencies change
  //    return () => {
  //      stopListeningToEvent("newComment", handleNewComment);
  //    };
  //  }, [
  //    initialized,
  //    postId,
  //    comments,
  //    listenToEvent,
  //    stopListeningToEvent,
  //    dispatch,
  //  ]);

  // Real-time updates for comments
  const handleIncomingComment = useCallback(
    ({ postId: incomingPostId, commentData }) => {
      if (incomingPostId === postId) {
        const updatedComments = [commentData, ...comments];
        dispatch(
          setPostcomments({ post_id: postId, comments: updatedComments })
        );
      }
    },
    [comments, dispatch, postId]
  );

  useEffect(() => {
    if (!socket || !initialized) return;

    listenToEvent(`newComment-${postId}`, handleIncomingComment);

    return () => {
      stopListeningToEvent(`newComment-${postId}`, handleIncomingComment);
    };
  }, [
    socket,
    initialized,
    handleIncomingComment,
    listenToEvent,
    stopListeningToEvent,
    postId,
  ]);

  return { handleComment };
};

export default useHandleAddComment;
