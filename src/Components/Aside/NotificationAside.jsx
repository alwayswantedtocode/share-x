import React, { useEffect, useState } from "react";
import "./Notification.scss";
import Profileimage from "../../Assets/profile-gender-neutral.jpg";
import { useDispatch, useSelector } from "react-redux";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { useDropdownContext } from "../../ContextApi/DropdownContext";
import axios from "../../API/axios";
import { setreadNotice, setUnreadNotice } from "../../Reduxtoolkit/authSlice";
import useHandleNotification from "../../Hooks/useHandleNotification";

TimeAgo.addLocale(en);

const NotificationAside = () => {
  const Data = ["Unread", "Read"];
  const { notificationRef } = useDropdownContext();
  const { currentUser, unreadNotice, readNotice } = useSelector(
    (state) => state.auth
  );
  const [activeTab, setActiveTab] = useState("Unread");
  const dispatch = useDispatch();
  const { markAsRead, markAllAsRead } = useHandleNotification(activeTab);

  //Fetch Notifications
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const unReadNotice = await axios.get(
          `/api/notifications/${currentUser._id}/unread`
        );

        const readNotice = await axios.get(
          `/api/notifications/${currentUser._id}/read`
        );
              
        const readNotification = readNotice.data;
        const unreadNotification = unReadNotice.data;
        if (activeTab === "Unread") {
          dispatch(setUnreadNotice(unreadNotification));
        } else if (activeTab === "Read") {
          dispatch(setreadNotice(readNotification));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchdata();
  }, [currentUser._id, activeTab, dispatch]);

  const renderNotificationTab = (tabs) => {
    return (
      tabs?.length > 0 &&
      tabs.map((tab, index) => {
        const timeAgo = new TimeAgo("en-US");
        const formattedDate = tab.createdAt
          ? timeAgo.format(new Date(tab.createdAt))
          : "Invalid Date";

        return (
          <div className="user" key={index}>
            <div className="userInfo">
              <div className="image">
                <img src={tab.profilePicture || Profileimage} alt="" />
              </div>
              <div className="notice" onClick={() => markAsRead(tab._id)}>
                <p>{tab.message}</p>

                <div className="time">
                  <span>{formattedDate}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })
    );
  };

  return (
    <article className="NotificationAside" ref={notificationRef}>
      <div className="notification">
        <div className="container">
          <div className="heading">
            <h2>Notification</h2>
          </div>
          <div className="mark-all-btn-wrapper">
            <button className="mark-all-btn" onClick={()=>markAllAsRead()}>
              Read all
            </button>
          </div>

          {/* <div className="container"> */}
          <div className="items">
            <nav>
              <div className="menu">
                {Data.map((data) => {
                  return (
                    <span
                      className={`tab ${activeTab === data ? "active" : ""}`}
                      key={data}
                      onClick={() => setActiveTab(data)}
                    >
                      {data}
                    </span>
                  );
                })}
              </div>
            </nav>
            {activeTab === "Unread"
              ? renderNotificationTab(unreadNotice)
              : activeTab === "Read"
              ? renderNotificationTab(readNotice)
              : ""}
          </div>
        </div>
      </div>
    </article>
  );
};

export default NotificationAside;
