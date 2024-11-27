import React from "react";
import "./Notification.scss";
import Profileimage from "../../Assets/profile-gender-neutral.jpg";
import { useSelector } from "react-redux";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { useDropdownContext } from "../../ContextApi/DropdownContext";

TimeAgo.addLocale(en);

const NotificationAside = () => {
  const { notificationRef } = useDropdownContext();
  const { currentUser } = useSelector((state) => state.auth);
  const Notification = currentUser?.notifications || [];
  // console.log(Notification);

  return (
    <article className="NotificationAside" ref={notificationRef}>
      <div className="notification">
        <div className="container">
          <span className="heading">
            <h1>Notification</h1>
          </span>

          {/* <div className="container"> */}
          <div className="items">
            <h4>Lastest</h4>
            {Notification.map((notification) => {
              const timeAgo = new TimeAgo("en-US");
              const formattedDate = notification.createdAt
                ? timeAgo.format(new Date(notification.createdAt))
                : "Invalid Date";
              return (
                <div className="user" key={notification._id}>
                  <div className="userInfo">
                    <div className="image">
                      <img
                        src={notification.profilePicture || Profileimage}
                        alt=""
                      />
                    </div>
                    <div className="notice">
                      <p>{notification.message}</p>

                      <div className="time">
                        <span>{formattedDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* </div> */}
    </article>
  );
};

export default NotificationAside;
