import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const useSocket = () => {
  const socketRef = useRef(null); // Store socket instance
  const [initialized, setInitialized] = useState(false); // Track socket readiness
  const [newPost, setNewPost] = useState(null);
  const [newComment, setNewComment] = useState(null);
  const [newLike, setNewLike] = useState(null);
  const [newFollower, setNewFollower] = useState(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:5050"); // Initialize socket
    socketRef.current.on("connect", () => {
      console.log("Socket connected!");
      setInitialized(true); // Mark socket as initialized
    });

    socketRef.current.on("newPost", (postData) => {
      console.log("New post created:", postData);
      setNewPost(postData); // Update state with the new post data
    });

    socketRef.current.on(`newComment-${postId}`, (commentData) => {
      console.log(`New comment on post ${postId}:`, commentData);
      setNewComment(commentData);
    });

    socketRef.current.on("newLike-postId", (userId) => {
      console.log("New like from user:", userId);
      setNewLike(userId);
    });

    socketRef.current.on("newFollower", (userId) => {
      console.log("New follower:", userId);
      setNewFollower(userId);
    });

    return () => {
      socketRef.current.disconnect(); // Disconnect socket on cleanup
      console.log("Socket disconnected!");
    };
  }, []);
  return {
        socket: socketRef.current,
        newPost,
        initialized,
        newComment,
        newLike,
        newFollower,
      };
};

export default useSocket;
