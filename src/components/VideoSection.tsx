import React from 'react';
import { Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom'; // Import for routing to different pages

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
    backgroundColor: 'black', // Background color as a fallback if the video fails to load
    marginTop: '30px', // Adds space around the edges
    boxSizing: 'border-box', // Ensures that padding and border are included in the total width and height
  },
  // Style for the video element
  video: {
    width: 'calc(100% + 40px)', // Counteracts the margin by expanding width
    height: 'calc(100% + 40px)', // Counteracts the margin by expanding height
    objectFit: 'cover', // Ensures the video covers the designated area without distortion
    osition: 'absolute', // Changed to absolute to allow for size adjustment
    top: '20px', // Align to the top of the container
    left: '-20px', // Align to the left of the container
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
    display: 'flex', // This changes depending on your layout preference
    flexDirection: 'column', // Stacks items vertically
    alignItems: 'center', // Centers items horizontally
    justifyContent: 'center', // Adjust this as needed to center the items vertically within the content area
  },
  buttonSpacing: {
    marginTop: '20px', // Adds space above the button
  },
  WithBorder: {
    color: 'white', // Text color to black
    '-webkit-text-stroke': '1px black', // Apply 1px white stroke for the border effect
    marginBottom: '20px', // Consistent with the other Typography components
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
      <video className={classes.video} src='/assets/videos/water_and_trees.mp4' autoPlay loop muted />
      <div className={classes.content}>
        <Typography variant="h2" component="h2"className={classes.WithBorder}>
        Welcome to Redfiled, where the future of insurance is today
        </Typography>
        <Typography variant="body1">
          What are you waiting for?
        </Typography>
        <Link to="/SignInUpForm" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary" className={classes.buttonSpacing}>get Started</Button>
        </Link>
      </div>
    </div>
  );
}

export default VideoSection;