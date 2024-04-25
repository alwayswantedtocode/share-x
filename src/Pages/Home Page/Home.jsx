import React from "react";
import "../../Components/HomePage Components/home.scss";
import ShareStories from "../../Components/HomePage Components/ShareStories";
import TimeLine from "../../Components/HomePage Components/TimeLine";
import SharePost from "../../Components/HomePage Components/SharePost";
import RightComponent from "../../Components/SideComponents/RightComponent";

const Home = () => {
  return (
    <div className="main" style={{ display: "flex" }}>
      <div className="home">
        <ShareStories />
        <SharePost />
        <TimeLine />
      </div>
      <RightComponent />
    </div>
  );
};

export default Home;
