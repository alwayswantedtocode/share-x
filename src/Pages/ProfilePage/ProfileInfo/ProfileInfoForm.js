import React, { useState } from "react";
import { useGlobalContext } from "../../../ContextApi/GlobalContext";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineCamera } from "react-icons/ai";
import PPI from "./PPI";
import PPHI from "./PPHI";
import defaultimage from "../../../Assets/istockphoto-1409329028-612x612.jpg";

const ProfileInfoForm = () => {
  const { closeEditInfo, editDetails } = useGlobalContext();

  const [infoForm, setInforForm] = useState({
    username: "",
    location: "",
    workplace: "",
    dateofbirth: "",
    number: "",
    gender: "select gender",
  });

  const handleInfoFormChange = (e) => {
    const { name, value } = e.target;
    setInforForm((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  //Image functions
  const [previewImage, setPreviewImage] = useState(null);
  const [previewheaderImage, setPreviewheaderImage] = useState(null);
  const [iamge, setImage] = useState(null);

  //   const handleImageUpload = (e) => {
  //     const file = e.target.files[0];
  //     if (file && reviewImage) {
  //       const reader = new FileReader();
  //       reader.onload = (event) => {
  //         setPreviewImage(event.target.result);
  //       };
  //       reader.readAsDataURL(file);
  //     } else if (file && reviewheaderImage) {
  //          const reader = new FileReader();
  //          reader.onload = (event) => {
  //            setreviewheaderImage(event.target.result);
  //          };
  //     }
  //   };

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

  // Handle Preview Image for both profile and header image
  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();

  //   reader.onload = (event) => {
  //     const isPreviewImageInput = e.target.id === "previewImageInput"; // Assuming you have input IDs
  //     if (isPreviewImageInput) {
  //       setPreviewImage(event.target.result);
  //     } else {
  //       setPreviewheaderImage(event.target.result);
  //     }
  //   };

  //   reader.readAsDataURL(file);
  // };

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
          <button className="save-btn">Save</button>
        </nav>
        <div className="details-body">
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
          <form className="form">
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
                placeholder="Date of Birth"
                name="date of birth"
                value={infoForm.dateofbirth}
                onChange={handleInfoFormChange}
              />
            </div>
            <div className="input-container">
              <input
                type="text"
                placeholder="Number"
                name="number"
                value={infoForm.number}
                onChange={handleInfoFormChange}
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
          </form>
        </div>
      </div>
    </aside>
  );
};

export default ProfileInfoForm;
