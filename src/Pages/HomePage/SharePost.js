import { useAuthenticationContext } from "../../ContextApi/AuthenticationContext";
import "./home.scss";
import { FcGallery, FcVideoCall } from "react-icons/fc";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoMdPricetag } from "react-icons/io";
import { HiLocationMarker } from "react-icons/hi";

const SharePost = () => {
  const { currentUser } = useAuthenticationContext();
  return (
    <div className="sharePost">
      <div className="sharePostContainer">
        <div className="textarea">
          <div className="image">
            <img src={currentUser.profilePicture} alt="" />
          </div>

          <input placeholder="Share your experience" />
        </div>
        <hr />
        <div className="functionarea">
          <div className="postOptions">
            <div className="postOption">
              <FcVideoCall className="optionIcon" />
              <span style={{ color: "#696969" }}>Live Video</span>
            </div>
            <div className="postOption">
              <FcGallery className="optionIcon" />
              <span style={{ color: "#696969" }}>Photo/Video</span>
            </div>
            <div className="postOption">
              <MdOutlineEmojiEmotions className="optionIcon" />
              <span style={{ color: "#696969" }}>Reaction/Emoji</span>
            </div>
            {/* <div className="postOption">
              <IoMdPricetag className="tag" />
              <span className="Tag">Tag</span>
            </div>
            <div className="postOption">
              <HiLocationMarker className="location" />
              <span className="Location">Location</span>
            </div> */}
          </div>
          {/* <button className="SendButton">Send</button> */}
        </div>
      </div>
    </div>
  );
};
export default SharePost;
