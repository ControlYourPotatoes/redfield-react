import React, { useState, useEffect } from 'react';
import LayoutSwitcher from './LayoutSwitcher';
import { Switch, Box, Button, Card, Typography } from '@mui/material';

// Import might not be used since moved to LayoutSwitcher
import InfoPanel from './InfoPanel';
import PolicyStatus from './PolicyStatus';
import HurricaneMap from './HurricaneMap';
import WeatherWidget from './WeatherWidget';
import {WeatherProvider} from './CurrentWeather/WeatherContext';
import CurrentWeather from './CurrentWeather/CurrentWeather';
import { flexbox } from '@mui/system';
import { PolicyProvider } from './PolicyContext';
import { useAuth } from '../pages/AuthContext'; // Adjust the path as necessary
import sendEmails  from './Emails';
import Emails from './Emails';
import ReceiptComponent from './Map Receipt/ReceiptComponent';

const Dashboard = () => {
  //States
  const [isLiveWeatherEvent, setIsLiveWeatherEvent] = useState<boolean>(false);
  const { currentUser } = useAuth();

  console.log('currentUser: ', currentUser);

  const handleToggleWeatherEvent = () => {
    setIsLiveWeatherEvent((prevState) => !prevState);
  };

  if (!currentUser) {
    // Option 1: Return null or a placeholder component if currentUser isn't available
    return <div>
      
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', // Centers content vertically in the container
          alignItems: 'center', // Centers content horizontally in the container
          border: '1px solid gray',
          minHeight: '100vh', // Ensures the container takes at least the full height of the viewport
          minWidth: '100vw', // Ensures the container takes at least the full width of the viewport
        }}
      >
        <Typography variant='h1'>Loading... </Typography>
      </Box>
      
      
      </div>; // Or return null;
  }

  return (
    
    <div style={{ width: '100%', }}>
        <Box className='Title Container'>
          <h1>Dashboard</h1>
        </Box>
      <Box sx={{ border: '', mt:'100px', display:'flex', flexDirection:'column', alignItems:'center'  }}>

        
        <PolicyProvider policyId={currentUser.id} >
          
            
            
            <PolicyStatus />
        
            <Box >
                <HurricaneMap />
            </Box>

            {/* <WeatherProvider >
              <CurrentWeather/>
            </WeatherProvider> */}
            <Emails />
            <ReceiptComponent/>
          </PolicyProvider>
        
      </Box>
      
      
    </div>
    
  );
};

export default Dashboard;
