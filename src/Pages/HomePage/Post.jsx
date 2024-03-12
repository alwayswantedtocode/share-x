import "./home.scss";
import { Link, useParams } from "react-router-dom";
import { MdOutlineMoreHoriz, MdOutlineIosShare } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiMessageAlt } from "react-icons/bi";
import { useEffect, useState, useReducer } from "react";
import Replies from "./Replies";
import { useAuthenticationContext } from "../../ContextApi/AuthenticationContext";
import Profileimage from "../../Assets/profile-gender-neutral.jpg";
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
import axios from "axios";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";
import useHandleLike from "../../Hooks/useHandleLike";

TimeAgo.addDefaultLocale(en);
const Post = ({
  uid,
  id,
  logo,
  email,
  feeds,
  description,
  Likes,
  Image,
  Timestamp,
}) => {


  const { user, userData, userId } = useAuthenticationContext();
  const { like, isLiked, likeHandler } = useHandleLike(Likes, feeds);

  // TimeAgo.addDefaultLocale(en);
  const date = new Date(Timestamp);
  // Create a TimeAgo instance
  const timeAgo = new TimeAgo("en-US");
  // Format the date using TimeAgo
  const formattedDate = timeAgo.format(date);

  // likes const
  // const [state, dispatch] = useReducer(postReducer, initialPostState);
  // const { ADD_LIKES, ADD_COMMENTS, HANDLE_ERROR } = postActions;

  // const singlePostDocument = doc(db, "posts", id);
  // const [clickLike, setClickLike] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const username = useParams().username;

  const [shareXUser, setShareXUser] = useState({});

  useEffect(() => {
    const fetchPostsUser = async () => {
      const response = await axios.get(`/users?userId=${feeds.userId}`);
      setShareXUser(response.data);
    };
    fetchPostsUser();
  }, [feeds.userId]);

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
              to={`/profilepage/${shareXUser.username}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img
                src={shareXUser.profilePicture || Profileimage}
                alt="Profile"
              />
            </Link>

            <div className="details">
              <Link
                // to={`/profile/${feed.userId}`}
                to={`/profilepage/${shareXUser.username}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{shareXUser.username}</span>
              </Link>
              <span className="date">{formattedDate}</span>
            </div>
          </div>
          <MdOutlineMoreHoriz style={{ cursor: "pointer" }} />
        </div>
        {/* Post content text and picture or video */}
        <div className="content">
          <p>{description}</p>
          {Image && <img src={Image} alt="" />}
        </div>
        {/* Interact with post */}
        <div className="info">
          <div className="item" onClick={likeHandler}>
            {isLiked ? (
              <AiFillHeart style={{ color: "rgb(165, 43, 43)" }} />
            ) : (
              <AiOutlineHeart />
            )}
            {like}
          </div>
          {/* <div className="item" onClick={commentHandle}>
            <BiMessageAlt />
            {commentsCount > 0 && commentsCount}
          </div>*/}
          <div className="item">
            <MdOutlineIosShare />
            share
          </div> 
        </div>
        {/* {isCommentOpen && (
          <Replies postId={id} updateCommentsCount={updateCommentsCount} />
        )} */}
      </div>
    </div>
  );
};

export default Post;
