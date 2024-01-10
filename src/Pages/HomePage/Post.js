import "./home.scss";
import { Link } from "react-router-dom";
import { MdOutlineMoreHoriz, MdOutlineIosShare } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiMessageAlt } from "react-icons/bi";
import { useEffect, useState, useReducer } from "react";
import Replies from "./Replies";
import { useAuthenticationContext } from "../../ContextApi/AuthenticationContext";
import UserIcon from "../../Assets/user-circle-svgrepo-com.svg";
import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  QuerySnapshot,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../Authentication/Firebase";
import {
  postReducer,
  postActions,
  initialPostState,
} from "../../ContextApi/PostReducer";

const Post = ({ uid, id, logo, name, email, text, image, timestamp }) => {
  const {user, userData, userId } = useAuthenticationContext();

  console.log("items", logo, name, image, text, timestamp);

  // likes const
  const [state, dispatch] = useReducer(postReducer, initialPostState);
  const { ADD_LIKES, ADD_COMMENTS, HANDLE_ERROR } = postActions;

  const singlePostDocument = doc(db, "posts", id);
  const [clickLike, setClickLike] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  //Add friends
  const addUser = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].ref;
      await updateDoc(data, {
        friends: arrayUnion({
          id: uid,
          logo: logo,
          name: name,
        }),
      });
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  //LIKES
  const likesRef = doc(collection(db, "posts", id, "likes"));
  const likesCollection = collection(db, "posts", id, "likes");

  const handleLike = async (e) => {
    e.preventDefault();
    setClickLike(!clickLike);
    const q = query(likesCollection, where("id", "==", user?.uid));
    const querySnapshot = await getDocs(q);
    const likeDocId = await querySnapshot?.docs[0]?.id;
    try {
      if (likeDocId !== undefined) {
        const deleteId = doc(db, "posts", id, "likes", likeDocId);
        await deleteDoc(deleteId);
      } else {
        await setDoc(likesRef, { id: user?.uid });
      }
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getLikes = async () => {
      try {
        const q = collection(db, "posts", id, "likes");
        await onSnapshot(q, (doc) => {
          dispatch({
            type: ADD_LIKES,
            likes: doc.docs.map((item) => item.data()),
          });
        });
      } catch (error) {
        dispatch({ type: HANDLE_ERROR });
        alert(error.message);
        console.log(error.message);
      }
    };
    return () => getLikes();
  }, [id, ADD_LIKES, HANDLE_ERROR]);

  // COMMENTS

    const [commentsCount, setCommentsCount] = useState(0);

    // Function to update comments count
    const updateCommentsCount = (count) => {
      setCommentsCount(count);
    };

  const commentHandle = () => {
    setIsCommentOpen(!isCommentOpen);
  };

  return (
    <div className="post">
      <div className="container">
        {/* poster author and time */}
        <div className="user">
          <div className="userInfo">
            <Link
              // to={`/profile/${feed.userId}`}
              to={`/profile/${userId}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img src={logo || UserIcon} alt="userIcon" />
            </Link>

            <div className="details">
              <Link
                // to={`/profile/${feed.userId}`}
                to={`/profile/${userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{name}</span>
              </Link>
              <span className="date">{timestamp}</span>
            </div>
          </div>
          <MdOutlineMoreHoriz style={{ cursor: "pointer" }} />
        </div>
        {/* Post content text and picture or video */}
        <div className="content">
          <p>{text}</p>
          {image && <img src={image} alt="" />}
        </div>
        {/* Interact with post */}
        <div className="info">
          <div className="item" onClick={handleLike}>
            {clickLike ? (
              <AiFillHeart style={{ color: "rgb(165, 43, 43)" }} />
            ) : (
              <AiOutlineHeart />
            )}
            {state.likes?.length > 0 && state?.likes?.length}
          </div>
          <div className="item" onClick={commentHandle}>
            <BiMessageAlt />
            {commentsCount > 0 && commentsCount}
          </div>
          <div className="item">
            <MdOutlineIosShare />
            share
          </div>
        </div>
        {isCommentOpen && (
          <Replies postId={id} updateCommentsCount={updateCommentsCount} />
        )}
      </div>
    </div>
  );
};

export default Post;
