import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from 'react-leaflet';
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


  const startAnimation = () => {
    let pathIndex = 0;

    const interval = setInterval(() => {
      if (pathIndex < hurricanePath.length) {
        const currentPosition = hurricanePath[pathIndex];
        setHurricanePosition(currentPosition)
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
