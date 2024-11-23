// import "./home.scss";
import { FcGallery, FcVideoCall } from "react-icons/fc";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoMdPricetag } from "react-icons/io";
import { HiLocationMarker } from "react-icons/hi";
import ProfileImage from "../../../Assets/profile-gender-neutral.jpg";
import { useState, useRef, useLayoutEffect } from "react";
import { Picker } from "emoji-mart";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useHandleAddPost from "../../../Hooks/useHandleAddPost";
import { FiX } from "react-icons/fi";

const MIN_TEXTAREA_HEIGHT = 65;

const SharePost = () => {
  const textareaRef = useRef(null);
  const text = useRef("");

  const setRefs = (element) => {
    text.current = element;
    textareaRef.current = element;
  };

  const { currentUser } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.post);

  const [value, setValue] = useState("");
  const [viewMedia, setViewMedia] = useState(null);
  const [file, setFile] = useState("");
  const [mediaType, setMediaType] = useState("");

  // Set textarea height dynamically
  useLayoutEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      textareaRef.current.style.height = `${Math.max(
        textareaRef.current.scrollHeight,
        MIN_TEXTAREA_HEIGHT
      )}px`;
    }
  }, [value]);

  const [openEmoji, setOpenEmoji] = useState(false);
  const handleEmoji = () => setOpenEmoji(!openEmoji);
  const addEmoji = (emoji) => {
    if (text.current) {
      text.current.value += emoji.native;
    }
  };
  const { handleUpload, handleReomveMediaPreview, handleSubmitPost } =
    useHandleAddPost(
      setViewMedia,
      file,
      setFile,
      mediaType,
      setMediaType,
      text
    );
  return (
    <div className="Sharepost-Wrapper">
      <div className="sharePost">
        {/* text and preview area*/}
        <form className="sharePostContainer" onSubmit={handleSubmitPost}>
          <div className="preview-media">
            {viewMedia && (
              <>
                {mediaType === "image" ? (
                  <img src={viewMedia} alt="Preview" />
                ) : mediaType === "video" ? (
                  <video controls src={viewMedia} />
                ) : null}
                <button
                  type="buton"
                  className="icon-btn"
                  onClick={handleReomveMediaPreview}
                >
                  <FiX className="icon" />
                </button>
              </>
            )}
          </div>
          <div className="textarea">
            <Link to={`/profilepage/${currentUser?.username}`}>
              <div className="image">
                {/* <img src={currentUser.profilePicture} alt="" /> */}
                <img
                  src={currentUser?.profilePicture || ProfileImage}
                  alt="Profile"
                />
              </div>
            </Link>

            <div className="input-container">
              <div className="text-area">
                <textarea
                  placeholder={`Share your experience ${
                    currentUser?.username?.trim() ||
                    currentUser?.username?.charAt(0).toLowerCase() ||
                    "User"
                  }`}
                  ref={setRefs}
                  type="text"
                  name="textarea"
                  style={{
                    minHeight: MIN_TEXTAREA_HEIGHT,
                    resize: "none",
                  }}
                />
              </div>

              <button
                style={{ backgroundColor: loading && "rgb(196, 181, 255)" }}
                className="SendButton"
                type="submit"
                disabled={loading}
              >
                Share
              </button>
            </div>
            {/* <span
              className="progressbar"
              style={{ width: `${progressbar}` }}
            ></span> */}
          </div>

          <hr />
          {/* Function area */}
          <div className="functionarea">
            <div className="postOptions">
              <div className="postOption">
                <FcVideoCall className="optionIcon" />
                <span>Live</span>
              </div>
              <div className="postOption">
                <label htmlFor="addMedia">
                  <span className="">
                    <FcGallery className="optionIcon" />
                    Gallery
                  </span>
                  <input
                    id="addMedia"
                    type="file"
                    accept="image/*,video/*"
                    style={{ display: "none" }}
                    onChange={handleUpload}
                  />
                </label>
              </div>

              <div className="postOption" onClick={handleEmoji}>
                <MdOutlineEmojiEmotions className="optionIcon" />
                <span>Emoji</span>
              </div>
              <div className="postOption">
                <IoMdPricetag
                  className="tag optionIcon"
                  style={{ color: "#C8E9E9" }}
                />
                <span>Tag</span>
              </div>
              <div className="postOption">
                <HiLocationMarker
                  className="location optionIcon"
                  style={{ color: "#FF0000" }}
                />
                <span>Location</span>
              </div>
            </div>
          </div>
          {/* Emoji Mart */}
          {openEmoji && (
            <div className="emojis">
              emoji
              <Picker />
              {/* onSelect={} */}
            </div>
          )}
        </form>
        {/* <div>posts</div> */}
      </div>

      {/* <div ref={scrollRef}></div> */}
    </div>
  );
};
export default SharePost;
