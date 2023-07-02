import "./home.scss";
import { Link } from "react-router-dom";
import { MdOutlineMoreHoriz, MdOutlineIosShare } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiMessageAlt } from "react-icons/bi";
import { useState } from "react";
import Replies from "./Replies";

const Post = ({ feed }) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);

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
              to={`/profile/${feed.userId}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img src={feed.profilePicture} alt="" />
            </Link>

            <div className="details">
              <Link
                to={`/profile/${feed.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{feed.name}</span>
              </Link>
              <span className="date">1 min ago</span>
            </div>
          </div>
          <MdOutlineMoreHoriz style={{ cursor: "pointer" }} />
        </div>
        {/* Post content text and picture or video */}
        <div className="content">
          <p>{feed.description}</p>
          <img src={feed.image} alt="" />
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

export default Post;
