import React from "react";
import './home.scss';
import ShareStories from "./ShareStories";
import TimeLine from "./TimeLine";

const Home = () => {
  return (
    <div className="home">
      <ShareStories/>

      <TimeLine/>
     
    </div>
  );
};

export default Home;
