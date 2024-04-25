import React, { useContext, useState } from "react";
import { useGlobalContext } from "../../../ContextApi/GlobalContext";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineCamera } from "react-icons/ai";
import PPI from "./PPI";
import PPHI from "./PPHI";
import defaultimage from "../../../Assets/istockphoto-1409329028-612x612.jpg";
import { useAuthenticationContext } from "../../../ContextApi/AuthenticationContext";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import InputSelector from "../../ResuableSelectInputs/InputSelector";
import axios from "../../../API/axios";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../Reduxtoolkit/authSlice";

const ProfileInfoForm = () => {
  // const { isDarkMode,  } = useAuthenticationContext();
  const { editDetails, closeEditInfo, isDarkMode } = useGlobalContext();
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Input Selector css
  const inputClass = {
    width: "100%",
    height: "2.5rem",
    backgroundColor: isDarkMode ? "#3a3a3a" : "#ebebeb",
    position: "relative",
    padding: "0.8rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "2px solid",
    borderColor: isDarkMode ? "#f3f3f3" : "#444",
    color: isDarkMode ? "#f5f5f5" : "#3b3b3b",
    borderRadius: "10px",
    marginTop: "0.2rem",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  };

  const dropdownClass = {
    height: "max-content",
    overflow: "auto",
    zIndex: 10,
    position: "absolute",
    top: "2.7rem",
    width: "100%",
    backgroundColor: isDarkMode ? "#3a3a3a" : "#ebebeb",
    color: isDarkMode ? "#f5f5f5" : "#3b3b3b",
    borderRadius: "4px",
    border: "none",
    padding: "0.4rem",
    marginTop: "0.2rem",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  };

  const listClass = {
    ":hover": {
      backgroundColor: "#ebd1d1",
    },
    borderRadius: "4px",
    cursor: "pointer",
  };

  const GenderData = ["Select gender", "Female", "Male", "Non binary"];

  const [fullname, setFullname] = useState(currentUser?.Fullname || "");
  const [username, setUsername] = useState(currentUser?.username || "");
  const [currentCity, setCurrentCity] = useState(
    currentUser?.CurrentCity || ""
  );
  const [homeCity, setHomeCity] = useState(currentUser?.From || "");
  const [School, setSchool] = useState(currentUser?.School || "");
  const [Workplace, setWorkplace] = useState(currentUser?.Workplace || "");
  const [dob, setDob] = useState(currentUser?.Birthday || "");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedGenderOption, setSelectedGenderOption] = useState(
    currentUser?.Gender || GenderData[0]
  );

  const handleDobChange = (e) => {
    // Allow only numbers, "/", and "-" in the dob input
    const limitdobValue = e.target.value.replace(/[^0-9/-]/g, "");
    setDob(limitdobValue);
  };

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

  const [previewImage, setPreviewImage] = useState(null);
  const [previewheaderImage, setPreviewheaderImage] = useState(null);
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
    console.log("I have updated my info");

    try {
      const profileImageUrl = await uploadProfile();
      const headerImageUrl = await uploadHeaderImage();

      const response = await axios.put(
        `/api/users/${currentUser?._id}`,
        {
          Fullname: fullname,
          username: username,
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
      dispatch(loginSuccess(response.data))
      console.log("response:", response.data);
    } catch (error) {
      alert(error.message || "An error occurred while updating profile.");
    }
    // }
  };

  return (
    <aside
      className={`${
        editDetails ? "MoreInfoWrapper active" : "MoreInfoWrapper"
      }`}
    >
      <form
        onSubmit={handleUpdateProfile}
        className="additionalInfo-content-container"
      >
        <nav>
          <button onClick={closeEditInfo}>
            <BiArrowBack className="closeForm" />
          </button>
          <div className="editDetails">
            <p>Edit Details</p>
          </div>
          <button className="save-btn" type="submit">
            Save
          </button>
        </nav>
        <div className="details-body ">
          <div className="change-header-profile-image">
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <div className="change-header-image">
                {previewheaderImage ? (
                  <img src={previewheaderImage} alt="previewImage" />
                ) : (
                  <img src={defaultimage} alt="defaultimage" />
                )}
                <label className="upload-button">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={SelectProfileHeaderImage}
                    hidden
                  />
                  <AiOutlineCamera className="uploader-icon" />
                </label>
              </div>
            </div>
            {previewheaderImage && (
              <PPHI
                previewheaderImage={previewheaderImage}
                setPreviewheaderImage={setPreviewheaderImage}
                apply={SelectProfileHeaderImage}
              />
            )}

            <div className="change-profile-image">
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                {previewImage ? (
                  <img src={previewImage} alt="previewImage" />
                ) : (
                  <img src={defaultimage} alt="defaultimage" />
                )}
                <label className="upload-button">
                  <input
                    type="file"
                    accept="image/*"
                    id="previewImageInput"
                    onChange={SelectProfileImage}
                    hidden
                  />

                  <AiOutlineCamera className="uploader-icon" />
                </label>
              </div>
            </div>
            {previewImage && (
              <PPI
                previewImage={previewImage}
                setPreviewImage={setPreviewImage}
              />
            )}
          </div>
          <div className="form">
            <div className="input-container">
              <input
                type="text"
                placeholder="Fullname"
                name="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
            <div className="input-container">
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-container">
              <input
                type="text"
                placeholder="MM/DD/YYYY or MM-DD-YYY"
                name="date of birth"
                value={dob}
                onChange={handleDobChange}
              />
            </div>
            <div className="input-container">
              <input
                type="text"
                placeholder="(+234) 91 611 7011"
                name="number"
                value={phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            {/* <div className="input-container"> */}

            <InputSelector
              className="inputselector"
              Data={GenderData}
              value={selectedGenderOption}
              onChange={setSelectedGenderOption}
              inputClass={inputClass}
              dropdownClass={dropdownClass}
              listClass={listClass}
            />
            {/* </div> */}
            <div className="input-container">
              <input
                type="text"
                placeholder="Home City"
                name="HomeCity"
                value={homeCity}
                onChange={(e) => setHomeCity(e.target.value)}
              />
            </div>
            <div className="input-container">
              <input
                type="text"
                placeholder="Current City"
                name="CurrentCity"
                value={currentCity}
                onChange={(e) => setCurrentCity(e.target.value)}
              />
            </div>
            <div className="input-container">
              <input
                type="text"
                placeholder="Workplace"
                name="Workplace"
                value={Workplace}
                onChange={(e) => setWorkplace(e.target.value)}
              />
            </div>
            <div className="input-container">
              <input
                type="text"
                placeholder="School"
                name="School"
                value={School}
                onChange={(e) => setSchool(e.target.value)}
              />
            </div>
          </div>
        </div>
      </form>
    </aside>
  );
};

export default ProfileInfoForm;
