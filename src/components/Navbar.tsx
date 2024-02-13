import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

// Define styles using the `styled` utility
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: 'space-between',
  backgroundColor: '#2E3B55',
}));

const LogoButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
  '& img': {
    height: '50px', // Adjust the size as needed
  },
}));

const NavLink = styled(Button)(({ theme }) => ({
  color: 'white',
  textTransform: 'none',
  marginLeft: theme.spacing(1),
}));

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <StyledToolbar>
        <Link to="/">
          <LogoButton edge="start" color="inherit" aria-label="logo">
            {/* Ensure your image path is correct */}
            <img src="/assets/icon/edited_logo.png" alt="Logo" />
          </LogoButton>
        </Link>
        <div style={{ display: 'flex' }}>
          <NavLink component={Link} to="/">Home</NavLink>
          <NavLink component={Link} to="/About">About</NavLink>
          <NavLink component={Link} to="/Contact_us">Contact Us</NavLink>
          <NavLink component={Link} to="/Prices">Prices</NavLink>
          <NavLink component={Link} to="/sign-up">Sign Up</NavLink>
        </div>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
