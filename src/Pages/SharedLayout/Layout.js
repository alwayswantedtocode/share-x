import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/WebNavBar";
import MobileNavBar from "../NavBar/MobileNavBar";
import LeftComponent from "../Components/LeftComponent";
import RightComponent from "../Components/RightComponent";
import "../../index.scss";
import { useGlobalContext } from "../../ContextApi/GlobalContext";

const Layout = () => {
  const { isDarkMode, currentUser } = useGlobalContext();

  // const {current}= useContext(GlobalContext);
  // console.log(isDarkMode);
  return (
    // <section
    //   className={`page ${isDarkMode ? "theme-dark" : "theme-light"}`}
    //   style={{ backgroundColor: "rgb(246, 246, 246)", width: "100%" }}
    // >
    <main className={`page ${isDarkMode ? "theme-dark" : "theme-light"}`}>
      <NavBar />
      <div className="main" style={{ display: "flex" }}>
        <LeftComponent />
        <div style={{ flex: 6 }}>
          <Outlet />
        </div>

        {/* <RightComponent /> */}
      </div>
    </main>

    // </section>
  );
};

export default Layout;
