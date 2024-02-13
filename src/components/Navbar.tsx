import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

// Define styles using the `styled` utility
const StyledToolbar = styled(Toolbar)(() => ({
  justifyContent: 'space-between',
  backgroundColor: '#2E3B55',
}));

const LogoButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
  '& img': {
    height: '50px',
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
        <LogoButton edge="start" color="inherit" aria-label="logo">
          <Link to="/">
            <img src="/assets/gifs/Templogo.gif" alt="Logo" />
          </Link>
        </LogoButton>
        <div style={{ display: 'flex' }}>
          {/* Wrap Link around Button text for proper routing */}
          <NavLink>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
          </NavLink>
          <NavLink>
            <Link to="/About" style={{ textDecoration: 'none', color: 'white' }}>About</Link>
          </NavLink>
          <NavLink>
            <Link to="/Contact_us" style={{ textDecoration: 'none', color: 'white' }}>Contact Us</Link>
          </NavLink>
          <NavLink>
            <Link to="/Prices" style={{ textDecoration: 'none', color: 'white' }}>Prices</Link>
          </NavLink>
          <NavLink>
            <Link to="/sign-up" style={{ textDecoration: 'none', color: 'white' }}>Sign Up</Link>
          </NavLink>
        </div>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
