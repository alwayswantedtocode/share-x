import React from "react";
import defaultimage from "../../../Assets/istockphoto-1409329028-612x612.jpg";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineCamera } from "react-icons/ai";
import { useGlobalContext } from "../../../ContextApi/GlobalContext";
import InputSelector from "../../ResuableSelectInputs/InputSelector";
import useEditProfile from "../../../Hooks/useEditProfile";

const ProfileInfoForm = () => {
  const {
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
    setSelectedGenderOption,
    handleDobChange,
    handleInputChange,
    previewImage,
    previewheaderImage,
    SelectProfileImage,
    SelectProfileHeaderImage,
    handleUpdateProfile,
  } = useEditProfile();
  const { editDetails, closeEditInfo, isDarkMode } = useGlobalContext();

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
          <button type="reset" value="Reset" onClick={closeEditInfo}>
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
                name="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
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

            <InputSelector
              className="inputselector"
              Data={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
                { label: "Non-Binary", value: "Non-Binary" },
                { label: "Don't specify", value: "Don't specify" },
              ]}
              value={selectedGenderOption}
              onChange={(e) => setSelectedGenderOption(e.target.value)}
              inputClass={inputClass}
              dropdownClass={dropdownClass}
              listClass={listClass}
            />

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
