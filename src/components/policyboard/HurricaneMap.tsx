import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box } from '@mui/material'

import './HurricaneMap.css';

const HurricaneMap: React.FC = () => {
  const [hurricanePosition, setHurricanePosition] = useState<[number, number]>([18.2208, -66.5901]); // Initial position

  // Define a custom icon for the hurricane marker
  const hurricaneIcon = new L.Icon({
    iconUrl: 'path/to/your/hurricane.png', // Replace with your GIF path
    iconSize: [50, 50], // Adjust size as needed
    iconAnchor: [25, 25], // Adjust anchor as needed
  });

  // Update the position of the hurricane marker here as needed
  useEffect(() => {
    // Example: Update position based on some external data
    // setHurricanePosition([newLat, newLng]);
  }, []); // Dependency array based on your data source

  return (
    <Box sx={{ borderColor: 'primary.main', width: '200%' }} >
    <MapContainer center={hurricanePosition} zoom={6} style={{ height: '500px', width: '100px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={hurricanePosition} icon={hurricaneIcon} />
    </MapContainer>
    </Box>
  );
};

export default HurricaneMap;
