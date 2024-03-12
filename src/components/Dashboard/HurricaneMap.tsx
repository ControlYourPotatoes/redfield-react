import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Button } from '@mui/material';

const HurricaneMap = () => {
  const [hurricanePosition, setHurricanePosition] = useState([15.3, -61.3]);
  const [hurricanePath, setHurricanePath] = useState([]);

  const hurricaneIcon = new L.Icon({
    iconUrl: '/assets/gifs/hurricaneicon.gif',
    iconSize: [150, 150],
    iconAnchor: [75, 75],
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/hurricane')
      .then(response => response.json())
      .then(data => {
        const transformedPath = data.path.map(point => [point.lat, point.lon]);
        setHurricanePath(transformedPath);
      })
      .catch(error => console.error("Failed to load hurricane path data:", error));
  }, []);

  const sendEmail = (message) => {
    fetch('http://localhost:8080/api/send-notification', {
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

  const startAnimation = () => {
    let pathIndex = 0;

    const interval = setInterval(() => {
      if (pathIndex < hurricanePath.length) {
        const currentPosition = hurricanePath[pathIndex];
        setHurricanePosition(currentPosition);

        if (currentPosition[0] === hurricanePath[1][0] && currentPosition[1] === hurricanePath[1][1]) {
          const emailMessage = `Dear insured,      
We hope this message finds you well amidst these challenging times. As a committed partner in your safety and well-being, Redfield Insurance is closely monitoring the progression of the hurricane, which has now reached a significant milestone in its approach towards our area.
<strong>Hurricane Update:</strong>
The hurricane has reached the first critical point, signaling that it is advancing as anticipated and now presents a tangible risk to our community. This development necessitates our collective immediate action to prepare and mitigate its potential impacts.
Your Insurance Coverage:
As the hurricane approaches, we at Redfield Insurance want to remind you of the special provisions in your policy designed for swift and uncomplicated support during natural disasters:
Action & Preparedness Tips:
- Secure any outdoor items that could become hazards in strong winds.
- Document your valuables and property with photos or videos for any future claims.
- Keep abreast of local advisories and make necessary preparations for your safety.
We're Here to Support You:
Redfield's team is on standby, ready to assist you through this period. Our emergency support line is available 24/7.`;
          sendEmail(emailMessage);
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
    <Box sx={{ borderColor: 'primary.main', width: '100%' }}>
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
