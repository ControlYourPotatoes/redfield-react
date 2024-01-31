import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton } from '@mui/material';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    toolbar: {
      justifyContent: 'space-between',
      backgroundColor: '#2E3B55',
    },
    logoButton: {
      marginRight: theme.spacing(2),
    },
    logoImage: {
      height: '50px', // Adjust the size as needed
    },
    navLinks: {
      display: 'flex',
    },
    navButton: {
      color: 'white',
      textTransform: 'none',
      marginLeft: theme.spacing(1),
    },
  }));

const Navbar: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Link to="/" className={classes.logoButton}>
          <IconButton edge="start" color="inherit" aria-label="logo">
            <img src="public\assets\icon\edited_logo.png" alt="Logo" className={classes.logoImage} />
          </IconButton>
        </Link>
        <div className={classes.navLinks}>
          <Button color="inherit" className={classes.navButton} component={Link} to="/">Home</Button>
          <Button color="inherit" className={classes.navButton} component={Link} to="/About">About</Button>
          <Button color="inherit" className={classes.navButton} component={Link} to="/Contact_us">Contact Us</Button>
          <Button color="inherit" className={classes.navButton} component={Link} to="/Prices">Prices</Button>
          <Button color="inherit" className={classes.navButton} component={Link} to="/sign-up">Sign Up</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;