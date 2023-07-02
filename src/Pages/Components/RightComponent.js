import React from "react";
import data from "./data";

const RightComponent = () => {
  const suggest = [
    {
      id: 1,
      name: "Ada Uzor-Kalu",
      imageUrl:
        "https://images.unsplash.com/photo-1520943219761-6ca840e2e585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQwfHxibGFjayUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 2,
      name: "Ifenkili Adichie",
      imageUrl:
        "https://images.unsplash.com/photo-1583994010661-738aa9e96eb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ4fHxibGFjayUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
  ];

  const latestFilter = data.filter((items) => items.id < 5);
  const onlineFilter = data.filter((items) => items.id < 8);
  return (
    <section className="RightComponent">
      <div className="container">
        <div className="items">
          <span>Suggested For You</span>
          {suggest.map((suggested) => {
            const { id, name, imageUrl } = suggested;
            return (
              <div className="user" key={id}>
                <div className="suggestedUserInfo">
                  <div className="info">
                    <div className="image">
                      <img src={imageUrl} alt="" />
                    </div>

                    <span>{name}</span>
                  </div>

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
                  <div className="image">
                    <img src={imageUrl} alt="" />
                  </div>

                  <p>
                    <span>{name}</span> changed their cover picture
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
                  <img src={imageUrl} alt="" />
                  <div className="online" />
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