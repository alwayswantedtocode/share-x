import React, { useEffect, useRef, useState } from "react";
import { useCallback } from "react";
import "./nav.scss";
// import "../Aside/Aside.scss";
import { AiOutlineAppstore, AiOutlineHome } from "react-icons/ai";
import {
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdOutlineSearch,
  MdOutlineMail,
  MdOutlineNotificationsNone,
  MdOutlinePerson,
} from "react-icons/md";
import { HiOutlineNewspaper } from "react-icons/hi";
import { useGlobalContext } from "../../ContextApi/GlobalContext";
import { useAuthenticationContext } from "../../ContextApi/AuthenticationContext";
import { Link, NavLink } from "react-router-dom";
import AppAside from "../Aside/AppAside";
import CommunityAside from "../Aside/CommunityAside";
import MessageAside from "../Aside/MessageAside";
import NotificationAside from "../Aside/NotificationAside";
import ProfileAside from "../Aside/ProfileAside";
import UserIcon from "../../Assets/profile-gender-neutral.jpg";
import { useSelector } from "react-redux";
import axios from "../../API/axios";

const WebNavBar = (username) => {
  const { isDarkMode, modeToggle } = useGlobalContext();
  const { AuthUser } = useAuthenticationContext();
  const { currentUser } = useSelector((state) => state.auth);

  const closeAsideRef = useRef();

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

  useEffect(() => {
    if (search.trim() === "") {
      setSearchResult([]);
      setShowResult(false);
      return;
    }
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `/api/users/search?query=${search}`
        );
        console.log(response.data);
        setSearchResult(response.data);
        setShowResult(true);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchUser();
  }, [search]);

  const handleShowResult = () => {
    setShowResult(true);
  };

  const handleIcons = (index) => {
    const updatedOnClickIcon = onClickIcon.map((clicked, i) =>
      i === index ? !clicked : false
    );
    setOnClickIcon(updatedOnClickIcon);

    if (updatedOnClickIcon[index]) {
      const asideElement = document.getElementById(`Aside-${index}`);
      const iconElement = document.getElementById(`Icon-${index}`);

      if (asideElement && iconElement) {
        const iconRect = iconElement.getBoundingClientRect(`Icon-${index}`);
        const asideRect = asideElement.getBoundingClientRect(`Aside-${index}`);

        const bottom = iconRect.buttom - asideRect.height;

        asideElement.style.buttom = `${bottom}px`;
      }
    }
  };

  const handleAside = useCallback(
    (e) => {
      if (!closeAsideRef.current.contains(e.target)) {
        setOnClickIcon(onClickIcon);
      }
    },
    [onClickIcon]
  );
  useEffect(() => {
    document.addEventListener("mousedown", handleAside);
    return () => {
      document.removeEventListener("mousedown", handleAside);
    };
  }, []);

  return (
    <header className="header ">
      <nav className="nav">
        <span>
          <NavLink to="/home">Share X</NavLink>
        </span>
        <div className="Left-buttons">
          <button>
            <AiOutlineHome />
          </button>
          {/* onClick={modeToggle} */}
          <button onClick={modeToggle}>
            {isDarkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
          </button>
          <button>
            <HiOutlineNewspaper />
          </button>
          <div className="search">
            <input
              type="text"
              placeholder="search"
              value={search}
              name="textarea"
              onChange={(e) => setsearch(e.target.value)}
              ref={closeAsideRef}
            />
            <button className="search-btn ">
              <MdOutlineSearch className="search-icon" />
            </button>

            <article className={`${showResult ? "Aside active " : "Aside"}`}>
              <div className="search-Aside">
                {searchResult.map((result) => {
                  return (
                    <Link
                      to={`/profilepage/${result.username}`}
                      key={result._id}
                    >
                      <div className="result-content">
                        <p>{result.Fullname}</p>
                        <p>{result.username}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </article>
          </div>
        </div>

        <div className="Right-buttons">
          {/* <div>
            <button
              ref={closeAsideRef}
              className="right-btn"
              id="Icon-0"
              onClick={() => handleIcons(0)}
            >
              <AiOutlineAppstore />
            </button>
            <aside
              id="Aside-0"
              className={`${onClickIcon[0] ? "Aside active " : "Aside"}`}
            >
              <AppAside />
            </aside>
          </div> */}

          {/* <div>
            <button
              ref={closeAsideRef}
              className="right-btn"
              id="Icon-1"
              onClick={() => handleIcons(1)}
            >
              <MdOutlinePerson />
            </button>
            <aside
              id="Aside-1"
              className={`${onClickIcon[1] ? "Aside active " : "Aside"}`}
            >
              <CommunityAside />
            </aside>
          </div> */}

          <div>
            <button
              ref={closeAsideRef}
              className="right-btn"
              id="Icon-2"
              onClick={() => handleIcons(2)}
            >
              <MdOutlineMail />
            </button>
            <aside
              id="Aside-2"
              className={`${onClickIcon[2] ? "Aside active " : "Aside"}`}
            >
              <MessageAside />
            </aside>
          </div>

          <div>
            <button
              ref={closeAsideRef}
              className="right-btn"
              id="Icon-3"
              onClick={() => handleIcons(3)}
            >
              <MdOutlineNotificationsNone />
            </button>
            <aside
              id="Aside-3"
              className={`${onClickIcon[3] ? "Aside active " : "Aside"}`}
            >
              <NotificationAside />
            </aside>
          </div>
        </div>
        <div
          ref={closeAsideRef}
          id="Icon-4"
          className="user right-btn"
          onClick={() => handleIcons(4)}
        >
          <img src={currentUser?.profilePicture || UserIcon} alt="" />

          {/* <img src={currentUser.profilePicture} alt="" /> */}

          <aside
            id="Aside-4"
            className={`${onClickIcon[4] ? "Aside active " : "Aside"}`}
          >
            <ProfileAside />
          </aside>
        </div>
      </nav>
    </header>
  );
};

export default WebNavBar;
