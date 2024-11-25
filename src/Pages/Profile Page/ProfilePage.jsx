import MyProfile from "../../Components/ProfileInfo/My Profile/MyProfile";
import ProfileInfoForm from "../../Components/ProfileInfo/My Profile/MyProfileForm";
import SharePost from "../../Components/HomePage Components/Timeline/SharePost";
import CoverImage from "../../Assets/no-image.png";
import Profileimage from "../../Assets/profile-gender-neutral.jpg";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUsererror, setUsers } from "../../Reduxtoolkit/appUsersSlice";
import axios from "../../API/axios";
import TimeLine from "../../Components/HomePage Components/Timeline/TimeLine";
import useHandleFollowUnfollow from "../../Hooks/useHandleFollowUnfollow";

const ProfileInfo = () => {
  const username = useParams().username;

  const { currentUser } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.Users);

  const { followed, userFollowersCount, handleClick } =
    useHandleFollowUnfollow(username);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        dispatch(setLoading(true))
        const userResponse = await axios.get(
          `/api/users/profile?username=${username}`
        );
        dispatch(setUsers(userResponse.data));
         dispatch(setLoading(false));
      } catch (error) {
        dispatch(setUsererror());
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfile();
  }, [username, dispatch]);

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
          {username === currentUser.username ? (
            <div className="follower-following">
              <p>{users?.followings?.length} Followings</p>
              <p>{users?.followers?.length} Followers</p>
            </div>
          ) : (
            <div className="follower-following">
              <p>{users?.followings?.length} Followings</p>
              <p>{users?.followers?.length} Followers</p>
            </div>
          )}

          {username !== currentUser?.username && (
            <div className="button">
              <button className="follow" onClick={handleClick}>
                {followed ? "Unfollow" : "Follow"}
              </button>

              <button className="message">Message</button>
            </div>
          )}
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
          {username === currentUser?.username ? <SharePost /> : ""}

          <TimeLine />
        </div>
        <div className="accountuser-info">
          <MyProfile username={username} />
        </div>
      </div>
    </section>
  );
};

export default ProfileInfo;
