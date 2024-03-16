import "./profile.scss";
import ProfileTimeLine from "./ProfileInfo/ProfileTimeLine";
import MyProfile from "./ProfileInfo/My Profile/MyProfile";
import UsersProfile from "./ProfileInfo/UsersProfile";
import ProfileInfoForm from "./ProfileInfo/My Profile/MyProfileForm";
import SharePost from "../HomePage/SharePost";
import { IoReload } from "react-icons/io5";
import CoverImage from "../../Assets/no-image.png";
import Profileimage from "../../Assets/profile-gender-neutral.jpg";
import { useReducer, useEffect, useState } from "react";

import { useAuthenticationContext } from "../../ContextApi/AuthenticationContext";

import { db } from "../Authentication/Firebase";
import { useParams } from "react-router-dom";

// import axios from "axios";
import axios from "../../API/axios"

import useReload from "../../Hooks/useReload";

const ProfileInfo = () => {
  const username = useParams().username;
  const { handleReload } = useReload();

  const { user, userData, AuthUser } = useAuthenticationContext();
  // const userId = user?.uid;

  const [shareXUsers, setShareXUsers] = useState({});
  const [userposts, setUserpost] = useState([]);

  useEffect(() => {
    const fetchMyprofile = async () => {
      try {
        const response = await axios.get(`/users?username=${username}`);
        setShareXUsers(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchMyprofile();
  }, [username]);

  useEffect(() => {
    const fetchMypost = async () => {
      try {
        const response = await axios.get("/posts/profile/" + username);
       
        setUserpost(
          response.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchMypost();
  }, [username]);

  return (
    <section className="profilePage">
      <ProfileInfoForm />

      <div className="profileDashboard">
        <div className="images">
          <img
            className="profileWall"
            src={shareXUsers.coverPicture || CoverImage}
            alt="Cover"
          />
          <img
            className="profilePicture"
            src={shareXUsers.profilePicture || Profileimage}
            alt="Profile"
          />
        </div>

        <div className="dashboardInfo">
          <div className="displayName">
            <span>{shareXUsers.username}</span>
          </div>
          <div className="follower-following">
            <p>25k Follower</p>

            <p>10k Following</p>
          </div>

          <div className="button">
            <button className="follow">Follow</button>
            <button className="message">Message</button>
          </div>
          {/* <button className="edit">
            <MdOutlineModeEditOutline />
          </button>{" "}
          <button className="more">
            <MdOutlineMoreVert />
          </button> */}
        </div>
      </div>
      <div
        className="accountuser-timeline-info-container"
        style={{ display: "flex" }}
      >
        <div
          className="accountuser-timeline"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {!username || username === AuthUser.username ? <SharePost /> : ""}

          {userposts?.length > 0 ? (
            userposts?.map((feeds, index) => (
              <ProfileTimeLine
                key={index}
                // logo={post?.logo}
                username={username}
                shareXUsers={shareXUsers}
                Likes={feeds.Likes}
                Image={feeds.Image}
                feeds={feeds}
                Description={feeds.Description}
                Timestamp={feeds.createdAt}
              />
            ))
          ) : (
            <div className="Nopost">
              <div className="Reload">
                <p>No posts available. Try to reload page. </p>
                <button className="Reload-Btn" onClick={handleReload}>
                  <IoReload />
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="accountuser-info">
          {!username || username === AuthUser.username ? (
            <MyProfile shareXUsers={shareXUsers} />
          ) : (
            <UsersProfile shareXUsers={shareXUsers} />
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileInfo;
