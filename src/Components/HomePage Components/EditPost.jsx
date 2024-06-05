import "./home.scss";
import React, { useState, useRef, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../Reduxtoolkit/postSlice";
import axios from "../../API/axios";
import useReload from "../../Hooks/useReload";
import { useGlobalContext } from "../../ContextApi/GlobalContext";

const MIN_TEXTAREA_HEIGHT = 65;
const EditPost = ({ description, postId, Image }) => {
  const textareaRef = useRef(null);
  const { setIsEdit } = useGlobalContext();
  const { handleReload } = useReload();
  const { currentUser } = useSelector((state) => state.auth);
  const [editPost, setEditPost] = useState(description);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    // Reset height - important to shrink on delete
    textareaRef.current.style.height = "inherit";
    // Set height
    textareaRef.current.style.height = `${Math.max(
      textareaRef.current.scrollHeight,
      MIN_TEXTAREA_HEIGHT
    )}px`;
  }, [value]);

  const onSubmitEditPost = async (e) => {
    e.preventDefault();
    dispatch(setLoading());
    const form = {
      userId: currentUser?._id,
      profilePicture: currentUser?.profilePicture,
      username: currentUser?.username,
      Fullname: currentUser?.Fullname,
      Description: editPost,
      Image: Image,
    };
    console.log("form", form);
    try {
      await axios.put(`/api/posts/${postId}`, form, {
        params: { userId: currentUser._id },
      });
      setIsEdit(false);
      handleReload();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="edit-post-wrapper">
      <form
        action=""
        style={{ display: "flex", gap: "10px", alignItems: "center" }}
        onSubmit={onSubmitEditPost}
      >
        <div className="Edit-text">
          {" "}
          <textarea
            name="editPost"
            id="editPost"
            value={editPost}
            onChange={(e) => setEditPost(e.target.value)}
            ref={textareaRef}
            style={{
              minHeight: MIN_TEXTAREA_HEIGHT,
              resize: "none",
            }}
          />
        </div>
        <button className="SendButton" type="submit">
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditPost;
