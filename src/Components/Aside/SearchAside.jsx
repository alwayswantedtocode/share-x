import React from "react";
import "./Search.scss";
import { Link} from "react-router-dom";


const SearchAside = ({ id, fullname, username }) => {
  
  return (
    <Link to={`/profilepage/${username}`} key={id}>
      <div className="result-content">
        <p>{fullname}</p>
        <p>{username}</p>
      </div>
    </Link>
  );
};

export default SearchAside;
