import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unfollowUser, followUser } from "../Reduxtoolkit/authSlice";
import axios from "../API/axios";

const useHandleFollowUnfollow = () => {
  const { currentUser } = useSelector((state) => state.auth);
    const { users,} = useSelector((state) => state.Users);
     const dispatch = useDispatch();

//   const following = users?.followings?.length;
  const follower = users?.followers?.length;

//   console.log("following in profile:", following);
//   console.log("follower in profile:", follower);

  const [followed, setFollowed] = useState(false); 

  const [userFollowersCount, setUserFollowersCount] = useState(follower || 0); 

  // Effect to check if the current user is already following the other user
  useEffect(() => {
    if (users?.followers && currentUser?._id) {
      setFollowed(users.followers.includes(currentUser._id));
    }
  }, [users?.followers, currentUser?._id]);

  // Handle follow/unfollow action
  const handleClick = async () => {
    try {
      const response = followed
        ? await axios.put(`/api/users/${users?._id}/unfollow`, {
            accountUserId: currentUser?._id,
          })
        : await axios.put(`/api/users/${users?._id}/follow`, {
            accountUserId: currentUser?._id,
          });

      const updatedCounts = response.data.updatedCounts;

      if (followed) {
        dispatch(unfollowUser({ updatedCounts }));
        console.log("Unfollowed user");
      } else {
        dispatch(followUser({ updatedCounts }));
        console.log("Followed user");
      }
      setFollowed(!followed);
      setUserFollowersCount(updatedCounts.friendUser.followersCount);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return { followed, userFollowersCount, handleClick };
};

export default useHandleFollowUnfollow;
