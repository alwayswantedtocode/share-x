import "./home.scss";
import { Link } from "react-router-dom";
import { MdOutlineMoreHoriz, MdOutlineIosShare } from "react-icons/md";
import { BsFillHeartFill } from "react-icons/bs";
import { BiMessageAlt } from "react-icons/bi";

// import { BsFillHeartFill } from "react-icons/bs";

const Post = ({ feed }) => {
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={feed.profilePicture} alt="" />
            <div className="details">
              <Link
                to={`/profile/${feed.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{feed.name}</span>
              </Link>
              <span className="date">1 min ago</span>
            </div>
          </div>
          <MdOutlineMoreHoriz />
        </div>
        <div className="content">
            <p>{feed.description}</p>
            <img src={feed.image} alt="" />
        </div>
        <div className="info"></div>
      </div>
    </div>
  );
};

export default Post;
