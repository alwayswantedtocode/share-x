import Post from "./Post";
import { useEffect } from "react";
import { IoReload } from "react-icons/io5";
import useReload from "../../../Hooks/useReload";
import { useSelector, useDispatch } from "react-redux";
import { setError, setPosts } from "../../../Reduxtoolkit/postSlice";
import {
  setUsererror,
  setUsersPost,
} from "../../../Reduxtoolkit/appUsersSlice";
import axios from "../../../API/axios";
import { useParams } from "react-router-dom";
import { DropdownProvider } from "../../../ContextApi/DropdownContext";

const TimeLine = () => {
  const { username } = useParams();
  const { handleReload } = useReload();

  const dispatch = useDispatch();
  const { posts, error } = useSelector((state) => state.post);
  const { currentUser } = useSelector((state) => state.auth);
  const { usersPosts } = useSelector((state) => state.Users);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!username) {
          const response = await axios.get(
            `/api/posts/timeline/${currentUser._id}`
          );
          console.log(JSON.stringify(response.data));
          dispatch(
            setPosts(
              response.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
              })
            )
          );
        } else {
          const postsResponse = await axios.get(
            `/api/posts/profile/${username}`
          );
          console.log(JSON.stringify(postsResponse.data));
           
          dispatch(
            setUsersPost(
              postsResponse.data.sort(
                (p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)
              )
            )
          );
        }
      } catch (error) {
        username ? dispatch(setError()) : dispatch(setUsererror());
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentUser._id, username, dispatch]);

  const renderPosts = (postList) => {
    return postList.length > 0 ? (
      postList.map((feeds) => (
        <DropdownProvider key={feeds._id}>
          {" "}
          <Post
            feeds={feeds}
            postId={feeds._id}
            userId={feeds.userId}
            description={feeds.Description}
            Likes={feeds.Likes}
            Image={feeds.Image}
            media={feeds.Media}
            mediaType={feeds.MediaType}
            Timestamp={feeds.createdAt}
            Username={feeds.username}
            Comments={feeds?.Comments}
            profilePicture={feeds?.userProfilePicture}
          />
        </DropdownProvider>
      ))
    ) : (
      <div className="Nopost">
        <div className="Reload">
          <p>No posts available. Follow friends to see their posts.</p>
        </div>
      </div>
    );
  };

  return (
    <div className="TimeLine">
      {error ? (
        <div className="Nopost">
          <div className="Reload">
            <p style={{ color: "red" }}>Something went wrong. Refresh...</p>
            <button className="Reload-Btn" onClick={handleReload}>
              <IoReload />
            </button>
          </div>
        </div>
      ) : username ? (
        renderPosts(usersPosts)
      ) : (
        renderPosts(posts)
      )}
    </div>
  );
};

export default TimeLine;
