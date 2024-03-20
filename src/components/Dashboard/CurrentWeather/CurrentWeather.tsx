import React, { useEffect } from 'react';

import { useWeather } from './WeatherContext';

import HighIcon from '../../../Icons/HighIcon';
import HumidityIcon from '../../../Icons/HumidityIcon';
import LowIcon from '../../../Icons/LowIcon';
import PressureIcon from '../../../Icons/PressureIcon';
import WindIcon from '../../../Icons/WindIcon';



import { kmToMile, TempUnit } from './utils/unitConversion';
import ToggleSwitch from './ToggleSwitch';
import WeatherIcon from './WeatherIcon';
import {
  CurrentWeatherStatus,
  CurrentWeatherContainer,
  CurrentWeatherInfo,
  FeelsLike,
  HighLowContainer,
  InfoRow,
  SectionTitle,
  WeatherContainer,
  WeatherDegree,
} from './styled';
import Temperature from './Temperature';
import { Card } from '@mui/material';


const CurrentWeather: React.FC = () => {
  const { weather, setDegreeType, degreeType, toggleDarkMode, error } = useWeather();



  if (!weather) return <> Fetching Weather Data</>;

  return (
    <Card raised style={{ maxWidth: '530', height: '100%', padding: '1rem', margin: '1rem'}}>
    
      <div style={{ display: 'flex', justifyContent: 'space-between', border:'', margin:'' }}>
        <SectionTitle>Current Weather</SectionTitle>
        <div>
        <ToggleSwitch onClick={setDegreeType} />

        </div>
      </div>
      <CurrentWeatherContainer>
        <CurrentWeatherStatus>
          <h4>{weather.name}</h4>
          <div style={{ display: 'flex' }}>
            <WeatherIcon code={weather.weather.id} big />
            <span>
              <Temperature value={weather.main.temp} />
              <sup>&deg;</sup>
            </span>
          </div>
          <h6>{weather.weather.description}</h6>
        </CurrentWeatherStatus>

        <CurrentWeatherInfo>
          <FeelsLike>
            Feels like <Temperature value={weather.main.feels_like} />
            <sup>&deg;</sup>
          </FeelsLike>
          <HighLowContainer>
            <WeatherDegree>
              <HighIcon />
              <Temperature value={weather.main.temp_max} />
              <sup>&deg;</sup>
            </WeatherDegree>
            <WeatherDegree>
              <LowIcon />
              <Temperature value={weather.main.temp_min} />
              <sup>&deg;</sup>
            </WeatherDegree>
          </HighLowContainer>
          <InfoRow>
            <div>
              <HumidityIcon /> Humidity
            </div>
            <span>{weather.main.humidity}%</span>
          </InfoRow>
          <InfoRow>
            <div>
              <WindIcon /> Wind
            </div>
            <span>
              {degreeType === TempUnit.CELCIUS ? weather.wind.speed : kmToMile(weather.wind.speed)}
              {degreeType === TempUnit.CELCIUS ? 'kph' : 'mph'}
            </span>
          </InfoRow>
          <InfoRow>
            <div>
              <PressureIcon /> Pressure
            </div>
            <span>{weather.main.pressure}hPa</span>
          </InfoRow>
        </CurrentWeatherInfo>
      </CurrentWeatherContainer>
    
    </Card>
  );
};

export default CurrentWeather;
