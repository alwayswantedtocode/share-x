import React, { useState } from "react";
import { useGlobalContext } from "../../../ContextApi/GlobalContext";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineCamera } from "react-icons/ai";
import PPI from "./PPI";
import PPHI from "./PPHI";
import defaultimage from "../../../Assets/istockphoto-1409329028-612x612.jpg";
import { useAuthenticationContext } from "../../../ContextApi/AuthenticationContext";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";

const ProfileInfoForm = () => {
  const { closeEditInfo, editDetails } = useGlobalContext();
  const { user } = useAuthenticationContext();

  const [infoForm, setInforForm] = useState({
    username: "",
    location: "",
    workplace: "",
    gender: "select gender",
  });
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleInfoFormChange = (e) => {
    const { name, value } = e.target;
    setInforForm((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

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

  //Image functions

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
  const [iamge, setImage] = useState(null);
  const storage =getStorage()

  const SelectProfileImage = (e) => {
    const file = e.target.files[0];
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
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewheaderImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };


 const handleImage = async () => {
   const fileType = metadata.contentType.includes(previewImage["type"]);
   if (!previewImage) return;
   if (fileType) {
     try {
       const storageRef = ref(storage, `images/${previewImage.name + v4()}`);
       const uploadTask = uploadBytesResumable(
         storageRef,
         previewImage,
         metadata.contentType
       );
       await uploadTask.on(
        
         (error) => {
           alert(error);
         },
         async () => {
           await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
             setImage(downloadURL);
           });
         }
       );
     } catch (err) {
      
       alert(err.message);
       console.log(err.message);
     }
   }
 };





  const handleUpdateProfile = (e) => {
    e.preventDefault();
  };

  return (
    <aside
      className={`${
        editDetails ? "MoreInfoWrapper active" : "MoreInfoWrapper"
      }`}
    >
      <div className="additionalInfo-content-container">
        <nav>
          <button onClick={closeEditInfo}>
            <BiArrowBack className="closeForm" />
          </button>
          <div className="editDetails">
            <p>Edit Details</p>
          </div>
          <button className="save-btn" type="submit" form="myForm">
            Save
          </button>
        </nav>
        <form
          className="details-body "
          id="myForm"
          onSubmit={handleUpdateProfile}
        >
          {" "}
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
                placeholder="username"
                name="username"
                value={infoForm.username}
                onChange={handleInfoFormChange}
              />
            </div>
            <div className="input-container">
              <input
                type="text"
                placeholder="Location"
                name="location"
                value={infoForm.location}
                onChange={handleInfoFormChange}
              />
            </div>
            <div className="input-container">
              <input
                type="text"
                placeholder="Workplace"
                name="workplace"
                value={infoForm.workplace}
                onChange={handleInfoFormChange}
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
            <div className="input-container">
              <select
                name="gender"
                value={infoForm.gender}
                onChange={handleInfoFormChange}
              >
                <option value="select gender" disabled>
                  Select Gender
                </option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Non-binary">Non-binary</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </aside>
  );
};

export default ProfileInfoForm;
