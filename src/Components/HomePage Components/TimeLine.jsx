import Post from "./Post";
import "./home.scss";
import { useEffect } from "react";
import { IoReload } from "react-icons/io5";
import useReload from "../../Hooks/useReload";
import { useSelector, useDispatch } from "react-redux";
import { setError, setPosts } from "../../Reduxtoolkit/postSlice";
import axios from "../../API/axios";

const TimeLine = () => {
  const { handleReload } = useReload();
  
  const dispatch = useDispatch();

  const { posts, error } = useSelector((state) => state.post);
  const { currentUser } = useSelector((state) => state.auth);

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
        dispatch(setError());
        console.error("Error fetching posts:", error);
      }
    };
    fetchPostsData();
  }, [currentUser._id, dispatch]);

  return (
    <div className="TimeLine">
      {error ? (
        <div className="Nopost">
          <div className="Reload">
            <p style={{ color: "red" }}>Something went wrong. Refresh... </p>
            <button className="Reload-Btn" onClick={handleReload}>
              <IoReload />
            </button>
          </div>
        </div>
      ) : (
        <div>
          {posts?.length > 0 ? (
            posts.map((feeds) => {
              return (
                <Post
                  key={feeds._id}
                  feeds={feeds}
                  postId={feeds._id}
                  userId={feeds.userId}
                  description={feeds.Description}
                  Likes={feeds.Likes}
                  Image={feeds.Image}
                  Timestamp={feeds.createdAt}
                  Username={feeds.username}
                  Comments={feeds?.Comments}
                />
              );
            })
          ) : (
            <div className="Nopost">
              <div className="Reload">
                <p>No posts available. Follw friends to see their posts </p>
               
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TimeLine;
