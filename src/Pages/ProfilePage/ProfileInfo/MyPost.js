import "../profile.scss";
import { Link } from "react-router-dom";
import { MdOutlineMoreHoriz, MdOutlineIosShare } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiMessageAlt } from "react-icons/bi";
import { useState } from "react";
import Replies from "../../HomePage/Replies";
import { useAuthenticationContext } from "../../../ContextApi/AuthenticationContext";
import UserIcon from "../../../Assets/user-circle-svgrepo-com.svg";

const MyPost = ({ logo, name, image, text, timestamp }) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const { user, userData } = useAuthenticationContext();
  const UserId = user?.uid;

  console.log("items", logo, name, image, text, timestamp);

  console.log("hello", UserId);

  const commentHandle = () => {
    setIsCommentOpen(!isCommentOpen);
  };
  const liked = true;
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
              <img src={logo || UserIcon} alt="userIcon" />
            </Link>

            <div className="details">
              <Link
                // to={`/profile/${myPost.UserId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{name}</span>
              </Link>

              <span className="date">{timestamp}</span>
            </div>
          </div>

          <MdOutlineMoreHoriz />
        </div>
        {/* Post content text and picture or video */}
        <div className="content">
          <p>{text}</p>
          <img src={image} alt={image} />
        </div>
        {/* Interact with post */}
        <div className="info">
          <div className="item">
            {liked ? (
              <AiFillHeart style={{ color: "rgb(165, 43, 43)" }} />
            ) : (
              <AiOutlineHeart />
            )}
            12 likes
          </div>
          <div className="item" onClick={commentHandle}>
            <BiMessageAlt />
            12 comments
          </div>
          <div className="item">
            <MdOutlineIosShare />
            share
          </div>
        </div>
        {isCommentOpen && <Replies />}
      </div>
    </div>
  );
};

export default MyPost;
