import React from "react";
import "../profile.scss";

const Profile = ({ shareXUsers }) => {
  return (
    <section className="InfoComponent">
      <div className="container">
        <div className="items">
          <span className="intro">Intro</span>

          <div className="userInfo">
            <div className="displayUserinfo">
              <div className="info">
                <div className="bio">
                  <p>{shareXUsers.Bio}</p>
                </div>

                <div className="infodetailsContainer">
                  <div className="infoDetails">
                    <span>Location:</span>
                    <p>{shareXUsers.CurrentCity}</p>
                  </div>
                  <div className="infoDetails">
                    <span>Work Place:</span>
                    <p>{shareXUsers.Workplace}</p>
                  </div>
                  <div className="infoDetails">
                    <span>School:</span>
                    <p></p>
                  </div>
                  <div className="infoDetails">
                    <span>Birthday:</span>
                    <p>{shareXUsers.Birthday}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Latest activities */}
        <div className="items">
          <span>Lastest Activities</span>

          <div className="user">
            <div className="userInfo">
              <div className="image">
                <img src="" alt="" />
              </div>

              <p>
                <span>name</span> changed their cover picture
              </p>

              <div className="time">
                <span>1 min ago</span>
              </div>
            </div>
          </div>
        </div>
        {/* Friends online */}
        <div className="items">
          <span>Online Friends</span>

          <div className="user">
            <div className="userInfo">
              <img src="" alt="" />
              <div className="online" />
              <span>name</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
