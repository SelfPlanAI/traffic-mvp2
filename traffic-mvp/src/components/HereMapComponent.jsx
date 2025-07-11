import { useEffect, useRef } from "react";
import { generateTGS } from "../utils/generateTGS";

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
        const signs = generateTGS(bounds);

        signs.forEach((sign) => {
          const marker = new window.H.map.Marker(
            { lat: sign.lat, lng: sign.lng },
            { icon: new window.H.map.Icon(getSignIcon(sign.type)) }
          );
          map.addObject(marker);
        });
      }
    });

    window.addEventListener("resize", () => map.getViewPort().resize());

    return () => {
      map.dispose();
    };
  }, []);

  function getSignIcon(type) {
    const colors = {
      WORK_AHEAD: "orange",
      REDUCE_SPEED: "yellow",
      END_ROAD_WORK: "green",
    };

    const canvas = document.createElement("canvas");
    canvas.width = 60;
    canvas.height = 30;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = colors[type] || "gray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.font = "bold 10px sans-serif";
    ctx.fillText(type, 5, 18);

    return new window.H.map.Icon(canvas);
  }

  const geocoder = platform.getSearchService();

  window.addEventListener("search-address", (e) => {
    const query = e.detail;
    geocoder.geocode({ q: query }, (result) => {
      if (result.items.length > 0) {
        const location = result.items[0].position;
        map.setCenter({ lat: location.lat, lng: location.lng });
        map.setZoom(16);
      }
    });
  });

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