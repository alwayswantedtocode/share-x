import "../../Pages/Profile Page/profile.scss";
import "../HomePage Components/home.scss"
import Reply from "../HomePage Components/Reply";
import { useState } from "react";
import Profileimage from "../../Assets/profile-gender-neutral.jpg";
import { Link } from "react-router-dom";
import { MdOutlineMoreHoriz, MdOutlineIosShare } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiMessageAlt } from "react-icons/bi";
import { useAuthenticationContext } from "../../ContextApi/AuthenticationContext";
import useHandleLike from "../../Hooks/useHandleLike";
import { useSelector } from "react-redux";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";


// TimeAgo.addDefaultLocale(en);

const UserPosts = ({
  postId,
  Image,
  Likes,
  Username,
  feeds,
  Description,
  Timestamp,
  Comments,
  replyLikes,
}) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const { user } = useAuthenticationContext();
  const { like, isLiked, likeHandler, isLikedComment, likedComment, commentLikeHandler } = useHandleLike(
    Likes,
    feeds,
    replyLikes
  );
  const { currentUser } = useSelector((state) => state.auth);
  const UserId = user?.uid;

  TimeAgo.addLocale(en);

  const date = new Date(Timestamp);

  // Create a TimeAgo instance
  const timeAgo = new TimeAgo("en-US");

  // Format the date using TimeAgo
  const formattedDate = timeAgo.format(date);

  const commentHandle = () => {
    setIsCommentOpen(!isCommentOpen);
  };

  return (
    <div className="post">
      <div className="container">
        {/* poster author and time */}
        <div className="user">
          <div className="userInfo">
            <img
              src={currentUser?.profilePicture || Profileimage}
              alt="Profileimage"
            />
            <div className="details">
              <span className="name">{Username}</span>
              <span className="date">{formattedDate}</span>
            </div>
          </div>

          <MdOutlineMoreHoriz />
        </div>
        {/* Post content text and picture or video */}
        <div className="content">
          <p>{Description}</p>

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
            {Comments?.length}
          </div>
          <div className="item">
            <MdOutlineIosShare />
            share
          </div>
        </div>
        {isCommentOpen && (
          <Reply postId={postId} Comments={Comments} replyLikes={replyLikes} />
        )}
      </div>
    </div>
  );
};

export default UserPosts;
