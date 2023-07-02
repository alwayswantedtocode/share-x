import React from "react";
import "./home.scss";
import ShareStories from "./ShareStories";
import TimeLine from "./TimeLine";
import SharePost from "./SharePost";


const Home = () => {
  return (
    <div className="home">
      <ShareStories />
      <SharePost />
      <TimeLine />
     
    </div>
  );
};

export default Home;
