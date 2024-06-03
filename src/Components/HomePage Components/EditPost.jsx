import "./home.scss";
import React, { useState, useRef, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setPosts } from "../../Reduxtoolkit/postSlice";
import axios from "../../API/axios";

const MIN_TEXTAREA_HEIGHT = 65;
const EditPost = ({ description, postId, Image, isClosedEditPost }) => {
  const textareaRef = useRef(null);
  const { posts } = useSelector((state) => state.post);
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
    const form = {
      profilePicture: currentUser?.profilePicture,
      username: currentUser?.username,
      Fullname: currentUser?.Fullname,
      Description: editPost,
      Image: Image,
    };
    console.log("form", form);
    try {
      const res =await axios.put(
        `/api/posts/${postId}`,
        { form },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("edit post", res.data);
      // dispatch(setPosts([res.data, ...posts]));
      // dispatch(setLoading());
      isClosedEditPost(false);
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
