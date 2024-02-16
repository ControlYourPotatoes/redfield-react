import React, { useState }from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, useTheme, useMediaQuery, Drawer } from '@mui/material';
import { styled } from '@mui/material/styles';
import './Navbar.css';

const MenuIcon = "./assets/icon/Open-icon.png"; // Path to your custom menu icon
const CloseIcon = "./assets/icon/closed-icon.png"; // Path to your custom close icon

// Define styles using the `styled` utility
const StyledToolbar = styled(Toolbar)(() => ({
  justifyContent: 'space-between',
  backgroundColor: '#2E3B55',
}));

const LogoButton = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(2),
  '& img': {
    height: '50px',
  },
}));

const Hurricane = styled('img')(({ theme }) => ({
  //  marginRight: '16px', // Adjust the spacing as needed
  height: '120px', // Adjust the size as needed
  // Add more styles as needed
}));

const IconContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
});
const NavLink = styled(Button)(({ theme }) => ({
  color: 'white',
  textTransform: 'none',
  marginLeft: theme.spacing(1),
}));

const Navbar: React.FC = () => {
  const theme = useTheme();
  // Using useMediaQuery to check for theme breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [menuOpen, setMenuOpen] = useState(false); // State to manage menu icon toggle

  // Toggle function to switch icons
  const toggleMenuIcon = () => {
    setMenuOpen(!menuOpen);
  };

   // Navigation list
   const list = () => (
    <div
      role="presentation"
      onClick={() => setMenuOpen(false)} // Close drawer when a link is clicked
      onKeyDown={() => setMenuOpen(false)} // Close drawer on keydown (optional)
    >
      <Link to="/About">About</Link>
      <Link to="/Contact_us">Contact Us</Link>
      <Link to="/Prices">Prices</Link>
      <Link to="/sign-up">Sign Up</Link>
    </div>
  );


  return (
    <AppBar position="static">
      <StyledToolbar>
        <IconContainer>
          <Hurricane src="./assets/gifs/spinHurricane.gif" alt="New Icon" />
            <LogoButton color="inherit" aria-label="logo">
              <Link to="/">
                <img src="./assets/icon/edited_logo.png" alt="Logo" />
              </Link>
            </LogoButton>
        </IconContainer>
        {isMobile ? (
          // Mobile view - Example: Show a menu icon or a simplified layout
          <>
          <Button color="inherit" onClick={toggleMenuIcon} style={{ padding: 0, minWidth: 'auto' }}>
          {/* Use an img tag for the custom icon */}
          <img 
            src={menuOpen ? CloseIcon : MenuIcon} 
            alt="Menu" 
            style={{ width: 44, height: 70 }} // Adjust size as needed
          />
        </Button>
        <Drawer anchor={'right'} open={menuOpen} onClose={toggleMenuIcon}>
              {list()}
            </Drawer>
          </>
        ) : (
          // Web view - Full navbar links
        <div style={{ display: 'flex' }}>
          {/* Wrap Link around Button text for proper routing */}
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
        )}
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
