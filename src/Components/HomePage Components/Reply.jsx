import "./home.scss";
import {
  useRef,
  useState,
  useLayoutEffect,
  useReducer,
  useEffect,
} from "react";
import { useAuthenticationContext } from "../../ContextApi/AuthenticationContext";
import { FiSend } from "react-icons/fi";
import { db } from "../../Authentication/Firebase";

import UserIcon from "../../Assets/user-circle-svgrepo-com.svg";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../API/axios";
import { setComments } from "../../Reduxtoolkit/postSlice";

//TEXT AREA HEIGHT
const MIN_TEXTAREA_HEIGHT = 15;

const Reply = ({ postId }) => {
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

  const { user, userData } = useAuthenticationContext();
  const { currentUser } = useSelector((state) => state.auth);
  const { posts, comments } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  //   const newCommentsCount =
  //     state.comments?.length > 0 && state.comments?.length;
  //   updateCommentsCount(newCommentsCount);
  // };

  const handleComment = async (e) => {
    e.preventDefault();
    if (Comment.current.value !== "") {
      try {
        console.log("hello");
        // Use Axios to send post data to your backend route
        const response = await axios.post(`/api/comments/${postId}/comment`, {
          userId: currentUser?.userId,
          postId,
          username: currentUser?.username,
          profilePicture: currentUser?.profilePicture,
          comments: Comment.current.value,
        });
        console.log(response.data);
        Comment.current.value = "";
        dispatch(setComments(response.data));
      } catch (error) {
        alert(error.message);
      }
    } else {
      // ${postId}
    }
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={user?.photoURL || UserIcon} alt="userIcon" />
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
      {/* {comments.map((reply) => {
        return (
        <
          <div className="comment" key={reply?._id}>
            <img src={reply?.profilePicture|| UserIcon} alt="" />
            <div className="info">
              <span className="name">{reply?.username}</span>
              <div className="text">
                <p>{reply?.comments}</p>
              </div>
              <div className="impressions">
                <p>Like</p>
                <p>Reply</p>
              </div>
            </div>
            <span className="time">
              {new Date(reply?.timestamp?.toDate())?.toUTCString()}
            </span>
          </div>
        );
      })} */}
    </div>
  );
};

export default Reply;
