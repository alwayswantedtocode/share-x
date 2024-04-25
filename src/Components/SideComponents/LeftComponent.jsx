import "./component.scss";
import IconData from "./data";
import Friends from "../../Assets/Friends.svg";
import Groups from "../../Assets/Groups.svg";
import Market from "../../Assets/Market.svg";
// import Watch from "../../Assets/Watch.svg";
import Memories from "../../Assets/Memories.jpg";
import Event from "../../Assets/Event.svg";
import Gaming from "../../Assets/Gaming.svg";
import Gallery from "../../Assets/Gallery.svg";
import Videos from "../../Assets/Videos.svg";
import Tutorials from "../../Assets/Tutorials.svg";
import Courses from "../../Assets/Courses.svg";
import Funds from "../../Assets/Funds.svg";
import { useAuthenticationContext } from "../../ContextApi/AuthenticationContext";
import UserIcon from "../../Assets/profile-gender-neutral.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const LeftComponent = () => {
  const { CurrentUser, user, AuthUser} = useAuthenticationContext();
const {currentUser} = useSelector((state)=>state.auth)
  return (
    <article className="LeftComponent">
      <div className="container">
        <div className="menu">
          <Link
            to={`/profilepage/${currentUser?.username}`}
            style={{ textDecoration: "none" }}
          >
            <div className="user">
              <div className="image">
                <img src={currentUser?.photoURL || UserIcon} alt="userIcon" />
              </div>
              <span>{currentUser?.username}</span>
            </div>
          </Link>

          <div className="MenuItems">
            <img src={Friends} alt="Friends" />
            <span>Friends</span>
          </div>
          <div className="MenuItems">
            <img src={Groups} alt="Groups" />
            <span>Community</span>
          </div>
          <div className="MenuItems">
            <img src={Market} alt="Market" />
            <span>Market</span>
          </div>
          {/* <div className="MenuItems">
            <img src={Watch} alt="Watch" />
            <span>Watch</span>
          </div> */}
          <div className="MenuItems">
            <img src={Memories} alt="Memories" />
            <span>Memories</span>
          </div>
        </div>{" "}
        <hr />
        <div className="menu">
          <span>Your Shortcuts</span>
          <div className="MenuItems">
            <img src={Event} alt="Event" />
            <span>Event</span>
          </div>
          <div className="MenuItems">
            <img src={Gaming} alt="Gaming" />
            <span>Gaming</span>
          </div>
          <div className="MenuItems">
            <img src={Gallery} alt="Gallery" />
            <span>Gallery</span>
          </div>
          <div className="MenuItems">
            <img src={Videos} alt="Videos" />
            <span>Videos</span>
          </div>{" "}
          {/* <div className="MenuItems">
            <img src={Message} alt="Message" />
            <span>Message</span>
          </div> */}
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <div className="MenuItems">
            <img src={Tutorials} alt="Tutorials" />
            <span>Tutorials</span>
          </div>
          <div className="MenuItems">
            <img src={Courses} alt="Courses" />
            <span>Courses</span>
          </div>
          <div className="MenuItems">
            <img src={Funds} alt="Funds" />
            <span>Funds</span>
          </div>
        </div>
        <hr />
      </div>
      {/* <p>&copy; 2023 ShowRoom. All rights reserved.</p> */}
    </article>
  );
};

export default LeftComponent;
