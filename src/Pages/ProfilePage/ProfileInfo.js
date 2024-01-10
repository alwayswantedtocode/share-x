import "./profile.scss";

import MyPost from "./ProfileInfo/MyPost";
import UserProfile from "./ProfileInfo/UserProfile";
// import EditBio from "./ProfileInfo/EditBio";
import Profile from "../ProfilePage/ProfileInfo/Profile";
import { useReducer, useEffect } from "react";
import {
  postReducer,
  postActions,
  initialPostState,
} from "../../ContextApi/PostReducer";
import { useAuthenticationContext } from "../../ContextApi/AuthenticationContext";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "../Authentication/Firebase";
import { useParams } from "react-router-dom";
import ProfileInfoForm from "./ProfileInfo/ProfileInfoForm";

const ProfileInfo = () => {
  const { id } = useParams();

  const { user, userData } = useAuthenticationContext();
  const userId = user?.uid;

  const [state, dispatch] = useReducer(postReducer, initialPostState);
  const { FETCH_POST } = postActions;

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(
        collection(db, "posts"),
        where("uid", "==", id),
        orderBy("timestamp", "desc")
      );
      await onSnapshot(q, (querySnapshot) => {
        dispatch({
          type: FETCH_POST,
          posts: querySnapshot?.docs?.map((doc) => ({
            id: doc?.id,
            ...doc?.data(),
          })),
        });
      });
    };

    fetchPosts();
  }, [FETCH_POST, userId]);
  console.log(state);

  return (
    <section className="profilePage">
      <ProfileInfoForm />
      <div className="profileDashboard">
        <div className="images">
          <img
            className="profileWall"
            src="https://images.unsplash.com/photo-1512849934327-1cf5bf8a5ccc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODZ8fGJsYWNrJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
            alt=""
          />
          <img
            className="profilePicture"
            src="https://images.unsplash.com/photo-1512849934327-1cf5bf8a5ccc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODZ8fGJsYWNrJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
            alt=""
          />
        </div>
        <div className="dashboardInfo">
          <div className="follower-following">
            <p>25k Follower</p>

            <p>10k Following</p>
          </div>
          <div className="displayName">
            <span>{user.displayName}</span>
          </div>
          <div className="button">
            <button className="follow">follow</button>
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
        {/* <MyPosts /> */}
        <div
          className="accountuser-timeline"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {state?.posts?.length > 0 ? (
            state?.posts?.map((post, index) => (
              <MyPost
                key={index}
                logo={post?.logo}
                name={post.name}
                image={post.image}
                text={post.text}
                timestamp={new Date(post?.timestamp?.toDate())?.toUTCString()}
              />
            ))
          ) : (
            <div>No posts available.Share your first experince</div>
          )}
        </div>
        <div className="accountuser-info">
          {userId ? <UserProfile /> : <Profile />}
        </div>
      </div>
    </section>
  );
};

export default ProfileInfo;
