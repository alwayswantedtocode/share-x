import React from "react";
import "./Profile.scss";
import { useAuthenticationContext } from "../../ContextApi/AuthenticationContext";

import {
  MdOutlineSettings,
  MdHelpCenter,
  MdFeedback,
  MdLogout,
  MdShoppingCart,
  MdChevronRight,
} from "react-icons/md";
import { BiBarChartAlt2 } from "react-icons/bi";
import { BsBagHeart } from "react-icons/bs";
import UserIcon from "../../Assets/user-circle-svgrepo-com.svg";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../Reduxtoolkit/authSlice";
import { removePost } from "../../Reduxtoolkit/postSlice";
import { removeUsers } from "../../Reduxtoolkit/appUsersSlice";
import axios from "../../API/axios";

const ProfileAside = () => {
  const { SignOutUser } = useAuthenticationContext();
  const { currentUser } = useSelector((state) => state.auth);
  const { post } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LogOut = async () => {
    try {
      const response = await axios.post("/api/usersauth/logout");
      console.log(response.data);
      dispatch(setLogout());
      dispatch(removePost());
      dispatch(removeUsers());
      if (!currentUser || !post) {
        navigate("/Login");
      }
    } catch (error) {}
  };
  return (
    <article className="AsideProfile">
      <div className="container">
        <div className="Account">
          <Link to={`/profilepage/${currentUser?.username}`}>
            <div className="AccountName">
              <img
                src={currentUser?.profilePicture || UserIcon}
                alt="userIcon"
              />
              <span className="Name">{currentUser?.username}</span>{" "}
            </div>
          </Link>
          <hr />
          <div className="AddAccount">
            <span className="Name">Add an existing acount</span>
          </div>
        </div>
        <div className="profileOptions">
          <div className="option">
            <div>
              <BiBarChartAlt2 className="option-icon" />
            </div>
            <span className="Name">Insights</span>
          </div>
        </div>
        <div className="profileOptions">
          <div className="option">
            <div>
              <MdShoppingCart />
            </div>
            <span className="Name">Market Cart</span>
          </div>
        </div>
        <div className="profileOptions">
          <div className="option">
            <div>
              <BsBagHeart />
            </div>
            <span className="Name">WishList</span>
          </div>
          <MdChevronRight className="right" />
        </div>
        {/* <div className="profileOptions">
          <MdLogout />

        </div> */}
        <div className="profileOptions">
          <div className="option">
            <div>
              <MdHelpCenter />
            </div>
            <span className="Name">Help and Support</span>
          </div>
          <MdChevronRight className="right" />
        </div>
        <div className="profileOptions">
          <div className="option">
            <div>
              <MdOutlineSettings />
            </div>
            <span className="Name">Setting & Privacy</span>
          </div>
          <MdChevronRight className="right" />
        </div>
        <div className="profileOptions" onClick={LogOut}>
          <div className="option">
            <div>
              <MdLogout />
            </div>
            <span className="Name">Logout</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProfileAside;
