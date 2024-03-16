import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Button } from '@mui/material';

const HurricaneMap: React.FC = () => {
  const [hurricanePosition, setHurricanePosition] = useState<[number, number]>([15.3, -61.3]);
  const [hurricanePath, setHurricanePath] = useState<[number, number][]>([]);

  const hurricaneIcon = new L.Icon({
    iconUrl: 'assets/gifs/hurricaneicon.gif',
    iconSize: [50, 50],
    iconAnchor: [25, 25],
  });

  useEffect(() => {
    fetch('\mariaPath.json')
      .then(response => response.json())
      .then(data => {
        setHurricanePath(data);
      })
      .catch(error => console.error("Failed to load hurricane path data:", error));
  }, []);

  const startAnimation = () => {
    let pathIndex = 0;

    const interval = setInterval(() => {
      if (pathIndex < hurricanePath.length) {
        setHurricanePosition(hurricanePath[pathIndex]);
        pathIndex += 1;
      } else {
        clearInterval(interval);
      }
    }, 1000);
  };

  return (
    <>
    <Box sx={{ background: 'primary.main', width:'40%', height: '300px', padding: '30px', borderWidth: '20px', minWidth: '20rem'}} >
      <MapContainer center={hurricanePosition} zoom={6} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={hurricanePosition} icon={hurricaneIcon} />
        <Polyline positions={hurricanePath} color="red" />
      </MapContainer> 
    </Box>
      <Button onClick={startAnimation} variant="contained" color="primary" style={{ marginTop: '10px' }}>
        Start Animation
      </Button>
    </>
    
  );
};

export default HurricaneMap;
