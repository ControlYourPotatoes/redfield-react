// In your types.ts file

export interface PolicyInfo {
    id: string;
    type: string;
    coordinates: [number, number];
    address: string;
  }
  
  export interface PersonalInfo {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
  }
  
  interface PaymentInfo {
    type: 'wallet' | 'card';
  }
  
  export interface FormData {
    policy: PolicyInfo;
    personalInfo: PersonalInfo;
    payment: PaymentInfo;
  }
  

// Update the Typography component's variant prop to accept the new custom variants
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    cardlabel: React.CSSProperties;
    cardvalue: React.CSSProperties;
  }

  // Allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    cardlabel?: React.CSSProperties;
    cardvalue?: React.CSSProperties;
  }
}

// Update the Typography component's variant prop to accept the new custom variants
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    cardlabel: true;
    cardvalue: true;
    // Optionally, disable some existing variants by setting them to false, if necessary
  }
}

export interface AuthContextType {
  currentUser: any; // You can replace 'any' with a more specific type for your user
  authToken: string;
  login: (token: string) => void;
  logout: () => void;
}


declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
  const src: string;
  export default src;
}

