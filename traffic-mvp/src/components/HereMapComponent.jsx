import React, { useEffect } from 'react';

const HereMapComponent = () => {
  useEffect(() => {
    const platform = new window.H.service.Platform({
      apikey: 'u13md3V2AYn5epRLY4ibspMoZbW6B8SlS6FvjytsVJc', // Your HERE API key
    });

    const defaultLayers = platform.createDefaultLayers();

    const map = new window.H.Map(
      document.getElementById('mapContainer'),
      defaultLayers.vector.normal.map,
      {
        center: { lat: 52.5, lng: 13.4 },
        zoom: 10,
        pixelRatio: window.devicePixelRatio || 1,
      }
    );

    window.addEventListener('resize', () => map.getViewPort().resize());
  }, []);

  return <div id="mapContainer" style={{ width: '100%', height: '500px' }} />;
};

export default HereMapComponent; 