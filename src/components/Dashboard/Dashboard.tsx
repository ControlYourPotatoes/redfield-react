import React, { useState, useEffect } from 'react';
import LayoutSwitcher from './LayoutSwitcher';
import { Switch, Box, Typography } from '@mui/material';
import ReceiptComponent from './Map Receipt/ReceiptComponent';

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
    <Box sx={{ padding: '20px'}}>
      <Typography variant="h4">Dashboard Placeholder</Typography>
      <HurricaneMap />
      <ReceiptComponent
        policyHolder={{
          firstName: 'Sofia',
          lastName: 'Smith',
          email: 'sofia@test.com',
          address: '123 Main St'
          
        }}
        policyType="standard"
        hurricaneDetails={{ category: 3 }}
        date="04-21-2024"
        windspeed='123 mph'
      />
          
    <div>
      <h1>Dashboard</h1>
      <Switch
        checked={isLiveWeatherEvent}
        onChange={handleToggleWeatherEvent}
        name="weatherEventToggle"
        />
      <LayoutSwitcher isLiveWeatherEvent={isLiveWeatherEvent} />
    </div>
        </Box>
  );
};

export default Dashboard;
