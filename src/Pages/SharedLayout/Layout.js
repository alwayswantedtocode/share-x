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
  console.log(isDarkMode);
  return (
    <section
      className={`theme-${isDarkMode ? "dark" : "light"}`}
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
