import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setPosts } from "../Reduxtoolkit/postSlice";
import axios from "../API/axios";
import { setUsersPost } from "../Reduxtoolkit/appUsersSlice";
import { v4 } from "uuid";

const useHandleAddPost = (
  setViewMedia,
  file,
  setFile,
  mediaType,
  setMediaType,
  text
) => {
  const { currentUser } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);
  const { usersPosts } = useSelector((state) => state.Users);
  const dispatch = useDispatch();
  const storage = getStorage();

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
    dispatch(setLoading(true));

    if (text.current.value.trim() || file) {
      try {
        const mediaUrl = await uploadMediaToStorage();

        const response = await axios.post("/api/posts", {
          userId: currentUser?._id,
          profilePicture: currentUser?.profilePicture,
          username: currentUser?.username,
          Fullname: currentUser?.Fullname,
          Description: text.current.value.trim(),
          Media: mediaUrl || null,
          MediaType: mediaType || null,
        });

        dispatch(setPosts([response.data, ...posts]));
        dispatch(setUsersPost([response.data, ...usersPosts]));
        text.current.value = "";
        setFile(null);
        setViewMedia(null);
        setMediaType("");
      } catch (error) {
        alert(error.message);
      } finally {
        dispatch(setLoading(false));
      }
    }
  };
  return { handleUpload, handleReomveMediaPreview, handleSubmitPost };
};

export default useHandleAddPost;


