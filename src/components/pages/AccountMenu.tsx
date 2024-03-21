import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, styled, Toolbar, useTheme } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import PetsIcon from '@mui/icons-material/Pets';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import PublicIcon from '@mui/icons-material/Public';
import { scroller } from 'react-scroll'; // Import for smooth scrolling
import { useAuth } from './AuthContext'; // Adjust the path as necessary


function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}


export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [profilePic, setProfilePic] = useState<JSX.Element>(<AccountCircleIcon />);
  const navigate = useNavigate();
  const { authToken, validateAndSetToken, logout } = useAuth(); // Destructure the relevant fields from useAuth
  const isLoggedIn = !!authToken; // Determine if logged in based on the presence of an authToken
  //icons
  const icons = [<FaceIcon />, <TagFacesIcon />, <PetsIcon />];

   

  useEffect(() => {
    // Only attempt to set token from cookie if not already authenticated
    if (!authToken) {
      const tokenFromCookie = getCookie('token');
      if (tokenFromCookie) {
        validateAndSetToken(tokenFromCookie);
      }
    }
  }, [authToken, validateAndSetToken]);


   const scrollToTop = () => {
    if (location.pathname !== '/') {
      navigate('/');
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleNavigationClick = (section: string) => {
    if (location.pathname === '/') {
      // If on the home page, scroll to specific section
      scroller.scrollTo(section, { duration: 800, delay: 0, smooth: 'easeInOutQuart', offset: -70 });
    } else {
      // If not, navigate to the home page with a query parameter
      navigate('/');
      setTimeout(() => {
        scroller.scrollTo(section, { duration: 800, delay: 0, smooth: 'easeInOutQuart', offset: -70 });
      }, 100);
    }
  };

  
  const handleClick = (event: any)  => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleIconSelect = (icon: JSX.Element) => {
    setProfilePic(icon);
    setProfileDialogOpen(false);
  };

  const handleLogin = () => {
    navigate('/SignInUpForm'); // Navigate to login/sign up form
  };

  const handleLogout = () => {
    // Perform logout logic here (e.g., clearing user data)
    logout();
    handleClose();

    navigate('/');
  };

  const handleNavigateToDashboard = () => {
    navigate('/Dashboard');
  };

 
const StyledAppBar = styled(AppBar)({
  background: 'radial-gradient(circle at 47% 42%,rgba(48, 57, 62, 1), rgba(27, 33, 38, 1), #000000)',
  maxHeight: '64px', // Adjust based on your design
  zIndex: 1201, // Ensures AppBar is above most other components
  position: 'fixed', // Fixed position for AppBar
});

const Logo = styled('img')({
  height: '50px',
  // Additional styles
});

const Hurricane = styled('img')({
  height: '60px',
  marginRight: '20px',
  // Additional styles
});

const NavigationContainer = styled(Box)(({ theme }) => ({
  display: 'flex', // Ensures the items inside are laid out as flex items
  alignItems: 'center', // Centers the items vertically
  minWidth: '250px', // Sets a minimum width for the container
  marginLeft: 'auto', // Pushes the container to the end of the toolbar
}));





  return (
    <React.Fragment>
      <StyledAppBar>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Hurricane src="\assets\icon\logoDarkMode.png" alt="New Icon" />
            <Logo src="\assets\logo\redfieldLogoDark.svg" alt="Logo" />
          </Box>

          <NavigationContainer>
            <Button color="inherit" onClick={() => scrollToTop()}>Home</Button>
            <Button color="inherit" onClick={() => handleNavigationClick('about')}>About</Button>
            <Button color="inherit" onClick={() => navigate('/dashboard')}>Dashboard</Button>
            <Button color="inherit" component="a" href="mailto:project.h.redfield@gmail.com" sx={{ textDecoration: 'none', color: 'inherit' }}>
              Contact Us
            </Button>
          </NavigationContainer>

          {!isLoggedIn ? (
            <Button color="inherit" onClick={handleLogin}>Log In</Button>
          ) : (
            <React.Fragment>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>{profilePic}</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                id="account-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={() => setProfileDialogOpen(true)}>Change Profile Picture</MenuItem>
                <MenuItem onClick={handleClose}>
                  <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={handleNavigateToDashboard}>
                  <ListItemIcon>
                    <PublicIcon fontSize="small" />
                  </ListItemIcon>
                  Dashboard
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Log Out
                </MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </Toolbar>

        <Toolbar />
        <Dialog open={profileDialogOpen} onClose={() => setProfileDialogOpen(false)}>
          <DialogTitle>Change Profile Picture</DialogTitle>
          <DialogContent>
            {icons.map((icon, index) => (
              <IconButton key={index} onClick={() => handleIconSelect(icon)}>{icon}</IconButton>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setProfileDialogOpen(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </StyledAppBar>
    </React.Fragment>
  );
}
