import React, { useState, useEffect, useContext } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Button, Card, CardContent } from '@mui/material';
import PolicyContext from './PolicyContext';
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
  const { setStatus } = useContext(PolicyContext);



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
    let index = 0; // Starting index, adjust according to your actual logic
  
    const interval = setInterval(() => {
      console.log("Current Index value:", index);
      if (index < hurricanePath.length) {
        setHurricanePosition(hurricanePath[index]);
      }
      // Trigger updates based on index values
      if (index === 17) {
        setStatus(2);
      } else if (index === 26) {
        setStatus(3);
      } else if (index === 30) {
        setStatus(4);
        // Assuming you want to stop the animation at index 30
      }
  
      index++; // Increment index, adjust this logic as per your requirements
    }, 500); // Example: increment index every second
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
