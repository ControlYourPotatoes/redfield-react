import React, { useState, useEffect }from 'react';
import { Link as RouterLink, useLocation, useNavigate} from 'react-router-dom'; // Import for routing to different pages
import { AppBar, Toolbar, Button, useTheme, useMediaQuery, Drawer, Box, styled, Link as MuiLink} from '@mui/material';
import { scroller , animateScroll as scroll } from 'react-scroll'; // Import for smooth scrolling
import AccountMenu from './pages/AccountMenu'; // Import AccountMenu component
import './Navbar.css';

const MenuIcon = "./assets/icon/Open-icon.png"; // Path to your custom menu icon
const CloseIcon = "./assets/icon/closed-icon.png"; // Path to your custom close icon

// Define styles using the `styled` utility
const StyledToolbar = styled(Toolbar)(() => ({
  justifyContent: 'space-between',
  backgroundColor: '#2E3B55',
  maxHeight: '3rem',
}));

const LogoButton = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(2),
  '& img': {
    height: '50px',
  },
}));

const Hurricane = styled('img')(({ }) => ({
  //  marginRight: '16px', // Adjust the spacing as needed
  height: '100px', // Adjust the size as needed
  // Add more styles as needed
}));

const IconContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

// Define a styled button with consistent font size and family
const StyledButton = styled(Button)({
  fontSize: '16px', // Set your desired font size
  fontFamily: 'Arial, sans-serif', // Set your desired font family
  textTransform: 'none', // Optional: prevents uppercase transformation
  textDecoration: 'none',
  marginBottom: '10px', // Adjust spacing as needed
});

const Navbar: React.FC = () => {
  const theme = useTheme();
  // Using useMediaQuery to check for theme breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation(); // Hook to get the current location
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [menuOpen, setMenuOpen] = useState(false); // State to manage menu icon toggle
  const [visible, setVisible] = useState(true); // New state to control Navbar visibility

  useEffect(() => {
    // Close the mobile menu when the location changes
    setMenuOpen(false);
  }, [location]);

  // New useEffect hook to handle scroll and idle behavior
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let idleTimer: ReturnType<typeof setTimeout>; // Timer to track idle time

    const handleScroll = () => {
      // Clear existing timer on scroll start
      clearTimeout(idleTimer);

      // Determine scroll direction
      const currentScrollY = window.scrollY;
      setVisible(lastScrollY > currentScrollY || currentScrollY < 10);
      lastScrollY = currentScrollY;

      // Set a timer to mark idle state and show navbar
      idleTimer = setTimeout(() => {
        setVisible(true); // Show navbar after idle time
      }, 1000); // 2000ms = 2 seconds of idle time before showing navbar
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(idleTimer);
    };
  }, []);

  const handleNavigationClick = (section: string) => {
    if (location.pathname === '/') {
      // If on the home page, scroll to specific section
      scroller.scrollTo(section, { duration: 500, offset: -100 });
    } else {
      // If not, navigate to the home page with a query parameter
      navigate(`/?scrollTo=${section}`);
    }
  };

  const handleHomeClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    }
    scroll.scrollToTop();
  };

    // Function to return the appropriate text color based on the viewport
    const getButtonTextColor = () => isMobile ? 'black' : 'white';

   // Navigation list
   const navigationList = () => (
    <Box 
      role="presentation"
      onClick={() => setMenuOpen(false)} // Close drawer when a link is clicked
      onKeyDown={() => setMenuOpen(false)} // Close drawer on keydown (optional)
      style={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        padding: '10px',
        gap: isMobile ? '10px' : '20px',
      }}
    >
      <StyledButton onClick={handleHomeClick} style={{color: getButtonTextColor()}}>Home</StyledButton>
      <StyledButton onClick={() => handleNavigationClick('about')} style={{color: getButtonTextColor()}}>About</StyledButton>
      <StyledButton onClick={() => handleNavigationClick('prices')} style={{color: getButtonTextColor()}}>Prices</StyledButton>
      <a href="mailto:project.h.redfield@gmail.com" style={{ textDecoration: 'none' }}>
      <StyledButton style={{color: getButtonTextColor()}}>Contact Us</StyledButton>
      </a>
      <MuiLink component={RouterLink} to="/GuidedStore" style={{ textDecoration: 'none' }}>
        <StyledButton style={{color: getButtonTextColor()}}>Get Started</StyledButton>
      </MuiLink>
      <MuiLink component={RouterLink} to="/Dashboard" style={{ textDecoration: 'none' }}>
        <StyledButton style={{color: getButtonTextColor()}}>Dashboard</StyledButton>
      </MuiLink>
      <MuiLink component={RouterLink} to="/InvestorDashboard" style={{ textDecoration: 'none' }}>
        <StyledButton style={{color: getButtonTextColor()}}>InvestorDashboard</StyledButton>
      </MuiLink>
    </Box>
  );


  return (
    <AppBar position="fixed" style={{ transition: 'top 0.3s', top: visible ? '0' : '-100px' }}>
      <StyledToolbar>
        <IconContainer>
          <Hurricane src="./assets/gifs/spinHurricane.gif" alt="New Icon" />
          <MuiLink component={RouterLink} to="/" style={{ textDecoration: 'none' }}>
            <LogoButton>
              <img src="/assets/icon/edited_logo.png" alt="Logo" />
            </LogoButton>
          </MuiLink>
        </IconContainer>
        {isMobile ? (
          // Mobile view - Example: Show a menu icon or a simplified layout
          <>
            <Button color="inherit" onClick={() => setMenuOpen(!menuOpen)} sx={{ padding: 0, minWidth: 'auto' }}>
              <img src={menuOpen ? CloseIcon : MenuIcon} alt="Menu" style={{ width: 44, height: 44 }} />
            </Button>
            <Drawer anchor={'right'} open={menuOpen} onClose={() => setMenuOpen(false)}>
              {navigationList()}
              <AccountMenu />
            </Drawer>
          </>
        ) : (
          // Web view - Full navbar links
          <>
            {navigationList()}
            <AccountMenu />
          </>
        )}
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
