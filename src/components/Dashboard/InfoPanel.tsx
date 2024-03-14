import React from 'react';




const InfoPanel = ({ windSpeed, locationCoords, estimatedPayout, warningState, distanceToInsured }) => {
  return (
    <div>
      <h2>Hurricane Information</h2>
      <p>Wind Speed: {windSpeed} km/h</p>
      <p>Location Coordinates: {locationCoords.join(', ')}</p>
      <p>Estimated Payout: ${estimatedPayout}</p>
      <p>Warning State: {warningState}</p>
      <p>Distance to Insured: {distanceToInsured} km</p>
    </div>
  );
};

export default InfoPanel;
