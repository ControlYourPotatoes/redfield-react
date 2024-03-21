const baseUrl = 'https://api.openweathermap.org/data/2.5';

const apikey = import.meta.env.VITE_APP_WEATHER_API_KEY;

export const fetchWeatherData = async (city: string | { lat: number; lng: number }) => {
  let url = `${baseUrl}/weather?q=${city}&appid=${apikey}`;

  if (typeof city === 'object') {
    url = `${baseUrl}/weather?lat=${city.lat}&lon=${city.lng}&appid=${apikey}`;
  }
  // console.log('This is the weather data url: ', url);
  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log('Response:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }

};

export const fetchExtendedForecastData = async (city: string | { lat: number; lng: number }) => {
  let url = `${baseUrl}/forecast?q=${city}&appid=${apikey}`;

  if (typeof city === 'object') {
    url = `${baseUrl}/forecast?lat=${city.lat}&lon=${city.lng}&appid=${apikey}`;
  }

  // console.log('This is the forecast weather data url: ', url);
  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log('Forecast Response:', data);
    return data;
  } catch (error) {
    console.error('Forecast Error:', error);
    throw error;
  }
};
