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
// import Message from "../../Assets/Message.svg";
import Tutorials from "../../Assets/Tutorials.svg";
import Courses from "../../Assets/Courses.svg";
import Funds from "../../Assets/Funds.svg";

const LeftComponent = () => {
  return (
    <section className="LeftComponent">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img
              src="https://images.unsplash.com/photo-1686287118358-2ac201c8cb0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80"
              alt="Samuel-David profile picture"
            />
            <span>Samuel-David</span>
          </div>

          <div className="MenuItems">
            <img src={Friends} alt="Friends" />
            <span>Friends</span>
          </div>
          <div className="MenuItems">
            <img src={Groups} alt="Groups" />
            <span>Groups</span>
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
        </div>
      </div>
    </section>
  );
};

export default LeftComponent;
