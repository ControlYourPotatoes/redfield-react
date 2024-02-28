import React, { useEffect, useRef, useState } from 'react';

// Assuming you have the following import at the top of your file
const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Function to load the Google Maps script
function loadGoogleMapsScript(apiKey) {
  return new Promise((resolve) => {
    if (typeof google !== 'undefined') {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
}

const MapComponent = ({ coordinates }) => {
  const mapRef = useRef(null);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [map, setMap] = useState(null);
  const defaultCenter = { lat: 18.2208, lng: -66.5901 };

  useEffect(() => {
    loadGoogleMapsScript(googleMapsApiKey).then(() => setApiLoaded(true));
  }, []);

  useEffect(() => {
    if (!apiLoaded) return;

    const initMap = async () => {
      if (!map) {
        const initializedMap = new google.maps.Map(mapRef.current, {
          zoom: 9, // Default zoom
          center: defaultCenter,
        });
        setMap(initializedMap);
      } 

      // Determine zoom level based on whether the coordinates match the default center
      const zoomLevel = coordinates.lat === defaultCenter.lat && coordinates.lng === defaultCenter.lng ? 9 : 15;

      map?.setCenter(coordinates);
      map?.setZoom(zoomLevel);

      // Initialize or move the marker to the new coordinates
      new google.maps.Marker({
        map: map,
        position: coordinates,
        title: 'Location',
      });
    };

    initMap().catch(console.error);
  }, [apiLoaded, coordinates, map]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default MapComponent;