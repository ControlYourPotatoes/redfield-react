// theme.d.ts

import { Theme as MuiTheme } from '@mui/material/styles';
import { Theme } from './path/to/your/customThemeFile'; // Import your Theme interface

declare module '@mui/material/styles' {
  interface Theme {
    custom: Theme; // Add custom theme properties
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    custom?: Theme;
  }
}
