// import "./home.scss";
import { FcGallery, FcVideoCall } from "react-icons/fc";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoMdPricetag } from "react-icons/io";
import { HiLocationMarker } from "react-icons/hi";
import Profileimage from "../../Assets/profile-gender-neutral.jpg";
import { useState, useRef, useLayoutEffect } from "react";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { Picker } from "emoji-mart";
import { Link } from "react-router-dom";
// import axios from "axios";
import axios from "../../API/axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setPosts } from "../../Reduxtoolkit/postSlice";

const MIN_TEXTAREA_HEIGHT = 65;

const SharePost = () => {
  // const { handleReload } = useReload();
  const { currentUser } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const textareaRef = useRef(null);
  const text = useRef("");

  const setRefs = (element) => {
    text.current = element;
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

  // Post handler

  // image handler
  const [viewimage, setViewImage] = useState(null);
  const [file, setFile] = useState("");

  const storage = getStorage();

  // Create the file metadata
  /** @type {any} */
  const metadata = {
    contentType: [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/svg+xml",
      "image/jpg",
      "image/gif",
    ],
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setViewImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToFirestore = async () => {
    const fileType = metadata.contentType.includes(file["type"]);

    if (fileType) {
      const storageRef = ref(storage, `Sharedimage/${file.name + v4()}`);

      try {
        // Upload the file
        await uploadBytes(storageRef, file);
        // Get the download URL
        const imageUrl = await getDownloadURL(storageRef);
        return imageUrl;
      } catch (error) {
        console.error("Error uploading image to Firestore: ", error);
        throw new Error("Error uploading image to Firestore.");
      }
    }
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    dispatch(setLoading());
    if (text.current.value !== "" || file) {
      try {
        const imageUrl = await uploadImageToFirestore();
        // Use Axios to send post data to your backend route
        const response = await axios.post("/api/posts", {
          userId: currentUser?._id,
          profilePicture: currentUser?.profilePicture,
          username: currentUser?.username,
          Fullname: currentUser?.Fullname,
          Description: text.current.value,
          Image: imageUrl,
        });
        // setDisplayposts([...posts, response.data]);
        dispatch(setPosts([response.data, ...posts]));
        text.current.value = "";
        setFile(null);
        setViewImage(null);
        // handleReload();
      } catch (error) {
        alert(error.message);
      }
    } else {
    }
  };

  // console.log(postData);
  //Emoji Mart use State

  const [openEmoji, setOpenEmoji] = useState(false);

  const handleEmoji = () => {
    setOpenEmoji(!openEmoji);
  };

  const addEmoji = (emoji) => {
    // if (text.current.value!=="") {
    //   let icn = e.unified.split("-");
    //   let codeArray = [];
    //   icn.forEach((element) => codeArray.push("0x" + element));
    //   let emoji = String.fromCodePoint(...codeArray);
    //   text.current.value += emoji;
    // }

    if (text.current) {
      text.current.value += emoji.native;
    }
  };

  return (
    <div className="Sharepost-Wrapper">
      <div className="sharePost">
        {/* text and preview area*/}
        <form className="sharePostContainer" onSubmit={handleSubmitPost}>
          <div className="preview-image">
            {viewimage && <img src={viewimage} alt="previewImage" />}
          </div>
          <div className="textarea">
            <Link to={`/profilepage/${currentUser?.username}`}>
              <div className="image">
                {/* <img src={currentUser.profilePicture} alt="" /> */}
                <img
                  src={currentUser?.profilePicture || Profileimage}
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

              <button className="SendButton" type="submit">
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
                <label htmlFor="addImage">
                  <span className="">
                    <FcGallery className="optionIcon" />
                    Gallery
                  </span>
                  <input
                    id="addImage"
                    type="file"
                    accept="image/*"
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
