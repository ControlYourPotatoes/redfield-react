import React from 'react';
import { Typography, Button } from '@mui/material'; // Importing Typography and Button components from Material-UI
import { makeStyles } from '@mui/styles'; // Importing makeStyles hook from Material-UI for custom styles

/**\
 * Custom styles for the VideoSection component.
 * Utilizes makeStyles hook from Material-UI to create a JSS style object.
 */
const useStyles = makeStyles(() => ({
  // Style for the container that wraps the video and content
  container: {
    position: 'relative', // Relative positioning to allow absolute positioning within
    height: 'calc(100vh - 64px)', // Full viewport height minus the navbar height, adjust 64px according to your navbar's height 
    overflow: 'hidden', // Hide any overflow, ensuring video doesn't extend beyond this container
    backgroundColor: 'gray', // Background color as a fallback if the video fails to load

  },
  // Style for the video element
  video: {
    width: '100%', // Full width to cover the container
    height: '100%', // Full height to cover the container
    objectFit: 'cover', // Ensures the video covers the designated area without distortion
    top: 0, // Align to the top of the container
    left: 0, // Align to the left of the container
    zIndex: -1, // Position behind the content
  },
  // Style for the content overlaying the video
  content: {
    position: 'absolute', // Absolute positioning within the container
    top: '50%', // Center vertically in the visible area below the navbar
    left: '50%', // Center horizontally
    transform: 'translate(-50%, -50%)', // Adjust position to truly center the content
    color: 'white', // Text color for visibility against the video background
    zIndex: 2, // Ensure content is layered above the video
  },
}));

/**
 * VideoSection component displaying a fullscreen video background with overlaid text and a button.
 * Designed to fit below a navbar without overlapping it.
 */
const VideoSection: React.FC = () => {
  const classes = useStyles(); // Using custom styles defined above

  return (
    <div className={classes.container}>
      <video className={classes.video} src='/assets/videos/water_and_trees.mp4' autoPlay loop muted controls/>
      <div className={classes.content}>
        <Typography variant="h1" component="h2">
          Shielding You from the Storm: Your Partner in Hurricane Resilience
        </Typography>
        <Typography variant="body1">
          What are you waiting for?
        </Typography>
        <Button variant="contained" color="primary">Get Started</Button>
      </div>
    </div>
  );
}

export default VideoSection;
