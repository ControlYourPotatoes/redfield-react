// theme.js

import { createTheme } from '@mui/material/styles';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6', // Example primary color
    },
    secondary: {
      main: '#9b9f9a', // Example secondary color
    },
    error: {
      main: '#f44336', // Example error color
    },
  },
  // You can customize typography, breakpoints, etc., here
  typography: {
    cardlabel: {
      fontSize: '1rem',
      color: 'theme.pallete.error',
    },
    cardvalue: {
      fontSize: '1rem',
      color: 'black',
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
