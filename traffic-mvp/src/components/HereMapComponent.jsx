import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, FeatureGroup, Rectangle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";

import { generateTGS } from "../utils/generateTGS";

export default function HereMapComponent() {
  const drawnLayerRef = useRef(null);

  useEffect(() => {
    const map = L.map("map").setView([-37.8136, 144.9631], 14);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      draw: {
        polygon: false,
        polyline: false,
        circle: false,
        marker: false,
        circlemarker: false,
        rectangle: true,
      },
      edit: {
        featureGroup: drawnItems,
        remove: true,
      },
    });
    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, function (e) {
      drawnItems.clearLayers();
      const layer = e.layer;
      drawnItems.addLayer(layer);

      const bounds = layer.getBounds();
      const tgsData = generateTGS({
        top: bounds.getNorth(),
        bottom: bounds.getSouth(),
        left: bounds.getWest(),
        right: bounds.getEast(),
      });

      tgsData.forEach((sign) => {
        const marker = L.marker([sign.lat, sign.lng], {
          title: sign.type,
        }).addTo(map);
        marker.bindTooltip(sign.type, { permanent: true, direction: "top" });
      });

      // Send signs to export button
      if (window.signUpdate) window.signUpdate(tgsData);
    });

    return () => map.remove();
  }, []);

  return (
    <MapContainer
      center={[-37.8136, 144.9631]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FeatureGroup>
        <Rectangle bounds={[[51.49, -0.09], [51.5, -0.08]]} />
      </FeatureGroup>
    </MapContainer>
  );
} 