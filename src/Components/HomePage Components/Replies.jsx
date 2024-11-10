import Profileimage from "../../Assets/profile-gender-neutral.jpg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import useHandleComments from "../../Hooks/useHandleComments";
import { useEffect } from "react";
import { useGlobalContext } from "../../ContextApi/GlobalContext";

TimeAgo.addDefaultLocale(en);
const Replies = ({
  username,
  profilePicture,
  reply,
  Timestamp,
  comment,
  Likes,
  feeds,
}) => {
  // TimeAgo.addDefaultLocale(en);
  const date = new Date(Timestamp);
  // Create a TimeAgo instance
  const timeAgo = new TimeAgo("en-US");
  // Format the date using TimeAgo
  const formattedDate = timeAgo.format(date);


  const { isLikedComment, likedComment, commentLikeHandler } =
    useHandleComments(comment, feeds);

  const dispatch = useDispatch();



  return (
    <>
      <div className="comment-div">
        <div className="CommenterInfo">
          <Link
            to={`/profilepage/${username}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="userImage">
              <img src={profilePicture || Profileimage} alt="" />
            </div>
          </Link>
        </div>
        <div className="description">
          <div className="Name-timeStamp">
            <span className="name">
              <Link
                to={`/profilepage/${username}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {username}
              </Link>
            </span>
            <span className="time">{formattedDate}</span>
          </div>
          <div className="text">
            <p>{reply}</p>
          </div>
        </div>
        <div className="impressions">
          <span onClick={commentLikeHandler}>
            {isLikedComment ? (
              <AiFillHeart style={{ color: "rgb(165, 43, 43)" }} />
            ) : (
              <AiOutlineHeart />
            )}
          </span>
          <p>{likedComment}</p>
        </div>
      </div>
    </>
  );
};

export default Replies;
