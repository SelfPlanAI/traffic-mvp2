import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function HereMapComponent() {
  return (
    <div
      id="map"
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'red', // diagnostic
      }}
    >
      <MapContainer
        center={[-37.8136, 144.9631]} // Melbourne
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[-37.8136, 144.9631]}>
          <Popup>Melbourne CBD</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
} 