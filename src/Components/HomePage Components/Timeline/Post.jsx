import { useState } from "react";
import Profileimage from "../../../Assets/profile-gender-neutral.jpg";
import Reply from "./Reply";
import OptionsAside from "../../Aside/OptionsAside";
import EditPost from "./EditPost";
import moreClass from "./MoreStlye";
import { Link } from "react-router-dom";
import { MdOutlineMoreHoriz, MdOutlineIosShare } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiMessageAlt } from "react-icons/bi";
import useHandPostleLike from "../../../Hooks/useHandPostleLike";
import { useSelector } from "react-redux";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { useGlobalContext } from "../../../ContextApi/GlobalContext";
import useHandleCommentsLikes from "../../../Hooks/useHandleCommentsLikes";
import useHandlePostOptions from "../../../Hooks/useHandlePostOptions";
import Video from "./video";
import DeletePost from "./DeletePost";
import useHandleDelete from "../../../Hooks/useHandleDelete";
import useHandleEdit from "../../../Hooks/useHandleEdit";

TimeAgo.addLocale(en);

const Post = ({
  feeds,
  postId,
  userId,
  Username,
  description,
  Likes,
  Image,
  media,
  mediaType,
  Timestamp,
  Comments,
  profilePicture,
}) => {
  const { moreRef } = useGlobalContext();
  const { currentUser } = useSelector((state) => state.auth);
  const { likeCount, isLiked, likeHandler } = useHandPostleLike(Likes, feeds);

  const [isEdit, setIsEdit] = useState(false);
  const [isDeleteopen, setIsDeleteopen] = useState(false);

  const { isCommentOpen, toggleComments } = useHandleCommentsLikes();
  const { handleMoreOptions, more, setMore } = useHandlePostOptions();

  const { handleDeletePost } = useHandleDelete(postId);
  const { onSubmitEditPost } = useHandleEdit(setIsEdit, feeds);

  const timeAgo = new TimeAgo("en-US");
  const formattedDate = Timestamp
    ? timeAgo.format(new Date(Timestamp))
    : "Invalid Date";

  const handleEditPost = (event) => {
    event.stopPropagation();
    setIsEdit(true);
    setMore(false);
  };

  const handleOpenDeletePost = () => {
    setIsDeleteopen(true);
    setMore(false);
  };

  return (
    <>
      <DeletePost
        isDeleteopen={isDeleteopen}
        setIsDeleteopen={setIsDeleteopen}
        handleDeletePost={handleDeletePost}
      />
      <div className="post">
        <div className="container">
          <div className="user" ref={moreRef}>
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
                  handleOpenDeletePost={handleOpenDeletePost}
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
                  isEdit={isEdit}
                  setIsEdit={setIsEdit}
                  
                />
              ) : (
                <p>{description}</p>
              )}
            </div>
            <div className="Media-wrapper">
              {mediaType === "image" ? (
                <img src={media} alt="Post" />
              ) : mediaType === "video" ? (
                <Video media={media} />
              ) : null}
            </div>
          </div>

          <div className="info">
            <div className="item" onClick={likeHandler}>
              {isLiked ? (
                <AiFillHeart
                  className="icon"
                  style={{ color: "rgb(165, 43, 43)" }}
                />
              ) : (
                <AiOutlineHeart className="icon" />
              )}
              <p>{likeCount}</p>
            </div>
            <div className="item">
              <span className="icon" onClick={toggleComments}>
                <BiMessageAlt />
              </span>
              <p>{Comments?.length}</p>
            </div>
            <div className="item">
              <MdOutlineIosShare /> Share
            </div>
          </div>

          {isCommentOpen && <Reply postId={postId} feeds={feeds} />}
        </div>
      </div>
    </>
  );
};

export default Post;
