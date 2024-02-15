import React from 'react';
import { Typography, Button } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  videoContainer: {
    position: 'relative',
    textAlign: 'center',
    backgroundColor: 'white',
    width: '1400px'
  },
  videoText: {
    position: 'absolute',
    top: '40%',
    left: '10%',
    right: '0%',
    transform: 'translate(-10%, -50%)',
  },
  video: {
    width: '100%',
  },
}));

const VideoSection: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.videoContainer}>
      <video className={classes.video} src='/assets/videos/background_home.mp4' autoPlay loop muted />
      <div className={classes.videoText}>
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
