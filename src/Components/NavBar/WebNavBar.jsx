import React, { useEffect, useRef, useState } from "react";
import { useCallback } from "react";
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
import { useAuthenticationContext } from "../../ContextApi/AuthenticationContext";
import { Link, NavLink } from "react-router-dom";
import MessageAside from "../Aside/MessageAside";
import NotificationAside from "../Aside/NotificationAside";
import ProfileAside from "../Aside/ProfileAside";
import UserIcon from "../../Assets/profile-gender-neutral.jpg";
import { useSelector } from "react-redux";
import axios from "../../API/axios";
import SearchAside from "../Aside/SearchAside";
import useSearch from "../../Hooks/useSearch";

const WebNavBar = (username) => {
  const { isDarkMode, modeToggle, closeAsideRef, searchBarRef } =
    useGlobalContext();

  const { isSearchVisible, setIsSearchVisible, toggleSearchVisibility } =
    useSearch();
  const { AuthUser } = useAuthenticationContext();
  const { currentUser } = useSelector((state) => state.auth);

  // const closeAsideRef = useRef();

  //buttons dropdown states
  const [onClickIcon, setOnClickIcon] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const [search, setsearch] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const handleShowResult = () => {
    setShowResult(true);
  };

  const handleIcons = (index) => {
    const updatedOnClickIcon = onClickIcon.map((clicked, i) =>
      i === index ? !clicked : false
    );
    setOnClickIcon(updatedOnClickIcon);

    if (updatedOnClickIcon[index]) {
      const asideElement = document.getElementById(`aside-${index}`);
      const iconElement = document.getElementById(`Icon-${index}`);

      if (asideElement && iconElement) {
        const iconRect = iconElement.getBoundingClientRect(`Icon-${index}`);
        const asideRect = asideElement.getBoundingClientRect(`aside-${index}`);

        const bottom = iconRect.buttom - asideRect.height;

        asideElement.style.buttom = `${bottom}px`;
      }
    }
  };
  // close the menu buttons dropdown
  const handleAside = (e) => {
    if (!closeAsideRef.current.contains(e.target)) {
      setOnClickIcon(onClickIcon);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleAside);
    return () => {
      document.removeEventListener("mousedown", handleAside);
    };
  }, []);

  // close search result dorpdown onclicking the result.
  // const closeSearchReault = (e) => {
  //   if (searchResultRef.current.contains(e.target)) {
  //     setShowResult(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", closeSearchReault);
  //   return () => {
  //     document.removeEventListener("mousedown", closeSearchReault);
  //   };
  // }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setSearchResult([]);
      setShowResult(false);
      return;
    }
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/search?query=${search}`);
        console.log(response.data);
        setSearchResult(response.data);
        setShowResult(true);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchUser();
  }, [search]);

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
                      />
                    );
                  })}
                </div>
              </aside>
            </div>
          </div>
        </div>

        <div className="Right-buttons">
          <div>
            <button
              ref={closeAsideRef}
              className="right-btn"
              id="Icon-0"
              onClick={() => handleIcons(0)}
            >
              <MdOutlineMail />
            </button>
            <aside
              id="aside-0"
              className={`${onClickIcon[0] ? "Aside active " : "Aside"}`}
            >
              <MessageAside />
            </aside>
          </div>

          <div>
            <button
              ref={closeAsideRef}
              className="right-btn"
              id="Icon-1"
              onClick={() => handleIcons(1)}
            >
              <MdOutlineNotificationsNone />
            </button>
            <aside
              id="aside-1"
              className={`${onClickIcon[1] ? "Aside active " : "Aside"}`}
            >
              <NotificationAside />
            </aside>
          </div>
        </div>
        <div
          ref={closeAsideRef}
          id="Icon-2"
          className="user right-btn"
          onClick={() => handleIcons(2)}
        >
          <img src={currentUser?.profilePicture || UserIcon} alt="" />

          <aside
            id="aside-2"
            className={`${onClickIcon[2] ? "Aside active " : "Aside"}`}
          >
            <ProfileAside />
          </aside>
        </div>
      </nav>
    </header>
  );
};

export default WebNavBar;
