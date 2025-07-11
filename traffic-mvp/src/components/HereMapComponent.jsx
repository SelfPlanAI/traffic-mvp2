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

    const behavior = new window.H.mapevents.Behavior(
      new window.H.mapevents.MapEvents(map)
    );
    const ui = window.H.ui.UI.createDefault(map, defaultLayers);

    // Drawing Mode
    let drawing = false;
    let startPoint = null;
    let rect = null;

    map.addEventListener("tap", function (evt) {
      const coord = map.screenToGeo(
        evt.currentPointer.viewportX,
        evt.currentPointer.viewportY
      );

      if (!drawing) {
        startPoint = coord;
        drawing = true;
      } else {
        const endPoint = coord;

        const bounds = new window.H.geo.Rect(
          Math.max(startPoint.lat, endPoint.lat),
          Math.min(startPoint.lng, endPoint.lng),
          Math.min(startPoint.lat, endPoint.lat),
          Math.max(startPoint.lng, endPoint.lng)
        );

        if (rect) {
          map.removeObject(rect);
        }

        rect = new window.H.map.Rect(bounds, {
          style: { fillColor: "rgba(255,0,0,0.3)", lineWidth: 2 },
        });

        map.addObject(rect);
        drawing = false;

        console.log("Zone bounds:", bounds.getTop(), bounds.getLeft(), bounds.getBottom(), bounds.getRight());
        // TODO: Call generateTGS(bounds) here
      }
    });

    window.addEventListener("resize", () => map.getViewPort().resize());

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