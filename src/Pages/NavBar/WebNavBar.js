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
import { useGlobalContext } from "../../ContextApi/GlobalContext";
import { useAuthenticationContext } from "../../ContextApi/AuthenticationContext";

const WebNavBar = () => {
  const { isDarkMode, modeToggle } = useGlobalContext();
  const { currentUser } = useAuthenticationContext();
  return (
    <header className="header ">
      <nav className="nav">
        <div className="Left-buttons">
          <span>Sharex</span>
          <button>
            <AiOutlineHome />
          </button>
          {/* onClick={modeToggle} */}
          <button onClick={modeToggle}>
            {isDarkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
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
              src={currentUser.profilePicture}
              alt=""
            />
            <span>{currentUser.name}</span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default WebNavBar;
