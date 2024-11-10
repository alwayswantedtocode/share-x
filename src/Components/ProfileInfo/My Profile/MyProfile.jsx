import React from "react";
import { useState } from "react";
import EditBio from "../EditBio";
import "../../../Pages/Profile Page/profile.scss";
import { useGlobalContext } from "../../../ContextApi/GlobalContext";
import { useSelector } from "react-redux";

const UserProfile = ({ username }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.Users);
  const { openEditInfo } = useGlobalContext();
  const [showEditbio, setShoweditbio] = useState(false);

  const handleEditbio = () => {
    setShoweditbio(true);
  };

  return (
    <section className="InfoComponent">
      <div className="container">
        {username === currentUser?.username ? (
          <div>
            {!showEditbio ? (
              <div className="items">
                <span className="intro">Profile</span>

                <div className="userInfo">
                  <div className="displayUserinfo">
                    <div className="info">
                      <div className="bio">
                        <p>{currentUser?.Bio}</p>
                      </div>

                      <div className="infodetailsContainer">
                        <div className="infoDetails">
                          <span>Fullname:</span>
                          <p>{currentUser?.Fullname}</p>
                        </div>
                        <div className="infoDetails">
                          <span>Home Town:</span>
                          <p>{currentUser?.From}</p>
                        </div>
                        <div className="infoDetails">
                          <span>Birthday:</span>
                          <p>{currentUser?.Birthday}</p>
                        </div>
                        <div className="infoDetails">
                          <span>Current City:</span>
                          <p>{currentUser?.CurrentCity}</p>
                        </div>
                        <div className="infoDetails">
                          <span>Work Place:</span>
                          <p>{currentUser?.Workplace}</p>
                        </div>
                        <div className="infoDetails">
                          <span>School:</span>
                          <p>{currentUser?.School}</p>
                        </div>
                      </div>
                    </div>
                    {username === currentUser?.username && (
                      <div className="buttons">
                        <button onClick={handleEditbio}>Edit Bio</button>
                        <button onClick={openEditInfo}>Edit Details</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <EditBio
                showEditbio={showEditbio}
                setShoweditbio={setShoweditbio}
              />
            )}
          </div>
        ) : (
          <div className="items">
            <span className="intro">Profile</span>

            <div className="userInfo">
              <div className="displayUserinfo">
                <div className="info">
                  <div className="bio">
                    <p>{users?.Bio}</p>
                  </div>

                  <div className="infodetailsContainer">
                    <div className="infoDetails">
                      <span>Fullname:</span>
                      <p>{users?.Fullname}</p>
                    </div>
                    <div className="infoDetails">
                      <span>Home Town:</span>
                      <p>{users?.From}</p>
                    </div>
                    <div className="infoDetails">
                      <span>Birthday:</span>
                      <p>{users?.Birthday}</p>
                    </div>
                    <div className="infoDetails">
                      <span>Current City:</span>
                      <p>{users?.CurrentCity}</p>
                    </div>
                    <div className="infoDetails">
                      <span>Work Place:</span>
                      <p>{users?.Workplace}</p>
                    </div>
                    <div className="infoDetails">
                      <span>School:</span>
                      <p>{users?.School}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserProfile;
