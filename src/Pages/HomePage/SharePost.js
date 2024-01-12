import { useAuthenticationContext } from "../../ContextApi/AuthenticationContext";
import "./home.scss";
import { FcGallery, FcVideoCall } from "react-icons/fc";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoMdPricetag } from "react-icons/io";
import { HiLocationMarker } from "react-icons/hi";
import UserIcon from "../../Assets/user-circle-svgrepo-com.svg";
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

import Post from "./Post";

const MIN_TEXTAREA_HEIGHT = 65;

const SharePost = () => {
  const { user, userData, userId } = useAuthenticationContext();

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
  const [image, setImage] = useState(null);
  const [state, dispatch] = useReducer(postReducer, initialPostState);
  const { SUBMIT_POST, HANDLE_ERROR } = postActions;

  const scrollRef = useRef();
  const collectionRef = collection(db, "posts");
  const postRef = doc(collection(db, "posts"));
  const document = postRef.id;

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (text.current.value !== "") {
      try {
        await setDoc(postRef, {
          documentId: document,
          uid: user?.uid || userData?.uid,
          logo: user?.photoURL,
          name: user?.displayName || userData?.name,
          email: user?.email || userData?.email,
          text: text.current.value,
          image: image,
          timestamp: serverTimestamp(),
        });
        text.current.value = "";
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.log(err.message);
      }
    } else {
      dispatch({ type: HANDLE_ERROR });
    }
  };

  // image handler

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
    setFile(e.target.files[0]);
  };

  const handleImage = async () => {
    const fileType = metadata.contentType.includes(file["type"]);
    if (!file) return;
    if (fileType) {
      try {
        const storageRef = ref(storage, `images/${file.name + v4()}`);
        const uploadTask = uploadBytesResumable(
          storageRef,
          file,
          metadata.contentType
        );
        await uploadTask.on(
          // "state_changed",
          // (snapshot) => {
          //   const progress = Math.round(
          //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          //   );
          //   console.log("Upload is" + progress + "% done");
          //   setProgressbar(progress);
          // },
          (error) => {
            alert(error);
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then(
              (downloadURL) => {
                setImage(downloadURL);
              }
            );
          }
        );
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.log(err.message);
      }
    }
  };
  //

  useEffect(() => {
    const postData = async () => {
      const q = query(collectionRef, orderBy("timestamp", "desc"));
      await onSnapshot(q, (doc) => {
        dispatch({
          type: SUBMIT_POST,
          posts: doc?.docs?.map((item) => ({ id: item?.id, ...item?.data() })),
        });
        scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
        setImage(null);
        setFile(null);
        // setProgressbar(0);
      });
    };
    return () => postData();
  }, [SUBMIT_POST]);

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
    <div className="timeline-content">
      <div className="sharePost">
        {/* text and preview area*/}
        <div className="sharePostContainer">
          <div className="preview-image">
            {image && <img src={image} alt="previewImage" />}
          </div>
          <div className="textarea">
            <Link to={`/profile/${userId}`}>
              <div className="image">
                {/* <img src={currentUser.profilePicture} alt="" /> */}
                <img src={user?.photoURL || UserIcon} alt="userIcon" />
              </div>
            </Link>

            <form className="input-container" onSubmit={handleSubmitPost}>
              <div className="text-and-preview">
                <textarea
                  placeholder={`Share your experience ${
                    user?.displayName?.trim() ||
                    userData?.name?.charAt(0).toLowerCase() ||
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
            </form>
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
                  <span onClick={handleImage}>Upload</span>
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
        </div>
        {/* <div>posts</div> */}
      </div>
      <div className="TimeLine">
        {/* {feeds.map((feed) => {
        return <Post feed={feed} key={feed.id} />;
       })} */}

        {state.error ? (
          <div className="alert">
            <div style={{ color: "red" }}>
              Something went wrong refresh and try again...
            </div>
          </div>
        ) : (
          <div>
            {state?.posts?.length > 0 ? (
              state.posts.map((post, index) => (
                <Post
                  key={index}
                  logo={post.logo}
                  id={post.documentId}
                  uid={post?.uid}
                  name={post.name}
                  email={post.email}
                  image={post.image}
                  text={post.text}
                  timestamp={new Date(post?.timestamp?.toDate())?.toUTCString()}
                />
              ))
            ) : (
              <div>
                No posts available.Share your first experince
                {/* <Post /> */}
              </div>
            )}
          </div>
        )}
      </div>
      <div ref={scrollRef}>{/*refrence for later*/}</div>
    </div>
  );
};
export default SharePost;
