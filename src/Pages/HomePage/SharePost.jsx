import { useAuthenticationContext } from "../../ContextApi/AuthenticationContext";
import "./home.scss";
import { FcGallery, FcVideoCall } from "react-icons/fc";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoMdPricetag } from "react-icons/io";
import { HiLocationMarker } from "react-icons/hi";
import Profileimage from "../../Assets/profile-gender-neutral.jpg";
import {
  useState,
  useRef,
  useLayoutEffect,
  useReducer,
  useEffect,
} from "react";
import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { db } from "../Authentication/Firebase";
import {
  postReducer,
  postActions,
  initialPostState,
} from "../../ContextApi/PostReducer";
import { v4 } from "uuid";

import { Picker } from "emoji-mart";
import { Link } from "react-router-dom";

// import axios from "axios";
import axios from "../../API/axios"

const MIN_TEXTAREA_HEIGHT = 65;

const SharePost = () => {
  const { user, userData, userId, AuthUser } = useAuthenticationContext();

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
  //

  // Post handler

  // image handler
  const [viewimage, setViewImage] = useState(null);
  const [file, setFile] = useState(null);
  // const [progressbar, setProgressbar] = useState(0);
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
    if (!file) {
      throw new Error("No file selected");
    }
    // const fileType = metadata.contentType.includes(file["type"]);

    // if (fileType) {
    const storageRef = ref(storage, `Sharedimage/${file.name + v4()}`);
    //   console.log(`${file.name + v4()}`)

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
    // }
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (text.current.value !== "") {
      try {
        const imageUrl = await uploadImageToFirestore();
        // Use Axios to send post data to your backend route
        await axios.post("/posts", {
          userId: AuthUser._id,
          Description: text.current.value,
          Image: imageUrl,
        });

        text.current.value = "";
        setFile(null);
        setViewImage(null);
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
            <Link to={`/profilepage/${AuthUser.username}`}>
              <div className="image">
                {/* <img src={currentUser.profilePicture} alt="" /> */}
                <img
                  src={AuthUser?.profilePicture || Profileimage}
                  alt="Profile"
                />
              </div>
            </Link>

            <div className="input-container">
              <div className="text-and-preview">
                <textarea
                  placeholder={`Share your experience ${
                    AuthUser?.username?.trim() ||
                    AuthUser?.username?.charAt(0).toLowerCase() ||
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
                <span>Live Video</span>
              </div>
              <div className="postOption">
                <label htmlFor="addImage">
                  <FcGallery className="optionIcon" />
                  <input
                    id="addImage"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleUpload}
                  />
                </label>
                {file ? (
                  <span onClick={uploadImageToFirestore}>Upload</span>
                ) : (
                  <span className="btn">Gallery</span>
                )}
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
              <Picker onSelect={(emoji) => addEmoji(emoji)} />
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
