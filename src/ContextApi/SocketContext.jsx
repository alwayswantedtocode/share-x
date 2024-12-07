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
  const socketRef = useRef(null); 
  const [initialized, setInitialized] = useState(false); 

  useEffect(() => {
    // socketRef.current = io("http://localhost:5050"); 
    socketRef.current = io("https://share-x-server.onrender.com");
    socketRef.current.on("connect", () => {
      console.log("Socket connected!");
      setInitialized(true); 
    });

    return () => {
      socketRef.current.disconnect(); 
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
