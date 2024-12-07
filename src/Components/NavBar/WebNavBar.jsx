import React, { useEffect, useRef, useState } from "react";
import "./nav.scss";
// import "../Aside/Aside.scss";
import { AiOutlineHome } from "react-icons/ai";
import {
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdOutlineSearch,
  MdOutlineMail,
  MdOutlineNotificationsNone,
} from "react-icons/md";

import { useGlobalContext } from "../../ContextApi/GlobalContext";
import { Link, NavLink } from "react-router-dom";
import MessageAside from "../Aside/MessageAside";
import NotificationAside from "../Aside/NotificationAside";
import ProfileAside from "../Aside/ProfileAside";
import UserIcon from "../../Assets/profile-gender-neutral.jpg";
import { useSelector } from "react-redux";
import axios from "../../API/axios";
import SearchAside from "../Aside/SearchAside";
import useSearch from "../../Hooks/useSearch";
import { useDropdownContext } from "../../ContextApi/DropdownContext";

const WebNavBar = () => {
  const { isDarkMode, modeToggle, searchBarRef } = useGlobalContext();
  //buttons dropdown states
  const {
    rightButtonsRef,
    messageRef,
    profileRef,
    notificationRef,
    activeDropdown,
    toggleDropdown,
    closeDropdown,
  } = useDropdownContext();

  const { isSearchVisible, toggleSearchVisibility } = useSearch();
  const { unreadNotice, currentUser } = useSelector((state) => state.auth);

  const [search, setsearch] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  //close dropdown on mousedown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        messageRef.current &&
        !messageRef.current.contains(event.target) &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeDropdown]);

  // Fetch user with keywords
  useEffect(() => {
    if (search.trim() === "") {
      setSearchResult([]);
      setShowResult(false);
      return;
    }
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/search?query=${search}`);
        setSearchResult(response.data);
        setShowResult(true);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchUser();
  }, [search]);

  
  // Notification count
  const NotificationLength =
    unreadNotice?.length > 99 ? "99+ " : unreadNotice?.length;

  return (
    <header className="header ">
      <nav className="nav">
        <span>
          <NavLink to="/" style={{ textDecoration: "none" }}>
            Share X
          </NavLink>
        </span>
        <div className="Left-buttons">
          <Link to="/">
            <button>
              <AiOutlineHome />
            </button>
          </Link>
          {/* onClick={modeToggle} */}
          <button onClick={modeToggle}>
            {isDarkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
          </button>
          <button className="search-toggle" onClick={toggleSearchVisibility}>
            <MdOutlineSearch />
          </button>
          <div
            className={`search-container ${isSearchVisible ? "visible" : ""}`}
            ref={searchBarRef}
          >
            <div className="search">
              <input
                type="text"
                placeholder="search"
                value={search}
                name="textarea"
                onChange={(e) => setsearch(e.target.value)}
              />
              <button className="search-btn">
                <MdOutlineSearch className="search-icon" />
              </button>

              <aside className={`${showResult ? "Aside active" : "Aside"}`}>
                <div className="search-Aside">
                  {searchResult.map((result) => {
                    return (
                      <SearchAside
                        key={result._id}
                        id={result._id}
                        fullname={result.Fullname}
                        username={result.username}
                        image={result.profilePicture}
                      />
                    );
                  })}
                </div>
              </aside>
            </div>
          </div>
        </div>

        <div className="Right-buttons">
          <div ref={messageRef}>
            <div className="button-component-wrapper">
              <button
                className="right-btn"
                id="Icon-0"
                onClick={() => toggleDropdown(0)}
              >
                <MdOutlineMail />
              </button>
              <aside
                id="aside-0"
                className={`${
                  activeDropdown === 0 ? "Aside active " : "Aside"
                }`}
              >
                <MessageAside />
              </aside>
            </div>
          </div>

          <div ref={notificationRef}>
            <div className="button-component-wrapper">
              {unreadNotice?.length !== 0 && (
                <span className="Notice-counter">{NotificationLength}</span>
              )}
              <button
                className="right-btn"
                id="Icon-1"
                onClick={() => toggleDropdown(1)}
              >
                <MdOutlineNotificationsNone />
              </button>
              <aside
                id="aside-1"
                className={`${
                  activeDropdown === 1 ? "Aside active " : "Aside"
                }`}
              >
                <NotificationAside />
              </aside>
            </div>
          </div>
        </div>

        <div ref={profileRef}>
          <div
            id="Icon-2"
            className="user right-btn"
            onClick={() => toggleDropdown(2)}
          >
            <img src={currentUser?.profilePicture || UserIcon} alt="" />

            <aside
              id="aside-2"
              className={`${activeDropdown === 2 ? "Aside active " : "Aside"}`}
            >
              <ProfileAside />
            </aside>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default WebNavBar;
