import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Button, Card, CardContent } from '@mui/material';

interface HurricanePathPoint {
  point: string; // "POINT(-longitude latitude)"
  iso_time: string;
  dist2land: number;
  usa_wind: string;
  usa_pressure: string;
  usa_sshs: string;
  radius_34kt: string | null;
  radius_50kt: string | null;
}


interface HurricaneData {
  path: HurricanePathPoint[];
}

interface HurricaneMapProps {
  hurricaneData?: HurricaneData; // Optional prop
}


const baseUrl = import.meta.env.VITE_API_BASE_URL || '';


const HurricaneMap: React.FC<HurricaneMapProps> = ({ hurricaneData }) => {
  const [hurricanePosition, setHurricanePosition] = useState<[number, number]>([15.3, -61.3]);
  const [hurricanePath, setHurricanePath] = useState<[number, number][]>([]);

  const email = `hector.r.rodriguezlopez@gmail.com`;
  const hurricaneIcon = new L.Icon({
    iconUrl: 'assets/gifs/hurricaneicon.gif',
    iconSize: [100, 100],
    iconAnchor: [50, 50],
  });

  function parsePointToPointArray(pointStr: string): [number, number] {
    const coords = pointStr.match(/-?\d+\.?\d*/g);
    if (!coords) throw new Error("Invalid point format");
    const [longitude, latitude] = coords.map(Number);
    return [latitude, longitude]; // Ensure latitude is first
  }

  

  useEffect(() => {
    if (!hurricaneData) {
      const url = `${baseUrl}/api/hurricane`;
      // console.log("Trying to fetch hurricane path data from:", url);
  
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const pathData = data; // Assuming the data format directly matches your example
          if (pathData && Array.isArray(pathData)) {
            const formattedPath: [number, number][] = pathData.map(entry => {
              const [latitude, longitude] = parsePointToPointArray(entry.point);
              return [latitude, longitude];
            });
            setHurricanePath(formattedPath);
            if (formattedPath.length > 0) {
              setHurricanePosition(formattedPath[0]);
            }
          }
        })
        .catch(error => console.error("Failed to load hurricane path data:", error));
    }
  }, [hurricaneData, baseUrl]);
  

  
const startAnimation = () => {
  let pathIndex = 0;

  const interval = setInterval(() => {
    if (pathIndex < hurricanePath.length) {
      setHurricanePosition(hurricanePath[pathIndex]);
      pathIndex += 1;
    } else {
      clearInterval(interval);
    }
  }, 50); // Adjust the interval as necessary
};


  return (
    <Card raised sx={{backgroundColor:'#E0E0E0',borderRadius: '5px', padding: '1rem',margin: '10px' }}>
        <CardContent sx={{display:'flex', flexDirection:'column'}}>

        <Box sx={{ width:'430px', height: '100%x', padding: '10px'}} >
          <MapContainer center={hurricanePosition} zoom={6} style={{ }}>
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


      </CardContent>
    </Card>
  );
};

export default HurricaneMap;
