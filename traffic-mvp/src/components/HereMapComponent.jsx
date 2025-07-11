import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function HereMapComponent() {
  return (
    <MapContainer
      center={[-37.8136, 144.9631]} // Melbourne
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[-37.8136, 144.9631]}>
        <Popup>Melbourne CBD</Popup>
      </Marker>
    </MapContainer>
  );
} 