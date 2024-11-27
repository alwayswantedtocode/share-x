// import "../../Pages/Profile Page/profile.scss";
import React, { useRef, useState, useLayoutEffect } from "react";
import axios from "../../API/axios";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../Reduxtoolkit/authSlice";
import { useGlobalContext } from "../../ContextApi/GlobalContext";

const MIN_TEXTAREA_HEIGHT = 95;

const EditBio = () => {
  const { handleCancelEditbio, setShoweditbio, openEditInfo } =
    useGlobalContext();

  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const textareaRef = useRef(null);

  const [editBio, setEditBio] = useState(currentUser?.Bio);

  //textarea auto adjust
  const [value, setValue] = useState("");

  useLayoutEffect(() => {
    textareaRef.current.style.height = "inherit";

    textareaRef.current.style.height = `${Math.max(
      textareaRef.current.scrollHeight,
      MIN_TEXTAREA_HEIGHT
    )}px`;
  }, [value]);


  const submitBio = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/api/users/${currentUser?._id}`,
        { Bio: editBio },
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
          name="editBio"
          id="editBio"
          value={editBio}
          onChange={(e) => setEditBio(e.target.value)}
          style={{
            minHeight: MIN_TEXTAREA_HEIGHT,
            resize: "none",
          }}
          ref={textareaRef}
        />
        <div className="cancel-save-buttons">
          <button type="button" onClick={handleCancelEditbio}>
            Cancel
          </button>
          <button onClick={submitBio}>Save</button>
        </div>
      </form>
      <div className="Edit-details-buttons">
        <button onClick={openEditInfo}>Edit Details</button>
      </div>
    </div>
  );
};

export default EditBio;
