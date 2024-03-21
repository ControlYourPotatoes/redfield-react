import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import {fetchWeather} from './fetchWeather';
import {WeatherData, ExtendedForecastData} from '../../../types';
import { TempUnit } from './utils/unitConversion';
import {Typography} from '@mui/material';
import PolicyContext from '../PolicyContext';
import { useAuth } from '../../pages/AuthContext';
interface WeatherContextType {
    weather: WeatherData | null;
    forecast: ExtendedForecastData[] | null;
    degreeType: TempUnit;
    setDegreeType: (degreeType: string) => void;
    fetchWeather: (city: string | { lat: number; lng: number }) => Promise<void>; // Note this change to include parameters
    loading: boolean;
    error: Error | null;
    darkMode: boolean;
    toggleDarkMode: () => void;
  }
  
  const WeatherContextDefaultValues: WeatherContextType = {
    weather: null,
    forecast: null,
    degreeType: TempUnit.CELCIUS, 
    setDegreeType: () => {},
    fetchWeather: async () => {},
    loading: false,
    error: null,
    darkMode: JSON.parse(localStorage.getItem('darkMode') || 'false'),
    toggleDarkMode: () => {},
  };

const WeatherContext = createContext<WeatherContextType>(WeatherContextDefaultValues);

interface WeatherProviderProps {
  children: ReactNode;
  initialCoords?: { lat: number; lng: number }; // Optional prop for initial coordinates
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children, initialCoords }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ExtendedForecastData[] | null>(null);
  const [degreeType, setDegreeTypeInternal] = useState<TempUnit>(TempUnit.CELCIUS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [darkMode, setDarkMode] = useState(WeatherContextDefaultValues.darkMode);
  
  const { currentUser } = useAuth();
  const { policyData } = useContext(PolicyContext); // Corrected to destructure policyData

  if (!policyData || !currentUser) {
    return <Typography variant='h1' >Loading...</Typography>;
  }

  

  const testLocation = { lat: 40.7128, lng: -74.0060 };

  const defaultCoords = { lat: 18.4655, lng: -66.1057 };

  const coords = policyData?.coordinates ? { lat: policyData.coordinates.latitude, lng: policyData.coordinates.longitude } : defaultCoords;

  console.log("Policy Data Coordinates: ", policyData?.coordinates);

  const fetchWeatherContext = async (city: string | { lat: number; lng: number }) => {
    setLoading(true);
    try {
      const { weather, forecast } = await fetchWeather(city);
      setWeather(weather);
      setForecast(forecast);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch data'));
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch weather data for the provided or default location when the component mounts or coords change
    fetchWeatherContext(coords);
  }, [coords.lat, coords.lng]);

  const setDegreeType = () => {
    setDegreeTypeInternal(prevDegreeType => 
      prevDegreeType === TempUnit.CELCIUS ? TempUnit.FAHRENHEIT : TempUnit.CELCIUS);
  };


  const toggleDarkMode = useCallback(() => {
    const newDarkModeState = !darkMode;
    localStorage.setItem('darkMode', newDarkModeState.toString());
    setDarkMode(newDarkModeState);
  }, [darkMode]);

  const value = {
    weather,
    forecast, // Ensure forecast is included here
    degreeType,
    setDegreeType, // This function allows you to change the degreeType state
    fetchWeather: fetchWeatherContext, // This function is your context-specific wrapper over the fetchWeather function
    loading,
    error,
    darkMode,
    toggleDarkMode
  };

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
};

// Custom hook to use the weather context
export const useWeather = () => useContext(WeatherContext);

