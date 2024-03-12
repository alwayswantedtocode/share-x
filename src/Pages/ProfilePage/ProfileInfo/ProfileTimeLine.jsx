import "../profile.scss";
import { Link } from "react-router-dom";
import { MdOutlineMoreHoriz, MdOutlineIosShare } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiMessageAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import Replies from "../../HomePage/Replies";
import { useAuthenticationContext } from "../../../ContextApi/AuthenticationContext";
import Profileimage from "../../../Assets/profile-gender-neutral.jpg";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";
import useHandleLike from "../../../Hooks/useHandleLike";

TimeAgo.addDefaultLocale(en);

const ProfileTimeLine = ({
  image,
  Likes,
  shareXUsers,
  feeds,
  Description,
  Timestamp,
}) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const { user } = useAuthenticationContext();
  const { like, isLiked, likeHandler } = useHandleLike(Likes, feeds);
  const UserId = user?.uid;

  // TimeAgo.addDefaultLocale(en);

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
            <Link
              // to={`/profile/${myPost.UserId}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img
                src={shareXUsers.profilePicture || Profileimage}
                alt="Profileimage"
              />
            </Link>

            <div className="details">
              <Link
                // to={`/profile/${myPost.UserId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{shareXUsers.username}</span>
              </Link>

              <span className="date">{formattedDate}</span>
            </div>
          </div>

          <MdOutlineMoreHoriz />
        </div>
        {/* Post content text and picture or video */}
        <div className="content">
          <p>{Description}</p>
          <img src={image} alt={image} />
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
            12 comments
          </div> */}
          <div className="item">
            <MdOutlineIosShare />
            share
          </div>
        </div>
        {/* {isCommentOpen && <Replies />} */}
      </div>
    </div>
  );
};

export default ProfileTimeLine;
