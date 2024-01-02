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
import { db } from "../Authentication/Firebase";
import UserIcon from "../../Assets/user-circle-svgrepo-com.svg";
import {
  postReducer,
  postActions,
  initialPostState,
} from "../../ContextApi/PostReducer";
import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

//TEXT AREA HEIGHT
const MIN_TEXTAREA_HEIGHT = 15;

const Replies = ({ postId, updateCommentsCount }) => {
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
  const [state, dispatch] = useReducer(postReducer, initialPostState);
  const { ADD_COMMENTS, HANDLE_ERROR } = postActions;
  const commentRef = doc(collection(db, "posts", postId, "comments"));

  const handleComment = async (e) => {
    e.preventDefault();
    if (Comment.current.value !== "") {
      try {
        await setDoc(commentRef, {
          id: commentRef.id,
          comment: Comment.current.value,
          image: user?.photoURL,
          name:
            userData?.name?.charAt(0)?.toUpperCase() +
              userData?.name?.slice(1) || user?.displayName?.split(" ")[0],
          timestamp: serverTimestamp(),
        });
        Comment.current.value = "";
      } catch (error) {
        dispatch({ type: HANDLE_ERROR });
        alert(error.message);
        console.log(error.message);
      }
    }
    const newCommentsCount =
      state.comments?.length > 0 && state.comments?.length;
    updateCommentsCount(newCommentsCount); 
    
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const collectionOfComments = collection(db, `posts/${postId}/comments`);
        const q = query(collectionOfComments, orderBy("timestamp", "desc"));
        await onSnapshot(q, (doc) => {
          dispatch({
            type: ADD_COMMENTS,
            comments: doc.docs?.map((item) => item.data()),
          });
        });
      } catch (error) {
        dispatch({ type: HANDLE_ERROR });
        alert(error.message);
        console.log(error.message);
      }
    };
    return () => getComments();
  }, [postId, ADD_COMMENTS, HANDLE_ERROR]);

  return (
    <div className="comments">
      <div className="write">
        <img src={user?.photoURL || UserIcon} alt="userIcon" />

        <textarea
          type="text"
          placeholder="write a comment"
          name="textarea"
          style={{
            minHeight: MIN_TEXTAREA_HEIGHT,
            resize: "none",
          }}
          ref={setRefs}
        />
        <button onClick={handleComment}>Reply</button>
      </div>
      {state?.comments?.map((reply, index) => {
        return (
          <div className="comment" key={index}>
            <img src={reply?.image || UserIcon} alt="" />
            <div className="info">
              <span className="name">{reply?.name}</span>
              <div className="text">
                <p>{reply?.comment}</p>
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
      })}
    </div>
  );
};

export default Replies;
