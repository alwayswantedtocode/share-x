import "./home.scss";
import Profileimage from "../../Assets/profile-gender-neutral.jpg";
import Reply from "./Reply";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineMoreHoriz, MdOutlineIosShare } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiMessageAlt } from "react-icons/bi";
import useHandleLike from "../../Hooks/useHandleLike";
import { useSelector } from "react-redux";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);
const Post = ({
  feeds,
  postId,
  Username,
  description,
  Likes,
  Image,
  Comments,
  Timestamp,
}) => {
  const { like, isLiked, likeHandler } = useHandleLike(Likes, feeds);

  const { currentUser } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.post);

  // TimeAgo.addDefaultLocale(en);
  const date = new Date(Timestamp);
  // Create a TimeAgo instance
  const timeAgo = new TimeAgo("en-US");
  // Format the date using TimeAgo
  const formattedDate = timeAgo.format(date);

  const [isCommentOpen, setIsCommentOpen] = useState(false);

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
          <div className="item">
            <span onClick={likeHandler}>
              {isLiked ? (
                <AiFillHeart style={{ color: "rgb(165, 43, 43)" }} />
              ) : (
                <AiOutlineHeart />
              )}
            </span>
            <p>{like}</p>
          </div>
          <div className="item">
            <span onClick={commentHandle}>
              <BiMessageAlt />
            </span>
            <p>{Comments?.length}</p>
          </div>
          <div className="item">
            <MdOutlineIosShare />
            share
          </div>
        </div>
        {isCommentOpen && (
          <Reply postId={postId} feeds={feeds} Comments={Comments} />
        )}
      </div>
    </div>
  );
};

export default Post;
