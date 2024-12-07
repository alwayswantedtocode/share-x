// import "./home.scss";
import Replies from "./Replies";
import Profileimage from "../../../Assets/profile-gender-neutral.jpg";
import { useRef, useState, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import useHandleAddComment from "../../../Hooks/useHandleAddComment";
import { useDropdownContext } from "../../../ContextApi/DropdownContext";

//TEXT AREA HEIGHT
const MIN_TEXTAREA_HEIGHT = 15;

const Reply = ({ postId, feeds }) => {
  const textareaRef = useRef(null);
  const Comment = useRef("");

  const setRefs = (element) => {
    Comment.current = element;
    textareaRef.current = element;
  };

  //textarea auto adjust
  const [value, setValue] = useState("");

  useLayoutEffect(() => {
    // Reset height - important to shrink on delete
    textareaRef.current.style.height = "inherit";
    // Set height
    textareaRef.current.style.height = `${Math.max(
      textareaRef.current.scrollHeight,
      MIN_TEXTAREA_HEIGHT
    )}px`;
  }, [value]);

  const { commentsRef, closeDropdown } = useDropdownContext();
  const { currentUser } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);

  const currentPost = posts.find((post) => post._id === postId);
  const comments = currentPost?.Comments || [];
  // console.log("comments in reply:",comments)
  const [isLoading, setIsloading] = useState(false);

  const { handleComment } = useHandleAddComment(
    Comment,
    postId,
    comments,
    setIsloading
  );

  return (
    <div className="comments" ref={commentsRef}>
      <div className="write">
        <img
          src={currentUser?.profilePicture || Profileimage}
          alt={`${currentUser?.username} ProfileImage`}
        />
        <form onSubmit={handleComment} className="form">
          <textarea
            type="text"
            placeholder={`add a comment ${
              currentUser?.username?.trim() ||
              currentUser?.username?.charAt(0).toLowerCase() ||
              "User"
            }`}
            name="textarea"
            style={{
              minHeight: MIN_TEXTAREA_HEIGHT,
              resize: "none",
            }}
            ref={setRefs}
          />
          <button
            className={isLoading ? "button loading" : "button "}
            type="submit"
          >
            {isLoading ? (
              <div className="loader">
                <span
                  style={{ background: " rgb(254,254, 254)" }}
                  className="dot"
                ></span>
                <span
                  style={{ background: " rgb(254,254, 254)" }}
                  className="dot"
                ></span>
                <span
                  style={{ background: " rgb(254,254, 254)" }}
                  className="dot"
                ></span>
              </div>
            ) : (
              "Reply"
            )}
          </button>
        </form>
      </div>

      {comments?.length > 0 && (
        <div>
          {comments?.map((comment) => {
            return (
              <Replies
                key={comment._id}
                username={comment?.username}
                profilePicture={comment?.profilePicture}
                reply={comment?.comments}
                Timestamp={comment?.createdAt}
                postId={postId}
                feeds={feeds}
                comment={comment}
                Likes={comment.Likes}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Reply;
