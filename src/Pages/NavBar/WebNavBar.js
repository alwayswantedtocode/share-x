import "./nav.scss";
import { AiOutlineAppstore, AiOutlineHome } from "react-icons/ai";
import {
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdOutlineSearch,
  MdOutlineMail,
  MdOutlineNotificationsNone,
  MdOutlinePerson,
} from "react-icons/md";
import { BsPerson } from "react-icons/";
// import { useGlobalContext } from "../../ContextApi/GlobalContext";

const WebNavBar = () => {
//   const { isDarkMode, modeToggle } = useGlobalContext();
  return (
    <header className="header ">
      <nav className="nav">
        <div className="Left-buttons">
          <span>Sharex</span>
          <button>
            <AiOutlineHome />
          </button>
          {/* onClick={modeToggle} */}
          <button>
            {/* {isDarkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />} */}
          </button>
          <button>
            <AiOutlineAppstore />
          </button>
          <div className="search">
            <MdOutlineSearch />
            <input type="text" placeholder="search" />
          </div>
        </div>
        <div className="Right-buttons">
          <button>
            <MdOutlinePerson />
          </button>
          <button>
            <MdOutlineMail />
          </button>
          <button>
            <MdOutlineNotificationsNone />
          </button>

          <div className="user">
            <img
              src="https://images.unsplash.com/photo-1686287118358-2ac201c8cb0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80"
              alt="Samuel-David profile picture"
            />
            <span>Samuel-David</span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default WebNavBar;
