import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Button } from '@mui/material';

const HurricaneMap = () => {
  const [hurricanePosition, setHurricanePosition] = useState([15.3, -61.3]);
  const [hurricanePath, setHurricanePath] = useState([]);

  const hurricaneIcon = new L.Icon({
    iconUrl: 'assets/gifs/hurricaneicon.gif',
    iconSize: [50, 50],
    iconAnchor: [25, 25],
    iconUrl: '/assets/gifs/hurricaneicon.gif',
    iconSize: [150, 150],
    iconAnchor: [75, 75],
  });

  useEffect(() => {
    fetch('http://localhost:3001/api/hurricane')
      .then(response => response.json())
      .then(data => {
        const transformedPath = data.path.map(point => [point.lat, point.lon]);
      setHurricanePath(transformedPath);
      })
      .catch(error => console.error("Failed to load hurricane path data:", error));
  }, []);


  const startAnimation = () => {
    let pathIndex = 0;
    //let emailSent = false; // To ensure the email is sent only once

    const sendEmail = (message) => {
      fetch('http://localhost:3001/api/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
    };

    const interval = setInterval(() => {
      if (pathIndex < hurricanePath.length) {
        const currentPosition = hurricanePath[pathIndex];
        setHurricanePosition(currentPosition);
        
        // Example condition to send an email
        // if (!emailSent && currentPosition[0] === 18.49694743514779 && currentPosition[1] === -66.98600567820672) {
        //   fetch('http://localhost:3001/api/send-sms', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //   })
        //   .then(response => response.json())
        //   .then(data => console.log(data))
        //   .catch(error => console.error('Error:', error));
        // }

        // Trigger email at specific points
      if (currentPosition[0] === hurricanePath[1][0] && currentPosition[1] === hurricanePath[1][1]) {
        sendEmail("The hurricane has reached the first critical point.");
      } else if (currentPosition[0] === hurricanePath[2][0] && currentPosition[1] === hurricanePath[2][1]) {
        sendEmail("Confirmation: The hurricane has hit the second mark.");
      } else if (currentPosition[0] === hurricanePath[3][0] && currentPosition[1] === hurricanePath[3][1]) {
        sendEmail("The hurricane has left the third mark.");
      }
        pathIndex += 1;
      } else {
        clearInterval(interval);
      }
    }, 500);
  };

  return (
    <Box sx={{ borderColor: 'primary.main', width: '100%' }} >
      <MapContainer center={hurricanePosition} zoom={6} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={hurricanePosition} icon={hurricaneIcon} />
        <Polyline positions={hurricanePath} color="red" />
      </MapContainer>
      <Button onClick={startAnimation} variant="contained" color="primary" style={{ marginTop: '10px' }}>
        Start Animation
      </Button>
    </Box>
  );
};

export default HurricaneMap;
