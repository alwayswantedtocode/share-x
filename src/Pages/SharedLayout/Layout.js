import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/WebNavBar";
import MobileNavBar from "../NavBar/MobileNavBar";
import LeftComponent from "../Components/LeftComponent";
import RightComponent from "../Components/RightComponent";
import "../../index.scss";
import {
  useGlobalContext,
  GlobalContext,
} from "../../ContextApi/GlobalContext";

const Layout = () => {
  const { isDarkMode, modeToggle } = useGlobalContext(GlobalContext);
  
  // const {isDarkMode}= useContext(GlobalContext);
  console.log(isDarkMode);
  return (
    <section
      className={` ${isDarkMode ? "theme-dark" : "theme-light"}`}
      style={{ backgroundColor: " rgb(246, 246, 246)" }}
    >
      <NavBar />
      {/* <MobileNavBar/> */}
      <div style={{ display: "flex" }}>
        <LeftComponent />
        <div style={{ flex: 6 }}>
          <Outlet />
        </div>

        <RightComponent />
      </div>
    </section>
  );
};

export default Layout;
