// // SocketContext.js (Context API for Socket.IO)
// import React, {
//   createContext,
//   useState,
//   useEffect,
//   useContext,
//   useRef,
// } from "react";
// import { useSelector } from "react-redux";
// import io from "socket.io-client";

// const SocketContext = createContext();

// export const SocketProvider = ({ children }) => {
//   const socketRef = useRef(null); // Store socket instance
//   const [initialized, setInitialized] = useState(false); // Track socket readiness
//   const [newPost, setNewPost] = useState(null);
//   const [newComment, setNewComment] = useState(null);
//   const [newLike, setNewLike] = useState(null);
//   const [newFollower, setNewFollower] = useState(null);

//   useEffect(() => {
//     socketRef.current = io("http://localhost:5050"); // Initialize socket
//     socketRef.current.on("connect", () => {
//       console.log("Socket connected!");
//       setInitialized(true); // Mark socket as initialized
//     });

//     socketRef.current.on("newPost", (postData) => {
//       console.log("New post created:", postData);
//       setNewPost(postData); // Update state with the new post data
//     });

//     socketRef.current.on(`newComment-${postId}`, (commentData) => {
//       console.log(`New comment on post ${postId}:`, commentData);
//       setNewComment(commentData);
//     });

//     socketRef.current.on("newLike-postId", (userId) => {
//       console.log("New like from user:", userId);
//       setNewLike(userId);
//     });

//     socketRef.current.on("newFollower", (userId) => {
//       console.log("New follower:", userId);
//       setNewFollower(userId);
//     });

//     return () => {
//       socketRef.current.disconnect(); // Disconnect socket on cleanup
//       console.log("Socket disconnected!");
//     };
//   }, []);

//   return (
//     <SocketContext.Provider
//       value={{
//         socket: socketRef.current,
//         newPost,
//         initialized,
//         newComment,
//         newLike,
//         newFollower,
//       }}
//     >
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export const useSocketContext = () => {
//   return useContext(SocketContext);
// };

// SocketContext.js
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null); // Store socket instance
  const [initialized, setInitialized] = useState(false); // Track socket readiness

  useEffect(() => {
    socketRef.current = io("http://localhost:5050"); // Initialize socket
    socketRef.current.on("connect", () => {
      console.log("Socket connected!");
      setInitialized(true); // Mark socket as initialized
    });

    return () => {
      socketRef.current.disconnect(); // Disconnect socket on cleanup
      console.log("Socket disconnected!");
    };
  }, []);

  const listenToEvent = (eventName, callback) => {
    if (socketRef.current) {
      socketRef.current.on(eventName, callback);
    }
  };

  const stopListeningToEvent = (eventName, callback) => {
    if (socketRef.current) {
      socketRef.current.off(eventName, callback);
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        initialized,
        listenToEvent,
        stopListeningToEvent,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  return useContext(SocketContext);
};
