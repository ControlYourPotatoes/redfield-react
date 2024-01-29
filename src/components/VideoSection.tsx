import React from 'react';
import '../App.css';
import './VideoSection.css';

// If Button component has specific props, you should import its type here as well

const VideoSection: React.FC = () => {
  return (
    <div className='btns-container'>
      <video src='/assets/videos/water_and_trees.mp4' autoPlay loop muted /> 
      <h1>Shielding You from the Storm: Your Partner in Hurricane Resilience</h1>
      <p>What are you waiting for?</p>
      </div>
      //need to add the miu bottons here
  );
}

export default VideoSection;