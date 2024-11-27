import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../Reduxtoolkit/authSlice";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import axios from "../API/axios";
import { useGlobalContext } from "../ContextApi/GlobalContext";
import useReload from "./useReload";
import { useNavigate, useParams } from "react-router-dom";

const useEditProfile = () => {
  const { editDetails, closeEditInfo } = useGlobalContext();
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // const { username } = useParams();
  const navigate = useNavigate();

  // form state
  const [fullname, setFullname] = useState(currentUser?.Fullname || "");
  const [userName, setUserName] = useState(currentUser?.username || "");
  const [currentCity, setCurrentCity] = useState(
    currentUser?.CurrentCity || ""
  );
  const [homeCity, setHomeCity] = useState(currentUser?.From || "");
  const [School, setSchool] = useState(currentUser?.School || "");
  const [Workplace, setWorkplace] = useState(currentUser?.Workplace || "");
  const [dob, setDob] = useState(currentUser?.Birthday || "");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedGenderOption, setSelectedGenderOption] = useState(
    currentUser?.Gender || ""
  );
  // date of birth onChange
  const handleDobChange = (e) => {
    // Allow only numbers, "/", and "-" in the dob input
    const limitdobValue = e.target.value.replace(/[^0-9/-]/g, "");
    setDob(limitdobValue);
  };
  //handle number onChange
  const handleInputChange = (e) => {
    // Allow only numbers in the input
    const limitnumberValue = e.target.value.replace(/^\d{15}$/, "");
    setPhoneNumber(limitnumberValue);
  };

  //Image types, state,functions

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
  // Image preview and upload state
  const [previewImage, setPreviewImage] = useState(currentUser?.profilePicture);
  const [previewheaderImage, setPreviewheaderImage] = useState(
    currentUser?.coverPicture
  );
  const [profileImage, setProfileImage] = useState("");
  const [headerImage, setHeaderImage] = useState("");
  const storage = getStorage();

  const SelectProfileImage = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const SelectProfileHeaderImage = (e) => {
    const file = e.target.files[0];
    setHeaderImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewheaderImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadProfile = async () => {
    const profileImageType = metadata.contentType.includes(
      profileImage["type"]
    );

    if (profileImageType) {
      const storageRef = ref(
        storage,
        `profileImages/${profileImage.name + v4()}`
      );
      try {
        await uploadBytes(storageRef, profileImage);
        // Get the download URL
        const imageUrl = await getDownloadURL(storageRef);
        return imageUrl;
      } catch (error) {
        console.error("Error uploading image to Firestore: ", error);
        throw new Error("Error uploading image to Firestore.");
      }
    }
  };

  const uploadHeaderImage = async () => {
    const headerImageType = metadata.contentType.includes(headerImage["type"]);

    // if (!previewImage) return;
    if (headerImageType) {
      const storageRef = ref(
        storage,
        `HeaderImages/${headerImage.name + v4()}`
      );
      try {
        await uploadBytes(storageRef, headerImage);
        // Get the download URL
        const imageUrl = await getDownloadURL(storageRef);
        return imageUrl;
      } catch (error) {
        console.error("Error uploading image: ", error);
        throw new Error("Error uploading image .");
      }
    }
  };

  //Update Profile Info
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    // console.log("I have updated my info");

    try {
      const profileImageUrl = await uploadProfile();
      const headerImageUrl = await uploadHeaderImage();

      const response = await axios.put(
        `/api/users/${currentUser?._id}`,
        {
          Fullname: fullname,
          username: userName,
          From: homeCity,
          CurrentCity: currentCity,
          Workplace: Workplace,
          School: School,
          Birthday: dob,
          Gender: selectedGenderOption,
          profilePicture: profileImageUrl,
          coverPicture: headerImageUrl,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      dispatch(loginSuccess(response.data));
      closeEditInfo();
      navigate("/");
    } catch (error) {
      alert(error.message || "An error occurred while updating profile.");
    }
  };

  return {
    fullname,
    userName,
    currentCity,
    homeCity,
    School,
    Workplace,
    dob,
    phoneNumber,
    selectedGenderOption,
    setFullname,
    setUserName,
    setCurrentCity,
    setHomeCity,
    setSchool,
    setWorkplace,
    setPhoneNumber,
    setSelectedGenderOption,
    handleDobChange,
    handleInputChange,
    previewImage,
    setPreviewImage,
    previewheaderImage,
    setPreviewheaderImage,
    SelectProfileImage,
    SelectProfileHeaderImage,
    handleUpdateProfile,
    editDetails,
    closeEditInfo,
  };
};

export default useEditProfile;
