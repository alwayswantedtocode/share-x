import React from "react";
import { Link } from "react-router-dom";

const SearchAside = ({ id, fullname, username, image }) => {
  return (
    <Link to={`/profilepage/${username}`} key={id}>
      <div className="result-content">
        <img src={image} alt={`${fullname} profileimage`} />
        <div className="details">
          <p>{fullname}</p>
          <p>{username}</p>
        </div>
      </div>
    </Link>
  );
};

export default SearchAside;
