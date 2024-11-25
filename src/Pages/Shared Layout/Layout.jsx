import { Outlet } from "react-router-dom";
import NavBar from "../../Components/NavBar/WebNavBar";
import LeftComponent from "../../Components/SideComponents/LeftComponent";

import "../../index.scss";
import { useGlobalContext } from "../../ContextApi/GlobalContext";
import { DropdownProvider } from "../../ContextApi/DropdownContext";

const Layout = () => {
  const { isDarkMode, currentUser } = useGlobalContext();

  // const {current}= useContext(GlobalContext);
  // console.log(isDarkMode);
  return (
    // <section
    //   className={`page ${isDarkMode ? "theme-dark" : "theme-light"}`}
    //   style={{ backgroundColor: "rgb(246, 246, 246)", width: "100%" }}
    // >
    <section className={`page ${isDarkMode ? "theme-dark" : "theme-light"}`}>
      <DropdownProvider>
        <NavBar />
      </DropdownProvider>

      <main className="main" style={{ display: "flex" }}>
        <LeftComponent />
        <article style={{ flex: 6 }}>
          <Outlet />
        </article>
        {/* <RightComponent /> */}
      </main>
    </section>

    // </section>
  );
};

export default Layout;
