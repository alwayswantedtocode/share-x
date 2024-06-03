import "./home.scss";
import Profileimage from "../../Assets/profile-gender-neutral.jpg";
import Reply from "./Reply";
import OptionsAside from "../Aside/OptionsAside";
import EditPost from "./EditPost";
import moreClass from "./MoreStlye";
import { useState, useRef, useEffect } from "react";
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

TimeAgo.addDefaultLocale(en);
const Post = ({
  feeds,
  postId,
  userId,
  Username,
  description,
  Likes,
  Image,
  Comments,
  Timestamp,
}) => {
  const { moreRef, commentRef } = useGlobalContext();
  const { like, isLiked, likeHandler } = useHandleLike(Likes, feeds);
  const { isCommentOpen, commentHandle, closeCommentOnMousedown } =
    useHandleComments();
  const { more, setMore, handleMoreOptions, closePotionOnmousedown } =
    useHandlePostOptions();

  const { currentUser } = useSelector((state) => state.auth);

  // TimeAgo.addDefaultLocale(en);
  const date = new Date(Timestamp);
  // Create a TimeAgo instance
  const timeAgo = new TimeAgo("en-US");
  // Format the date using TimeAgo
  const formattedDate = timeAgo.format(date);

  // // //Close Comment section
  // useEffect(() => {
  //   document.addEventListener("mousedown", closeCommentOnMousedown);
  //   return () => {
  //     document.removeEventListener("mousedown", closeCommentOnMousedown);
  //   };
  // }, []);

  // //CLose More Options for post
  // useEffect(() => {
  //   document.addEventListener("mousedown", closePotionOnmousedown);
  //   return () => {
  //     document.removeEventListener("mousedown", closePotionOnmousedown);
  //   };
  // }, []);

  const [isEdit, setIsEdit] = useState(false);

  const handleEditPost = () => {
    setIsEdit(true);
    setMore(false);
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
          <div className="More" style={moreClass}>
            <MdOutlineMoreHoriz
              style={{ cursor: "pointer" }}
              onClick={handleMoreOptions}
            />

            <aside ref={moreRef}>
              {more ? (
                <OptionsAside
                  isMore={setMore}
                  more={more}
                  handleEditPost={handleEditPost}
                  userId={userId}
                />
              ) : (
                ""
              )}
            </aside>
          </div>
        </div>
        {/* Post content text and picture or video */}
        <div className="content">
          <div className="desc-wrapper">
            {isEdit && currentUser?._id === userId ? (
              <EditPost
                description={description}
                postId={postId}
                Image={Image}
                isClosedEditPost={setIsEdit}
              />
            ) : (
              <p>{description}</p>
            )}
          </div>
          <div className="Image-wrapper">
            {Image && <img src={Image} alt="" />}
          </div>
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
          <div className="item" ref={commentRef}>
            <span>
              <BiMessageAlt onClick={() => commentHandle()} />
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
