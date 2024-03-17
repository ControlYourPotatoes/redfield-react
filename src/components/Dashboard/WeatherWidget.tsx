import React, { useEffect } from 'react';
import { Box } from '@mui/system';
const WeatherWidget = () => {
  useEffect(() => {
    // Dynamically load the weather widget script
    const script = document.createElement('script');
    script.src = 'https://weatherwidget.io/js/widget.min.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Remove the script on component unmount
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
    <Box sx={{ paddingTop: '3.9rem' }}>
    <a
      className="weatherwidget-io"
      href="https://forecast7.com/en/18d22n66d59/puerto-rico/"
      data-label_1="PUERTO RICO"
      data-label_2="WEATHER"
      data-theme="original"
    />
    </Box>
    </>
    
  );
};

export default WeatherWidget;
