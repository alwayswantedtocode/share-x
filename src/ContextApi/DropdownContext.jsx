import React, { createContext, useContext, useRef, useState } from "react";

const DropdownContext = createContext();

export const DropdownProvider = ({ children }) => {
  const rightButtonsRef = useRef(null);
  const messageRef = useRef(null);
  const profileRef = useState(null);
  const notificationRef = useState(null);
  const commentsRef = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setActiveDropdown((prev) => (prev === index ? null : index));
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <DropdownContext.Provider
      value={{
        rightButtonsRef,
        messageRef,
        profileRef,
        notificationRef,
        commentsRef,
        activeDropdown,
        toggleDropdown,
        closeDropdown,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
};

export const useDropdownContext = () => {
  return useContext(DropdownContext);
};
