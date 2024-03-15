// In your types.ts file
import '@mui/material/styles';

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

