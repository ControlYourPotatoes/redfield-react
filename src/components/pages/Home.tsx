import React from 'react';
import { Typography, Button, Paper } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
  paper: {
    position: 'relative',
    height: '100vh', // Adjust height as necessary
    overflow: 'hidden', // Prevent video overflow
    backgroundColor: 'gray', // Fallback color in case the video doesn't load
  },
  video: {
    width: '100%',
    height: '100%', // Adjust this to '100vh' if you want the video to cover the full viewport height
    objectFit: 'cover', // Ensure video covers the paper area
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1, // Video stays in the background
  },
  content: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white', // Adjust based on your design needs
    zIndex: 2, // Ensure text appears above the video
  },
}));

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={3}>
      <div className={classes.content}>
        <Typography variant="h1" component="h2">
          Shielding You from the Storm: Your Partner in Hurricane Resilience
        </Typography>
        <Typography variant="body1">
          What are you waiting for?
        </Typography>
        <Button variant="contained" color="primary">Get Started</Button>
      </div>
    </Paper>
  );
}

export default Home;
