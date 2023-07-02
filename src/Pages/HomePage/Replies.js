import "./home.scss";
import { useAuthenticationContext } from "../../ContextApi/AuthenticationContext";
import { FiSend } from "react-icons/fi";

const Replies = () => {
  const { currentUser } = useAuthenticationContext();
  const replies = [
    {
      id: 1,
      name: "Laura",
      userId: 1,
      profilePicture:
        "https://images.unsplash.com/photo-1492462543947-040389c4a66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGJsYWNrJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia assumenda necessitatibus dolores nisi velit sapiente.",
      image:
        "https://images.unsplash.com/photo-1589483232748-515c025575bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80",
    },
    {
      id: 2,
      name: "Ebehi",
      userId: 2,
      profilePicture:
        "https://plus.unsplash.com/premium_photo-1661349615132-31544f9f0467?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGJsYWNrJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia assumenda necessitatibus dolores nisi velit sapiente. ",
    },
  ];
  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePicture} alt="" />

        <input type="text" placeholder="write a comment" />
        <button>
         Reply
        </button>
      </div>
      {replies.map((reply) => {
        const { id, profilePicture, name, description } = reply;
        return (
          <div className="comment" key={id}>
            <img src={profilePicture} alt="" />
            <div className="info">
              <span className="name">{name}</span>
              <div className="text">
                <p>{description}</p>
              </div>
              <div className="impressions">
                <p>Like</p>
                <p>Reply</p>
              </div>
            </div>
            <span className="time">1 hour ago</span>
          </div>
        );
      })}
    </div>
  );
};

export default Replies;
