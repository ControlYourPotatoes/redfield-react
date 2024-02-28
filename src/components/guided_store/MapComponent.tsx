import React, { useEffect, useRef } from 'react';

// Update the component to accept props
const MapComponent = ({ coordinates }) => {
  const mapRef = useRef(null); // Reference to the div where the map will be rendered

  useEffect(() => {
    const initMap = async () => {
      // Use the coordinates from props for both the map center and the marker
      const position = coordinates;

      // Dynamically import the Google Maps libraries needed
      //@ts-ignore
      const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      //@ts-ignore
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

      // Initialize the map with the provided coordinates
      const map = new Map(mapRef.current, {
        zoom: 9,
        center: position,
        mapId: '02', // Replace 'your-map-id-here' with your actual Map ID if you're using one
      });

      // Initialize the marker at the provided coordinates
      const marker = new AdvancedMarkerElement({
        map: map,
        position: position, // This ensures the marker is placed at the coordinates passed as props
        title: 'Marker', // You can customize this title as needed
      });
    };

    // Call initMap and handle potential errors
    initMap().catch(console.error);
  }, [coordinates]); // The effect depends on coordinates to re-initialize if they change

  return (
    <div ref={mapRef} style={{ width: '100%', height: '400px' }} id="map"></div>
  );
};

export default MapComponent;
