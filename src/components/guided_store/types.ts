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
  