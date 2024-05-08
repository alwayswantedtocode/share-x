import "./home.scss";
import { Link } from "react-router-dom";
import { MdOutlineMoreHoriz, MdOutlineIosShare } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiMessageAlt } from "react-icons/bi";
import { useState } from "react";
import Reply from "./Reply";
import Profileimage from "../../Assets/profile-gender-neutral.jpg";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import useHandleLike from "../../Hooks/useHandleLike";
import { useSelector } from "react-redux";

TimeAgo.addDefaultLocale(en);
const Post = ({
  feeds,
  postId,
  Username,
  description,
  Likes,
  Image,
  Timestamp,
}) => {
  const { like, isLiked, likeHandler } = useHandleLike(Likes, feeds);
  const { currentUser } = useSelector((state) => state.auth);
  const {comments}=useSelector((state)=>state.post)

  // TimeAgo.addDefaultLocale(en);
  const date = new Date(Timestamp);
  // Create a TimeAgo instance
  const timeAgo = new TimeAgo("en-US");
  // Format the date using TimeAgo
  const formattedDate = timeAgo.format(date);

  const [isCommentOpen, setIsCommentOpen] = useState(false);

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
              to={`/profilepage/${Username}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img
                src={currentUser?.profilePicture || Profileimage}
                alt="Profile"
              />
            </Link>

            <div className="details">
              <Link
                // to={`/profile/${feed.userId}`}
                to={`/profilepage/${Username}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{Username}</span>
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
          <div className="item" onClick={commentHandle}>
            <BiMessageAlt />
            {comments?.length}
          </div>
          <div className="item">
            <MdOutlineIosShare />
            share
          </div>
        </div>
        {isCommentOpen && <Reply postId={postId} />}
      </div>
    </div>
  );
};

export default Post;
