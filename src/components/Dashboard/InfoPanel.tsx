import React from 'react';
import { Card, CardContent } from '@mui/material';
interface InfoPanelProps {
  windSpeed: number;
  locationCoords: [number, number]; // Assuming locationCoords is a tuple of [lat, lng]
  estimatedPayout: number;
  warningState: string;
  distanceToInsured: number;
}

// Option 1: Using React.FC with the Props Interface
const InfoPanel: React.FC<InfoPanelProps> = ({
  windSpeed,
  locationCoords,
  estimatedPayout,
  warningState,
  distanceToInsured,
}) => {
  return (
    <div>
      <Card>
        <CardContent title="test">
          <h2>Hurricane Information</h2>
          <p>Wind Speed: {windSpeed} km/h</p>
          <p>Location Coordinates: {locationCoords.join(', ')}</p>
          <p>Estimated Payout: ${estimatedPayout}</p>
          <p>Warning State: {warningState}</p>
          <p>Distance to Insured: {distanceToInsured} km</p>
        </CardContent>
      </Card>
      
    </div>
  );
};

export default InfoPanel;
