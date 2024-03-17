/// <reference types="@types/google.maps" />

import React, { useEffect, useRef, useState } from 'react';
declare var google: any;
// Load Google Maps API key from environment variables
const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Function to load the Google Maps script
function loadGoogleMapsScript(apiKey: string): Promise<void> {
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

// Interface for the coordinates prop
interface Coordinates {
  lat: number;
  lng: number;
}

interface MapComponentProps {
  coordinates: Coordinates;
}

const MapComponent: React.FC<MapComponentProps> = ({ coordinates }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null); // Add type declaration for 'google' namespace

  // Interface for the coordinates prop
  interface Coordinates {
    lat: number;
    lng: number;
  }

  const defaultCenter: Coordinates = { lat: 18.2208, lng: -66.5901 };

  useEffect(() => {
    loadGoogleMapsScript(googleMapsApiKey).then(() => setApiLoaded(true));
  }, []);

  useEffect(() => {
    if (!apiLoaded || !mapRef.current) return;

    const initMap = async () => {
      if (!map) {
        // Ensure mapRef.current is not null before passing it to google.maps.Map
        if (mapRef.current === null) {
          console.error("Map container is null");
          return;
        }
  
        const initializedMap = new google.maps.Map(mapRef.current, {
          zoom: 9,
          center: defaultCenter,
        });
        setMap(initializedMap);
      }
  
      const zoomLevel = coordinates.lat === defaultCenter.lat && coordinates.lng === defaultCenter.lng ? 9 : 15;
  
      map?.setCenter(coordinates);
      map?.setZoom(zoomLevel);
  
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
