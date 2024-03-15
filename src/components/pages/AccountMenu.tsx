import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, animateScroll as scroll } from 'react-scroll';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      navigate('/'); // Navigate to home upon logout
    } else {
      navigate('/SignInUpForm'); // Navigate to login/sign up form
    }
  };

  const scrollToSection = (sectionId) => {
    // Check if we're already on the homepage
    if (location.pathname === '/') {
      scroll.scrollTo(sectionId);
    } else {
      navigate('/'); // Navigate to the home page first
      setTimeout(() => scroll.scrollTo(sectionId), 0); // Adjust timing if needed
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Button onClick={() => scrollToSection('home')} color="inherit">Home</Button>
        <Button onClick={() => scrollToSection('prices')} color="inherit">Prices</Button>
        <Button onClick={() => scrollToSection('about')} color="inherit">About</Button>
        <Typography sx={{ flexGrow: 1 }} />

        {isLoggedIn ? (
          <Tooltip title="Account settings">
            <IconButton onClick={handleMenu} size="small" sx={{ ml: 2 }} aria-controls={open ? 'account-menu' : undefined} aria-haspopup="true">
              <Avatar sx={{ width: 32, height: 32 }}><AccountCircleIcon /></Avatar>
            </IconButton>
          </Tooltip>
        ) : (
          <Button color="inherit" onClick={handleLoginLogout}>{isLoggedIn ? 'Log Out' : 'Log In'}</Button>
        )}
      </Box>

      {isLoggedIn && (
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleLoginLogout}>Log Out</MenuItem>
        </Menu>
      )}
    </React.Fragment>
  );
}
