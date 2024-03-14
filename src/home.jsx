import React from 'react';
import './home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <video 
        autoPlay 
        playsInline 
        loop 
        muted
        className="background-video"
      >
        <source src="https://cdn.gracestudio.io/jkpg-city/Header_16_9_03_78b04b7dbf/Header_16_9_03_78b04b7dbf.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="content">
        <h1>Welcome to Jönköping City</h1>
        <p>Experience the charm of our city</p>
      </div>
    </div>
  );
}

export default Home;
