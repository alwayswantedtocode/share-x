import "./profile.scss";
import "../../Components/HomePage Components/home.scss";
import Myposts from "../../Components/ProfileInfo/MyPosts";
import MyProfile from "../../Components/ProfileInfo/My Profile/MyProfile";
import UsersProfile from "../../Components/ProfileInfo/UsersProfile";
import ProfileInfoForm from "../../Components/ProfileInfo/My Profile/MyProfileForm";
import SharePost from "../../Components/HomePage Components/SharePost";
import { IoReload } from "react-icons/io5";
import CoverImage from "../../Assets/no-image.png";
import Profileimage from "../../Assets/profile-gender-neutral.jpg";
import { useEffect, useState } from "react";
import useReload from "../../Hooks/useReload";
import { useAuthenticationContext } from "../../ContextApi/AuthenticationContext";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { unfollowUser, followUser } from "../../Reduxtoolkit/authSlice";
import { setUsers, setUsersPost } from "../../Reduxtoolkit/appUsersSlice";
// import axios from "axios";
import axios from "../../API/axios";

const ProfileInfo = () => {
  const username = useParams().username;
  const { handleReload } = useReload();

  const { user, userData, AuthUser } = useAuthenticationContext();
  const { currentUser } = useSelector((state) => state.auth);
  const { users, usersPosts } = useSelector((state) => state.Users);

  const dispatch = useDispatch();

  const [followed, setFollowed] = useState(false);

  //fetch profile user
  useEffect(() => {
    const fetchMyprofile = async () => {
      try {
        const response = await axios.get(
          `/api/users/profile?username=${username}`
        );
        dispatch(setUsers(response.data));
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchMyprofile();
  }, [username, dispatch]);

  //Fetch profile user posts
  useEffect(() => {
    const fetchMypost = async () => {
      try {
        const response = await axios.get(`/api/posts/profile/${username}`);
        dispatch(
          setUsersPost(
            response.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          )
        );
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchMypost();
  }, [username, dispatch]);

  //Follow/Unfollow
  useEffect(() => {
    setFollowed(users?.followers.includes(currentUser?._id));
  }, [users?.followers, currentUser?._id]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/api/users/${users?._id}/unfollow`, {
          userId: currentUser?._id,
        });
        dispatch(unfollowUser(users?._id));

        console.log("unfollowed yuser");
      } else {
        await axios.put(`/api/users/${users?._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch(followUser(users?._id));
        console.log("followed user");
      }
    } catch (err) {}
  };

  return (
    <section className="profilePage">
      <ProfileInfoForm />

      <div className="profileDashboard">
        <div className="images">
          <img
            className="profileWall"
            src={users?.coverPicture || CoverImage}
            alt="Cover"
          />
          <img
            className="profilePicture"
            src={users?.profilePicture || Profileimage}
            alt="Profile"
          />
        </div>

        <div className="dashboardInfo">
          <div className="displayName">
            <span>{users?.username}</span>
          </div>
          <div className="follower-following">
            <p>{users?.followings?.length} Followings</p>
            <p>{users?.followers?.length} followers</p>
          </div>

          {username !== currentUser?.username && (
            <div className="button">
              <button className="follow" onClick={handleClick}>
                {followed ? "Unfollow" : "Follow"}
              </button>

              <button className="message">Message</button>
            </div>
          )}
          {/* <button className="edit">
            <MdOutlineModeEditOutline />
          </button>{" "}
          <button className="more">
            <MdOutlineMoreVert />
          </button> */}
        </div>
      </div>
      {/* {username === currentUser?.username ? <SharePost /> : ""} */}
      <div
        className="accountuser-timeline-info-container"
        style={{ display: "flex" }}
      >
        <div
          className="accountuser-timeline"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {username === currentUser?.username ? <SharePost /> : ""}

          {usersPosts?.length > 0 ? (
            usersPosts?.map((feeds, index) => (
              <Myposts
                key={index}
                Username={username}
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
          {username === currentUser?.username ? (
            <MyProfile />
          ) : (
            <UsersProfile />
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileInfo;
