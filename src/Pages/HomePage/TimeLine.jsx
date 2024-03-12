import Post from "./Post";
import "./home.scss";
import {
  postReducer,
  postActions,
  initialPostState,
} from "../../ContextApi/PostReducer";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import useReload from "../../Hooks/useReload";
import { IoReload } from "react-icons/io5";
import { useAuthenticationContext } from "../../ContextApi/AuthenticationContext";

const TimeLine = () => {
  const { handleReload } = useReload();
  const [posts, setPosts] = useState([]);

  const { AuthUser } = useAuthenticationContext();

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        const response = await axios.get("posts/timeline/" + AuthUser._id);
        console.log(response.data);
        setPosts(
          response.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPostsData();
  }, [AuthUser._id]);

  return (
    <div className="TimeLine">
      {posts?.length > 0 ? (
        posts.map((feeds, index) => {
          return (
            <Post
              key={feeds._id}
              feeds={feeds}
              description={feeds.Description}
              Likes={feeds.Likes}
              Image={feeds.Image}
              Timestamp={feeds.createdAt}
            />
          );
        })
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
  );
};

export default TimeLine;
