// import "./home.scss";
import PropTypes from "prop-types";
import { useState } from "react";
import Profileimage from "../../Assets/profile-gender-neutral.jpg";
import Reply from "./Reply";
import OptionsAside from "../Aside/OptionsAside";
import EditPost from "./EditPost";
import moreClass from "./MoreStlye";
import { Link } from "react-router-dom";
import { MdOutlineMoreHoriz, MdOutlineIosShare } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiMessageAlt } from "react-icons/bi";
import useHandleLike from "../../Hooks/useHandleLike";
import { useSelector } from "react-redux";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { useGlobalContext } from "../../ContextApi/GlobalContext";
import useHandleComments from "../../Hooks/useHandleComments";
import useHandlePostOptions from "../../Hooks/useHandlePostOptions";


TimeAgo.addLocale(en);

const Post = ({
  feeds,
  postId,
  userId,
  Username,
  description,
  Likes,
  Image,
  Timestamp,
  Comments,
  profilePicture,
}) => {
  const { moreRef, commentRef } = useGlobalContext();
  const { like, isLiked, likeHandler } = useHandleLike(Likes, feeds);
  const { isCommentOpen, commentHandle } = useHandleComments();
  const { handleMoreOptions, more, setMore } = useHandlePostOptions();
  const { currentUser } = useSelector((state) => state.auth);

  const [isEdit, setIsEdit] = useState(false);

  const timeAgo = new TimeAgo("en-US");
  const formattedDate = Timestamp
    ? timeAgo.format(new Date(Timestamp))
    : "Invalid Date";

  const handleEditPost = (event) => {
    event.stopPropagation();
    setIsEdit(true);
    setMore(false);
  };


  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <Link
              to={`/profilepage/${Username}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img src={profilePicture || Profileimage} alt="Profile" />
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
          <div className="More" style={moreClass}>
            <MdOutlineMoreHoriz
              style={{ cursor: "pointer" }}
              onClick={handleMoreOptions}
            />
            {more && (
              <OptionsAside
                userId={userId}
                postId={postId}
                handleEditPost={handleEditPost}
              />
            )}
          </div>
        </div>

        <div className="content">
          <div className="desc-wrapper">
            {isEdit && currentUser?._id === userId ? (
              <EditPost
                description={description}
                postId={postId}
                Image={Image}
                setIsEdit={setIsEdit}
              />
            ) : (
              <p>{description}</p>
            )}
          </div>
          <div className="Image-wrapper">
            {Image && <img src={Image} alt="Post" />}
          </div>
        </div>

        <div className="info">
          <div className="item" onClick={likeHandler}>
            {isLiked ? (
              <AiFillHeart style={{ color: "rgb(165, 43, 43)" }} />
            ) : (
              <AiOutlineHeart />
            )}
            <p>{like}</p>
          </div>
          <div className="item" ref={commentRef}>
            <span onClick={commentHandle}>
              <BiMessageAlt />
            </span>
            <p>{Comments?.length}</p>
          </div>
          <div className="item">
            <MdOutlineIosShare /> Share
          </div>
        </div>

        {isCommentOpen && (
          <Reply postId={postId} feeds={feeds} Comments={Comments} />
        )}
      </div>
    </div>
  );
};

// Post.propTypes = {
//   postId: PropTypes.string.isRequired,
//   userId: PropTypes.string.isRequired,
//   Username: PropTypes.string.isRequired,
//   description: PropTypes.string,
//   Likes: PropTypes.arrayOf(PropTypes.string),
//   Image: PropTypes.string,
//   Timestamp: PropTypes.string.isRequired,
//   Comments: PropTypes.arrayOf(PropTypes.object),
//   profilePicture: PropTypes.string,
// };

// Post.defaultProps = {
//   description: "",
//   Likes: [],
//   Comments: [],
//   profilePicture: Profileimage,
// };

export default Post;
