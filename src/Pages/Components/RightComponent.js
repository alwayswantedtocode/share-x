import React from "react";
import data from "./data";

const RightComponent = () => {
  const suggestionFilter = data.filter((items) => items.id < 3);
  const latestFilter = data.filter((items) => items.id < 5);
  const onlineFilter = data.filter((items) => items.id < 7);
  return (
    <section className="RightComponent">
      <div className="container">
        <div className="items">
          <span>Suggested For You</span>
          {suggestionFilter.map((suggested) => {
            const { id, name, imageUrl } = suggested;
            return (
              <div className="user" key={id}>
                <div className="userInfo">
                  <img src={imageUrl} alt={name + " profile picture"} />
                  <span>{name}</span>
                  <div className="buttons">
                    <button>Follow</button>
                    <button>Dismiss</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Latest activities */}
        <div className="items">
          <span>Lastest Activities</span>
          {latestFilter.map((latest) => {
            const { id, name, imageUrl } = latest;
            return (
              <div className="user" key={id}>
                <div className="userInfo">
                  <img src={imageUrl} alt={name + " profile picture"} />
                  <p>
                    <span>{name}</span>  changed their cover picture
                  </p>

                  <div className="time">
                    <span>1 min ago</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Friends online */}
        <div className="items">
          <span>Online Friends</span>
          {onlineFilter.map((online) => {
            const { id, name, imageUrl } = online;
            return (
              <div className="user" key={id}>
                <div className="userInfo">
                  <img src={imageUrl} alt={name + " profile picture"} />
                  <div className="online"/>
                  <span>{name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RightComponent;

{
  /* <div className="user">
            <div className="userInfo">
              <img
                src="https://images.unsplash.com/photo-1686287118358-2ac201c8cb0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80"
                alt="Samuel-David profile picture"
              />
              <span>Samuel-David</span>
              <div className="buttons">
                <button>Follow</button>
                <button>Dismiss</button>
              </div>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.unsplash.com/photo-1686287118358-2ac201c8cb0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80"
                alt="Samuel-David profile picture"
              />
              <span>Samuel-David</span>
              <div className="buttons">
                <button>Follow</button>
                <button>Dismiss</button>
              </div>
            </div>
          </div> */
}
