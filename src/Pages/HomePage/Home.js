import React from "react";
import "./home.scss";
import ShareStories from "./ShareStories";
import TimeLine from "./TimeLine";
import SharePost from "./SharePost";
import RightComponent from "../Components/RightComponent";

const Home = () => {
  return (
    <div className="main" style={{ display: "flex" }}>
      <div className="home">
        <ShareStories />
        <SharePost />
        {/* <TimeLine /> */}
      </div>
      <RightComponent />
    </div>
  );
};

export default Home;
