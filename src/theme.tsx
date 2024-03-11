// theme.js

import { createTheme } from '@mui/material/styles';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6', // Example primary color
    },
    secondary: {
      main: '#19857b', // Example secondary color
    },
    error: {
      main: '#f44336', // Example error color
    },
  },
  // You can customize typography, breakpoints, etc., here
});

export default theme;
