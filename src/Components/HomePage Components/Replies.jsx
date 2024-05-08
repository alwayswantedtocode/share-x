import { useEffect, useState } from "react";
import Profileimage from "../../Assets/profile-gender-neutral.jpg";

import { useDispatch, useSelector } from "react-redux";
import axios from "../../API/axios";
import { setComments } from "../../Reduxtoolkit/postSlice";

const Replies = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const { posts, comments } = useSelector((state) => state.post);
  const dispatch = useDispatch();


    // const [coment, setcoment] = useState(posts?.comments)
    // console.log(coment)
  useEffect(() => {
    const getComment = async () => {
   
      try {
        const response = await axios.get(`/api/comments/${postId}`);
        console.log(response.data);
        dispatch(
          setComments(
            response.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          )
        );
      } catch (error) {}
    };
    getComment();
  }, [postId, dispatch]);
  return (
    <>
      {posts?.comments?.length > 0 && (
        <div>
          {posts?.comments?.map((reply) => {
            return (
              <div className="comment" key={reply?._id}>
                <img src={reply?.profilePicture || Profileimage} alt="" />
                <div className="info">
                  <span className="name">{reply?.username}</span>
                  <div className="text">
                    <p>{reply?.comments}</p>
                  </div>
                  <div className="impressions">
                    <p>Like</p>
                    <p>Reply</p>
                  </div>
                </div>
                <span className="time">
                  {new Date(reply?.timestamp?.toDate())?.toUTCString()}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Replies;
