import React from 'react';
import { Box } from '@mui/material';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface PuertoRicoMapProps {
    lat: number | null;
    lng: number | null;
  }
// Modify the component to accept props
const PuertoRicoMap: React.FC<PuertoRicoMapProps> = ({ lat, lng }) => {
    // Directly use lat and lng props to set marker
    return (
        <Box sx={{ borderColor: 'primary.main' }} >
            <MapContainer center={[18.2208, -66.5901]} zoom={9} style={{ height: '500px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Use lat and lng props for Marker position */}
                {lat && lng && <Marker position={[lat, lng]} />}
            </MapContainer>
        </Box>
    );
};

export default PuertoRicoMap;
