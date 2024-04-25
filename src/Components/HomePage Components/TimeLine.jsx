import Post from "./Post";
import "./home.scss";
import {
  postReducer,
  postActions,
  initialPostState,
} from "../../ContextApi/PostReducer";
import { useEffect, useReducer, useState } from "react";
// import axios from "axios";
import axios from "../../API/axios";
import useReload from "../../Hooks/useReload";
import { IoReload } from "react-icons/io5";
import { useAuthenticationContext } from "../../ContextApi/AuthenticationContext";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../../Reduxtoolkit/postSlice";
import { useParams } from "react-router-dom";

const TimeLine = ({ username }) => {
  const { handleReload } = useReload();
  // const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  const { AuthUser } = useAuthenticationContext();
  const { posts } = useSelector((state) => state.post);
  const { currentUser } = useSelector((state) => state.auth);

  // const username = useParams().username;

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        const response = await axios.get(
          `/api/posts/timeline/${currentUser._id}`
        );
        dispatch(
          setPosts(
            response.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          )
        );
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPostsData();
  }, [currentUser._id, dispatch]);

  return (
    <div className="TimeLine">
      {posts?.length > 0 ? (
        posts.map((feeds) => {
          return (
            <Post
              key={feeds._id}
              feeds={feeds}
              description={feeds.Description}
              Likes={feeds.Likes}
              Image={feeds.Image}
              Timestamp={feeds.createdAt}
              Username ={feeds.username}
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
