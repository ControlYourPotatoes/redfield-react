import React from 'react';
import { useWeather } from './WeatherContext'; // Adjust the import path as necessary
import { celciusToFahrenheit, TempUnit } from './utils/unitConversion'; // Ensure this is correctly imported

interface ITemperatureProps {
  value: number;
}

const Temperature: React.FC<ITemperatureProps> = ({ value }) => {
  const { degreeType } = useWeather(); // Use context to get degreeType

  // Convert value to Fahrenheit if degreeType is FAHRENHEIT, otherwise display as Celsius
  const displayValue = degreeType === TempUnit.FAHRENHEIT ? celciusToFahrenheit(value) : value;

  return <>{displayValue}</>; // Render the temperature value
};

export default Temperature;
