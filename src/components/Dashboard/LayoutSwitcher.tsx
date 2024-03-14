// LayoutSwitcher.tsx
import React from 'react';
import InfoPanel from './InfoPanel';
import PolicyStatus from './PolicyStatus';
import HurricaneMap from './HurricaneMap';
import WeatherWidget from './WeatherWidget';
import { PolicyProvider } from './PolicyContext';
interface LayoutSwitcherProps {
  isLiveWeatherEvent: boolean;
}

// Mock data for demonstration
const hurricaneInfo = {
    windSpeed: 120,
    locationCoords: [15.3, -61.3],
    estimatedPayout: 50000,
    warningState: 'High Alert',
    distanceToInsured: 45
  };

const LayoutSwitcher: React.FC<LayoutSwitcherProps> = ({ isLiveWeatherEvent }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <PolicyProvider policyId="b8869331-d076-4d26-a13d-f808d2a2e966">
            <PolicyStatus />
        </PolicyProvider>
        
      {isLiveWeatherEvent ? (
        <>
          <InfoPanel {...hurricaneInfo} />
          <HurricaneMap />
        </>
      ) : (
        <WeatherWidget />
      )}
    </div>
  );
};

export default LayoutSwitcher;