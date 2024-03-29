import React from "react";
import { useState } from "react";
import EditBio from "../EditBio";
import "../../profile.scss";
import { useGlobalContext } from "../../../../ContextApi/GlobalContext";

const UserProfile = ({ shareXUsers }) => {
  const { openEditInfo } = useGlobalContext();
  const [showEditbio, setShoweditbio] = useState(false);

  const handleEditbio = () => {
    setShoweditbio(true);
  };

  return (
    <section className="InfoComponent">
      <div className="container">
        {!showEditbio ? (
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
                      <span>Current Fullname:</span>
                      <p>{shareXUsers.fullname}</p>
                    </div>
                    <div className="infoDetails">
                      <span>Current City:</span>
                      <p>{shareXUsers.CurrentCity}</p>
                    </div>
                    <div className="infoDetails">
                      <span>Work Place:</span>
                      <p>{shareXUsers.Workplace}</p>
                    </div>
                    <div className="infoDetails">
                      <span>School:</span>
                      <p>{shareXUsers.School}</p>
                    </div>
                    <div className="infoDetails">
                      <span>Birthday:</span>
                      <p>{shareXUsers.Birthday}</p>
                    </div>
                  </div>
                </div>

                <div className="buttons">
                  <button onClick={handleEditbio}>Edit Bio</button>
                  <button onClick={openEditInfo}>Edit Details</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <EditBio showEditbio={showEditbio} setShoweditbio={setShoweditbio} />
        )}
        {/* <EditBio showEditbio={showEditbio} setShoweditbio={setShoweditbio} /> */}
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

export default UserProfile;
