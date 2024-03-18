import { ExtendedForecastData, WeatherData } from '../../../types';
import { fetchExtendedForecastData, fetchWeatherData } from './weather';
import { getNextSevenDays } from './utils/dateUtils';
import { kelvinToCelcius } from './utils/unitConversion';

export async function fetchWeather(city: string | { lat: number; lng: number }): Promise<{ weather: WeatherData, forecast: ExtendedForecastData[] }> {
  try {
    const [weatherResponse, forecastResponse] = await Promise.all([
      fetchWeatherData(city),
      fetchExtendedForecastData(city)
    ]);

    if (weatherResponse.cod === 200) {
      // Directly return the transformed data
      return transformWeatherData([weatherResponse, forecastResponse]);
    } else {
      throw new Error(weatherResponse.message || "Failed to fetch weather data");
    }
  } catch (error) {
    throw new Error('Error fetching weather data');
  }
}


export const transformWeatherData = (
  res: any
): {
  weather: WeatherData;
  forecast: ExtendedForecastData[];
} => {
  const weather = res[0] as WeatherData;
  const forecast: ExtendedForecastData[] = [];

  weather.weather = res[0].weather[0];
  weather.main = {
    ...weather.main,
    temp: kelvinToCelcius(weather.main.temp),
    feels_like: kelvinToCelcius(weather.main.feels_like),
    temp_max: kelvinToCelcius(weather.main.temp_max),
    temp_min: kelvinToCelcius(weather.main.temp_min),
  };
  weather.wind.speed = Math.round(weather.wind.speed * 3.6);

  const next7Days = getNextSevenDays();

  res[1].list.forEach((i: any, index: number) => {
    forecast.push({
      day: next7Days[index],
      temp: {
        temp_max: kelvinToCelcius(i.temp.max),
        temp_min: kelvinToCelcius(i.temp.min),
      },
      weather: {
        id: i.weather[0].id,
        main: i.weather[0].main,
      },
    });
  });

  return {
    weather,
    forecast,
  };
};
