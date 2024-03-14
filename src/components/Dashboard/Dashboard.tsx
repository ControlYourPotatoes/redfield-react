import React, { useState, useEffect } from 'react';
import LayoutSwitcher from './LayoutSwitcher';
import { Switch, Box } from '@mui/material';

// Import might not be used since moved to LayoutSwitcher
import InfoPanel from './InfoPanel';
import PolicyStatus from './PolicyStatus';
import HurricaneMap from './HurricaneMap';
import WeatherWidget from './WeatherWidget';

const Dashboard = () => {



  //States
  const [isLiveWeatherEvent, setIsLiveWeatherEvent] = useState<boolean>(false);

  const handleToggleWeatherEvent = () => {
    setIsLiveWeatherEvent((prevState) => !prevState);
  };


  return (
    <div>
      <h1>Dashboard</h1>
      <Switch
        checked={isLiveWeatherEvent}
        onChange={handleToggleWeatherEvent}
        name="weatherEventToggle"
      />
      <LayoutSwitcher isLiveWeatherEvent={isLiveWeatherEvent} />
    </div>
  );
};

export default Dashboard;
