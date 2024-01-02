import { useAuthenticationContext } from "../../ContextApi/AuthenticationContext";
import { BsFillPlusCircleFill } from "react-icons/bs";
import "./home.scss";

const ShareStories = () => {
  const { currentUser, user } = useAuthenticationContext();

  const storiesData = [
    {
      id: 1,
      name: "Tammy ",
      image:
        "https://images.unsplash.com/photo-1686666281062-ca0025654939?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8eGpQUjRobGtCR0F8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 2,
      name: "Jake",
      image:
        "https://images.unsplash.com/photo-1673091825430-ad6cede475b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEwMnxfaGItZGw0US00VXx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 3,
      name: "Fola",
      image:
        "https://images.unsplash.com/photo-1621591422693-48a15c302114?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEwfEpwZzZLaWRsLUhrfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 4,
      name: "Jade",
      image:
        "https://images.unsplash.com/photo-1579549441978-9401095a2a3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIzfHhIeFlUTUhMZ09jfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    },
  ];
  return (
    <div className="stories">
      <div className="story">
        <img
          src="https://images.unsplash.com/photo-1515943492249-2d5d5d944085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ2fHxibGFjayUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
        <span>{user.displayName}</span>
        <button>+</button>
      </div>
      {storiesData.map((story) => {
        const { id, name, image } = story;
        return (
          <div className="story" key={id}>
            <img src={image} alt="" />
            <span>{name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ShareStories;
