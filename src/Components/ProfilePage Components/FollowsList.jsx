import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useGlobalContext } from "../../ContextApi/GlobalContext";
import { useSelector } from "react-redux";
import axios from "../../API/axios";
import { useNavigate } from "react-router-dom";

const FollowsList = () => {
  const data = ["following", "follower"];
  const { showfollowlist, closeFollowsList } = useGlobalContext();
  const { users } = useSelector((state) => state.Users);
  const [activetab, setActivetab] = useState("following");
  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
        try {
          // get a user followers data
          const getFollowers = await axios.get(
            `/api/users/followers/${users?._id}`
          );
          // get a user followings data
          const getFollowings = await axios.get(
            `/api/users/followings/${users?._id}`
          );

          if (activetab === "follower") {
            setFollowers(getFollowers.data);
          } else if (activetab === "following") {
            setFollowings(getFollowings.data);
          }
        } catch (error) {
        console.error(`Error fetching ${activetab}`);
      }
    };
    fetchData(activetab);
  }, [activetab, users?._id]);

  const rendertab = (tabs) => {
    return (
      tabs.length > 0 &&
      tabs.map((tab, index) => (
        <div
          key={index}
          className="content"
          onClick={() => {
            navigate(`/profilepage/${tab.username}`);
            closeFollowsList();
          }}
        >
          <img src={tab.profilePicture} alt={`${tab.Fullname} profile`} />
          <div className="details">
            <span className="name">{tab.Fullname}</span>
            <span className="name">{tab.username}</span>
          </div>
        </div>
      ))
    );
  };

  return (
    <aside
      className={`${
        showfollowlist ? "FollowListWrapper active" : "FollowListWrapper"
      }`}
    >
      <div className="content-container">
        <nav>
          <div className="top">
            <button onClick={closeFollowsList}>
              <BiArrowBack className="closeForm" />
            </button>
            <div className="editDetails">
              <p>{users?.username}</p>
            </div>
          </div>
          <div className="menu">
            {data.map((tab) => (
              <div
                key={tab}
                className={`tab ${activetab === tab ? "active" : ""}`}
                onClick={() => setActivetab(tab)}
              >
                {tab}
              </div>
            ))}
          </div>
        </nav>
        {/* content */}
        <div className="contentwrapper">
          {activetab === "following"
            ? rendertab(followings)
            : activetab === "follower"
            ? rendertab(followers)
            : ""}

          {/* {activetab === "follower" &&
            followers?.map((list, index) => {

              return (
                <div key={index} className="content">
                  <img
                    src={list.profilePicture}
                    alt={`${list.Fullname} profile`}
                  />
                  <div className="details">
                    <span className="name">{list.Fullname}</span>
                    <span className="name">{list.username}</span>
                  </div>
                </div>
              );
            })} */}
        </div>
      </div>
    </aside>
  );
};

export default FollowsList;
