import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Needed if you still want custom icons:
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix for default icon (if not done in main.jsx)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function MapComponent() {
  const hereApiKey = import.meta.env.VITE_HERE_API_KEY;

  const tileLayerUrl = hereApiKey
    ? `https://{s}.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?apikey=${hereApiKey}`
    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  return (
    <MapContainer>
      <TileLayer
        url={tileLayerUrl}
        attribution='Map &copy; HERE or OpenStreetMap'
        subdomains={['1', '2', '3', '4']}
        tileSize={256}
      />
      <Marker position={[-37.8136, 144.9631]}>
        {/* Marker content */}
      </Marker>
    </MapContainer>
  );
} 