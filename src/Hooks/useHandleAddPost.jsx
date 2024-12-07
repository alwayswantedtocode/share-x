import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setPosts } from "../Reduxtoolkit/postSlice";
import axios from "../API/axios";
import { setUsersPost } from "../Reduxtoolkit/appUsersSlice";
import { v4 } from "uuid";
import { useSocketContext } from "../ContextApi/SocketContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const useHandleAddPost = (
  setViewMedia,
  file,
  setFile,
  mediaType,
  setMediaType,
  text,
  setIsloading
) => {
  const { currentUser } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);
  const { usersPosts } = useSelector((state) => state.Users);
  const dispatch = useDispatch();
  const storage = getStorage();
  const { socket,listenToEvent, stopListeningToEvent, initialized } =
    useSocketContext();
  const { username } = useParams();

  // Media handler
  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();

      if (selectedFile.type.includes("image")) {
        setMediaType("image");
        reader.onload = (event) => {
          setViewMedia(event.target.result);
        };
        reader.readAsDataURL(selectedFile);
      } else if (selectedFile.type.includes("video")) {
        setMediaType("video");
        const videoUrl = URL.createObjectURL(selectedFile);
        setViewMedia(videoUrl);
      }
    }
  };

  const handleReomveMediaPreview = () => {
    setFile(null);
    setViewMedia(null);
  };

  const uploadMediaToStorage = async () => {
    if (file) {
      const storageRef = ref(storage, `SharedMedia/${file.name + v4()}`);
      try {
        await uploadBytes(storageRef, file);
        const mediaUrl = await getDownloadURL(storageRef);
        return mediaUrl;
      } catch (error) {
        console.error("Error uploading media to storage:", error);
        throw new Error("Error uploading media.");
      }
    }
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    setIsloading(true);

    if (text.current.value.trim() || file) {
      try {
        const mediaUrl = await uploadMediaToStorage();

        const response = await axios.post("/api/posts", {
          userId: currentUser?._id,
          // profilePicture: currentUser?.profilePicture,
          username: currentUser?.username,
          Fullname: currentUser?.Fullname,
          Description: text.current.value.trim(),
          Media: mediaUrl || null,
          MediaType: mediaType || null,
        });

        text.current.value = "";
        setFile(null);
        setViewMedia(null);
        setMediaType("");

        // Emit a 'newPost' event via socket
        if (initialized) {
          socket.emit("newPost", response.data);
        }
      } catch (error) {
        alert(error.message);
      } finally {
        setIsloading(false);
      }
    }
  };

  useEffect(() => {
    if (!initialized) return;

    const handleNewPost = (newPostData) => {
      console.log("New post received via socket:", newPostData);

      if (!username) {
        dispatch(setPosts([newPostData, ...posts]));
      } else {
        dispatch(setUsersPost([newPostData, ...usersPosts]));
      }
    };

    listenToEvent("newPost", handleNewPost);

    return () => {
      stopListeningToEvent("newPost", handleNewPost); // Clean up event listener
    };
  }, [
    initialized,
    dispatch,
    posts,
    usersPosts,
    currentUser._id,
    username,
    listenToEvent,
    stopListeningToEvent,
  ]);

  return { handleUpload, handleReomveMediaPreview, handleSubmitPost };
};

export default useHandleAddPost;
