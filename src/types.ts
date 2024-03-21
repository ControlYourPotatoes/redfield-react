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

export interface AuthContextType {
  currentUser: any; // You can replace 'any' with a more specific type for your user
  authToken: string;
  validateAndSetToken: (token: string) => void;
  login: (token: string) => void;
  logout: () => void;
}

export type WeatherData = {
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
}

export type ExtendedForecastData = {
  day: string;
  temp: {
    temp_min: number;
    temp_max: number;
  };
  weather: {
    id: number;
    main: string;
  };
}
