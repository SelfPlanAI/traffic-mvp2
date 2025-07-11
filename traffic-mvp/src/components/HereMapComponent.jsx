import { useEffect, useRef } from "react";

const platform = new window.H.service.Platform({
  apikey: "u13md3V2AYn5epRLY4ibspMoZbW6B8SlS6FvjytsVJc", // Replace with your HERE API key
});

export default function HereMapComponent() {
  const mapRef = useRef(null);

  useEffect(() => {
    const defaultLayers = platform.createDefaultLayers();

    const map = new window.H.Map(
      mapRef.current,
      defaultLayers.vector.normal.map,
      {
        center: { lat: -37.8136, lng: 144.9631 }, // Melbourne
        zoom: 14,
        pixelRatio: window.devicePixelRatio || 1,
      }
    );

    window.addEventListener("resize", () => map.getViewPort().resize());

    const behavior = new window.H.mapevents.Behavior(
      new window.H.mapevents.MapEvents(map)
    );
    const ui = window.H.ui.UI.createDefault(map, defaultLayers);

    return () => {
      map.dispose();
    };
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        height: "100vh",
        width: "100vw",
      }}
    />
  );
} 