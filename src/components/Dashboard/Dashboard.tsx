import React, { useState, useEffect } from 'react';
import LayoutSwitcher from './LayoutSwitcher';
import { Switch, Box, Button } from '@mui/material';

// Import might not be used since moved to LayoutSwitcher
import InfoPanel from './InfoPanel';
import PolicyStatus from './PolicyStatus';
import HurricaneMap from './HurricaneMap';
import WeatherWidget from './WeatherWidget';
import {WeatherProvider} from './CurrentWeather/WeatherContext';
import CurrentWeather from './CurrentWeather/CurrentWeather';
import { flexbox } from '@mui/system';
import { PolicyProvider } from './PolicyContext';

const Dashboard = () => {
  //States
  const [isLiveWeatherEvent, setIsLiveWeatherEvent] = useState<boolean>(false);

  const handleToggleWeatherEvent = () => {
    setIsLiveWeatherEvent((prevState) => !prevState);
  };


  return (
    <div style={{ width: '100%', }}>

      
      <Box sx={{ border: '1px gray solid', mt:'100px', display:'flex', flexDirection:'column', alignItems:'center'  }}>
        <Box>
          <h1>Dashboard</h1>
          <h1>Dashboard</h1>
        </Box>
        <Box>
          <h1>Dashboard</h1>
          <h1>2</h1>
        </Box>
        <Box>
          <h1>Dashboard</h1>
          <h1>Dashboard</h1>
        </Box>
      
        <Button onClick={handleToggleWeatherEvent}> name="weatherEventToggle"</Button>
        <PolicyProvider policyId="b8869331-d076-4d26-a13d-f808d2a2e966">
            <PolicyStatus />
        </PolicyProvider>
        
        <WeatherProvider>
          <CurrentWeather/>
        </WeatherProvider>

        
      </Box>
      
      
    </div>
  );
};

export default Dashboard;
