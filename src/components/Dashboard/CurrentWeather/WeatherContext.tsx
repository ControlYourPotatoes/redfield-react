import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import {fetchWeather} from './fetchWeather';
import {WeatherData, ExtendedForecastData} from '../../../types';
import { TempUnit } from './utils/unitConversion';


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
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ExtendedForecastData[] | null>(null);
  const [degreeType, setDegreeTypeInternal] = useState<TempUnit>(TempUnit.CELCIUS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [darkMode, setDarkMode] = useState(WeatherContextDefaultValues.darkMode);

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

