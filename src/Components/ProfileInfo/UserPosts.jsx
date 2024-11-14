// import "../../Pages/Profile Page/profile.scss";
import "../HomePage Components/home.scss";
import { useState } from "react";
import Reply from "../HomePage Components/Reply";
import Profileimage from "../../Assets/profile-gender-neutral.jpg";
import { MdOutlineMoreHoriz, MdOutlineIosShare } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiMessageAlt } from "react-icons/bi";
import useHandleLike from "../../Hooks/useHandleLike";
import { useSelector } from "react-redux";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import moreClass from "../HomePage Components/MoreStlye";
import useHandlePostOptions from "../../Hooks/useHandlePostOptions";
import OptionsAside from "../Aside/OptionsAside";
import { useGlobalContext } from "../../ContextApi/GlobalContext";
import useHandleComments from "../../Hooks/useHandleComments";
import EditPost from "../HomePage Components/EditPost";

// TimeAgo.addDefaultLocale(en);

const UserPosts = ({
  postId,
  userId,
  Image,
  Likes,
  Username,
  feeds,
  Description,
  Timestamp,
  Comments,
  replyLikes,
}) => {
  const { moreRef, commentRef } = useGlobalContext();

  TimeAgo.addLocale(en);
  const date = new Date(Timestamp);
  // Create a TimeAgo instance
  const timeAgo = new TimeAgo("en-US");
  // Format the date using TimeAgo
  const formattedDate = timeAgo.format(date);
  const { currentUser } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.Users);
  const { like, isLiked, likeHandler } = useHandleLike(
    Likes,
    feeds,
    replyLikes
  );
  const { isCommentOpen, commentHandle } = useHandleComments();
  const { handleMoreOptions, more, setMore } = useHandlePostOptions();
  const [isEdit, setIsEdit] = useState(false); //edit post state

  const handleEditPost = (event) => {
    event.stopPropagation();
    //  console.log(true);
    setIsEdit(true);
    setMore(false);
  };

  return (
    <div className="post">
      <div className="container">
        {/* poster author and time */}
        <div className="user">
          <div className="userInfo">
            <img
              src={users?.profilePicture || Profileimage}
              alt="Profileimage"
            />
            <div className="details">
              <span className="name">{Username}</span>
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
                  userId={userId}
                  postId={postId}
                  handleEditPost={handleEditPost}
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
                description={Description}
                postId={postId}
                setIsEdit={setIsEdit}
              />
            ) : (
              <p>{Description}</p>
            )}
          </div>
          <div className="Image-wrapper">
            {Image && <img src={Image} alt="" />}
          </div>
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
          <Reply postId={postId} Comments={Comments} replyLikes={replyLikes} />
        )}
      </div>
    </div>
  );
};

export default UserPosts;
