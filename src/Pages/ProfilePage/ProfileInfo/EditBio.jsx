import React, { useRef, useState, useLayoutEffect } from "react";
import "../profile.scss";

const MIN_TEXTAREA_HEIGHT = 95;
const EditBio = ({ setShoweditbio, showEditbio }) => {
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

  const handleCancelBtn = (e) => {
    e.preventDefault();
    
      setShoweditbio(false);
  
    console.log("Cancel Button works");
  };

  const submitBio = (e) => {
    e.preventDefault();
    setShoweditbio(false);
  };
  return (
    <div className="editbioTextarea">
      <span>Intro</span>

      <form className="bioContainer">
        <textarea
          className="biotextarea"
          name="textarea"
          id=""
          style={{
            minHeight: MIN_TEXTAREA_HEIGHT,
            resize: "none",
          }}
          ref={setRefs}
        />
        <div className="cancel-save-buttons">
          <button type="button" onClick={handleCancelBtn}>
            Cancel
          </button>
          <button onClick={submitBio}>Save</button>
        </div>
      </form>
      <div className="Edit-details-buttons">
        <button>Edit Details</button>
      </div>
    </div>
  );
};

export default EditBio;
