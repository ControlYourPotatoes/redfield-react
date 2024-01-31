import React, { useState } from 'react';
import { Box, TextField, MenuItem } from '@mui/material'
import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet';import 'leaflet/dist/leaflet.css';

const PuertoRicoMap: React.FC = () => {
    const [selectedCoords, setSelectedCoords] = useState<[number, number] | null>(null);

    const MapEvents = () => {
        useMapEvents({
            click(e) {
                setSelectedCoords([e.latlng.lat, e.latlng.lng]);
                console.log(`Selected coordinates: ${e.latlng.lat}, ${e.latlng.lng}`);
            },
        });
        return null;
    };

    return (
        <Box sx={{ borderColor: 'primary.main' }} >
            <MapContainer center={[18.2208, -66.5901]} zoom={9} style={{ height: '500px', width: '200%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapEvents />
            {selectedCoords && <Marker position={selectedCoords} />}
            </MapContainer>
        </Box>
    );
};

export default PuertoRicoMap;
