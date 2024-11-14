// import "./home.scss";
import Replies from "./Replies";
import Profileimage from "../../Assets/profile-gender-neutral.jpg";
import { useRef, useState, useLayoutEffect, useEffect } from "react";
import { useAuthenticationContext } from "../../ContextApi/AuthenticationContext";
import { useSelector, useDispatch } from "react-redux";
import { setComments } from "../../Reduxtoolkit/postSlice";
import axios from "../../API/axios";
import { useGlobalContext } from "../../ContextApi/GlobalContext";
import useHandleComments from "../../Hooks/useHandleComments";

//TEXT AREA HEIGHT
const MIN_TEXTAREA_HEIGHT = 15;

const Reply = ({ postId, feeds, Comments, iscommentopen }) => {
  const textareaRef = useRef(null);
  const Comment = useRef("");

  const setRefs = (element) => {
    Comment.current = element;
    textareaRef.current = element;
  };

  //textarea auto adjust
  const [value, setValue] = useState("");

  useLayoutEffect(() => {
    // Reset height - important to shrink on delete
    textareaRef.current.style.height = "inherit";
    // Set height
    textareaRef.current.style.height = `${Math.max(
      textareaRef.current.scrollHeight,
      MIN_TEXTAREA_HEIGHT
    )}px`;
  }, [value]);

  const { user } = useAuthenticationContext();
  const { commentRef } = useGlobalContext();
  const { isCommentOpen, commentHandle, closeCommentOnMousedown } =
    useHandleComments();
  const { currentUser } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const handleComment = async (e) => {
    e.preventDefault();
    if (Comment.current.value !== "") {
      try {
        console.log("hello");
        // Use Axios to send post data to your backend route
        const form = {
          userId: currentUser?._id,
          username: currentUser?.username,
          profilePicture: currentUser?.profilePicture,
          comments: Comment.current.value,
        };
        console.log("form:", form);
        const response = await axios.post(
          `/api/posts/${postId}/comments`,
          form
        );
        dispatch(setComments(response.data, ...Comments));
        Comment.current.value = "";
      } catch (error) {
        alert(error.message);
      }
    } else {
    }
  };



  return (
    <div className="comments" ref={commentRef}>
      <div className="write">
        <img src={user?.photoURL || Profileimage} alt="userIcon" />
        <form onSubmit={handleComment} className="form">
          <textarea
            type="text"
            placeholder={`add a comment ${
              currentUser?.username?.trim() ||
              currentUser?.username?.charAt(0).toLowerCase() ||
              "User"
            }`}
            name="textarea"
            style={{
              minHeight: MIN_TEXTAREA_HEIGHT,
              resize: "none",
            }}
            ref={setRefs}
          />
          <button type="submit">Reply</button>
        </form>
      </div>

      {Comments?.length > 0 && (
        <div>
          {Comments?.map((comment) => {
            return (
              <Replies
                key={comment._id}
                username={comment?.username}
                profilePicture={comment?.profilePicture}
                reply={comment?.comments}
                Timestamp={comment?.createdAt}
                postId={postId}
                feeds={feeds}
                comment={comment}
                Likes={comment.Likes}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Reply;
