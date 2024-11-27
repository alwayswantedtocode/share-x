import { useEffect, useRef, useState } from "react";
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
import Video from "./video";
import DeletePost from "./DeletePost";
import useHandleDelete from "../../../Hooks/useHandleDelete";
import useHandleEdit from "../../../Hooks/useHandleEdit";
import { useDropdownContext } from "../../../ContextApi/DropdownContext";

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
  const { commentsRef, activeDropdown, toggleDropdown, closeDropdown } =
    useDropdownContext();
  // const dropDownRef = useRef(null);
  const { currentUser } = useSelector((state) => state.auth);
  const { likeCount, isLiked, likeHandler } = useHandPostleLike(Likes, feeds);

  const [isEdit, setIsEdit] = useState(false);
  const [isDeleteopen, setIsDeleteopen] = useState(false);

  const { handleDeletePost } = useHandleDelete(postId);
  const { onSubmitEditPost } = useHandleEdit(setIsEdit, feeds);

  const timeAgo = new TimeAgo("en-US");
  const formattedDate = Timestamp
    ? timeAgo.format(new Date(Timestamp))
    : "Invalid Date";

  //more option dropdown close on mousedown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        moreRef.current &&
        !moreRef.current.contains(event.target) &&
        commentsRef.current &&
        !commentsRef.current.contains(event.target)
      ) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeDropdown]);


  //Open Edit option
  const handleEditPost = (event) => {
    event.stopPropagation();
    setIsEdit(true);
    closeDropdown();
    // console.log("its works edit");
  };

  //Open delete option
  const handleOpenDeletePost = () => {
    setIsDeleteopen(true);
    closeDropdown();
    // console.log("its works delete");
  };

  return (
    <>
      <DeletePost
        isDeleteopen={isDeleteopen}
        setIsDeleteopen={setIsDeleteopen}
        handleDeletePost={handleDeletePost}
      />
      <div className="post">
        <div className="container" ref={commentsRef}>
          <div className="user">
            <div className="userInfo">
              <Link
                to={`/profilepage/${Username}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={profilePicture || Profileimage}
                  alt={`${Username} CoverImage`}
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
            <div className="More" style={moreClass} ref={moreRef}>
              <MdOutlineMoreHoriz
                style={{ cursor: "pointer" }}
                onClick={() => toggleDropdown(0)}
              />
              {activeDropdown === 0 ? (
                <OptionsAside
                  userId={userId}
                  postId={postId}
                  handleEditPost={handleEditPost}
                  handleOpenDeletePost={handleOpenDeletePost}
                />
              ) : (
                ""
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
              <span className="icon" onClick={() => toggleDropdown(1)}>
                <BiMessageAlt />
              </span>
              <p>{Comments?.length}</p>
            </div>
            <div className="item">
              <MdOutlineIosShare /> Share
            </div>
          </div>

          {activeDropdown === 1 ? (
            <div>
              <Reply postId={postId} feeds={feeds} />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Post;
