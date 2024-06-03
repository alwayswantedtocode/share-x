import React from "react";
import "../../Pages/Profile Page/profile.scss";
import {useSelector} from "react-redux"

const Profile = () => {
  const { users } = useSelector((state) => state.Users);
  return (
    <section className="InfoComponent">
      <div className="container">
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

        {/* Latest activities */}
        {/* <div className="items">
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
        </div> */}
        {/* Friends online */}
        {/* <div className="items">
          <span>Online Friends</span>

          <div className="user">
            <div className="userInfo">
              <img src="" alt="" />
              <div className="online" />
              <span>name</span>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Profile;
