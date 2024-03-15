import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import PetsIcon from '@mui/icons-material/Pets';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import PublicIcon from '@mui/icons-material/Public';
import PersonAdd from '@mui/icons-material/PersonAdd';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [profilePic, setProfilePic] = useState<JSX.Element>(<AccountCircleIcon />);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const icons = [<FaceIcon />, <TagFacesIcon />, <PetsIcon />];


  useEffect(() => {
    // Check if the authToken exists in local storage to set the login status
    const authToken = localStorage.getItem('authToken');
    setIsLoggedIn(!!authToken);
  }, []);
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
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
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Perform logout logic here (e.g., clearing user data)
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    handleClose();

     // Navigate to Home page on logout
     navigate('/');
  };

  const handleNavigateToDashboard = () => {
    navigate('/Dashboard');
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Typography sx={{ minWidth: 100 }}>Home</Typography>
        <Typography sx={{ minWidth: 100 }}>Prices</Typography>
        <Typography sx={{ minWidth: 100 }}>About</Typography>
        <Typography sx={{ minWidth: 100 }}>Contact Us</Typography>
        {!isLoggedIn ? (
          <Button color="inherit" onClick={handleLogin}>Log In</Button>
        ) : (
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>{profilePic}</Avatar>
            </IconButton>
          </Tooltip>
        )}
      </Box>
      {isLoggedIn && (
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
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
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Log Out
          </MenuItem>
        </Menu>
      )}
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
    </React.Fragment>
  );
}
