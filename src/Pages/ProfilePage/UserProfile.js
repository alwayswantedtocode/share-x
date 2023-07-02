import "./profile.scss";
import { MdOutlineModeEditOutline, MdOutlineMoreVert } from "react-icons/md";
import FriendsPosts from "./FriendsPosts";

const UserProfile = () => {
  return (
    <div className="profile">
      <div className="images">
        <img
          className="profileWall"
          src="https://images.unsplash.com/photo-1512849934327-1cf5bf8a5ccc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODZ8fGJsYWNrJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
        <img
          className="profilePicture"
          src="https://images.unsplash.com/photo-1512849934327-1cf5bf8a5ccc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODZ8fGJsYWNrJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
      </div>
      <div className="profileContainer">
        <div className="userinfo">
          <div className="follower-following">
            <p>25k Follower</p>

            <p>10k Following</p>
          </div>
          <div className="center">
            <span>Okoh Eseose</span>
          </div>
          <div className="button">
            <button className="follow">follow</button>
            <button className="message">Message</button>
          </div>
          {/* <button className="edit">
            <MdOutlineModeEditOutline />
          </button>{" "}
          <button className="more">
            <MdOutlineMoreVert />
          </button> */}
        </div>
        <FriendsPosts />
      </div>
    </div>
  );
};

export default UserProfile;
