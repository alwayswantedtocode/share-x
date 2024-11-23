import React, { useState } from 'react'

const DeletePost = ({ isDeleteopen, setIsDeleteopen, handleDeletePost }) => {

  const handleCancelDelete = (e) => {
    setIsDeleteopen(false);
  };
  return (
    <aside
      className={`${
        isDeleteopen ? "delete-post-wrapper active" : "delete-post-wrapper"
      }`}
    >
      <div
        className="Delete-post-body"
        style={{ display: "flex", gap: "10px", alignItems: "center" }}
      >
        <div className="btns">
          <button className="SendButton" onClick={handleDeletePost}>
           Delete
          </button>
          <button
            type="button"
            className="SendButton"
            onClick={handleCancelDelete}
          >
            Cancel
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DeletePost