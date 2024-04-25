import React, { useRef, useState, useLayoutEffect } from "react";
import "../../Pages/Profile Page/profile.scss";
import axios from "../../API/axios";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../Reduxtoolkit/authSlice"
const MIN_TEXTAREA_HEIGHT = 95;
const EditBio = ({ setShoweditbio, showEditbio }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const textareaRef = useRef(null);
  const text = useRef("");

  const setRefs = (element) => {
    text.current = element;
    textareaRef.current = element;
  };

  //textarea auto adjust
  const [value, setValue] = useState("");

  useLayoutEffect(() => {
    textareaRef.current.style.height = "inherit";

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

  const submitBio = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/api/users/${currentUser?._id}`,
        { Bio: text.current.value },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      dispatch(loginSuccess(response.data));

      setShoweditbio(false);
    } catch (error) {
      alert(error.message);
    }
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
