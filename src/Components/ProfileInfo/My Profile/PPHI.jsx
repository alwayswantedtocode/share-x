import React from "react";
import "../Preview.scss";
import { BiArrowBack } from "react-icons/bi";

const PPHI = ({
  previewheaderImage,
  setPreviewheaderImage,
  SelectProfileHeaderImage,
}) => {
  const handleClosePreview = () => {
    setPreviewheaderImage(null);
  };

   const applyPreview = () => {
    
   };

  return (
    <div className="preview-Wrapper">
      <nav>
        <button onClick={handleClosePreview}>
          <BiArrowBack className="closeForm" />
        </button>
        <div className="editDetails">
          <p>Preview Image</p>
        </div>
        <button className="save-btn" onClick={applyPreview}>
          Apply
        </button>
      </nav>
      <div className="Preview-Image-section">
        <img src={previewheaderImage} alt="preview" />
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default PPHI;
