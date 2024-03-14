import React, { useState, useEffect } from 'react';
import LayoutSwitcher from './LayoutSwitcher';
import { Switch, Button } from '@mui/material';

// Import the InfoPanel, PolicyStatus, and HurricaneMap components
import InfoPanel from './InfoPanel';

import PolicyStatus from './PolicyStatus';
import HurricaneMap from './HurricaneMap';
import WeatherWidget from './Weatherwidget';

const Dashboard = () => {
  // Mock data for demonstration
  const hurricaneInfo = {
    windSpeed: 120,
    locationCoords: [15.3, -61.3],
    estimatedPayout: 50000,
    warningState: 'High Alert',
    distanceToInsured: 45
  };

  const policyInfo = {
    isActive: true,
    expireDate: '2024-12-31',
    policyId: 'ABC123',
    paymentProcessStatus: 'Pending'
  };

  const mockForecastData = [
    { day: 'Monday', condition: 'Sunny', temperature: 25, icon: '☀️' },
    { day: 'Tuesday', condition: 'Cloudy', temperature: 22, icon: '☁️' },
    { day: 'Wednesday', condition: 'Rainy', temperature: 18, icon: '🌧️' },
    { day: 'Thursday', condition: 'Sunny', temperature: 25, icon: '☀️' },
    { day: 'Friday', condition: 'Sunny', temperature: 25, icon: '☀️' },
    { day: 'Saturday', condition: 'Cloudy', temperature: 22, icon: '☁️' },
    { day: 'Sunday', condition: 'Rainy', temperature: 18, icon: '🌧️' }
  ];
  //States
  const [isLiveWeatherEvent, setIsLiveWeatherEvent] = useState<boolean>(false);

  const handleToggleWeatherEvent = () => {
    setIsLiveWeatherEvent((prevState) => !prevState);
  };


  return (
    <div>
      <Switch
        checked={isLiveWeatherEvent}
        onChange={handleToggleWeatherEvent}
        name="weatherEventToggle"
      />
      <Button variant="contained" onClick={handleToggleWeatherEvent}>
        Toggle Weather Event
      </Button>
      <LayoutSwitcher isLiveWeatherEvent={isLiveWeatherEvent} />
    </div>
  );
};

export default Dashboard;
