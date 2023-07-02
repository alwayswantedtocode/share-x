import React from "react";
import "./Profile.scss"
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

const ProfileAside = () => {
  const { currentUser } = useAuthenticationContext();
  return (
    <article className="AsideProfile">
      <div className="container">
        <div className="Account">
          <div className="AccountName">
            <img src={currentUser.profilePicture} alt="" />
            <span className="Name">{currentUser.name}</span>
          </div>
          <hr />
          <div className="AddAccount">
            <span className="Name">Add an existing acount</span>
          </div>
        </div>
        <div className="profileOptions">
          <div className="option">
            <div>
              <BiBarChartAlt2 />
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
        <div className="profileOptions">
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
