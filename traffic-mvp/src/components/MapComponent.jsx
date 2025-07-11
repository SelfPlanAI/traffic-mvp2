import { MapContainer, TileLayer } from 'react-leaflet';

const hereApiKey = import.meta.env.VITE_HERE_API_KEY;

const tileLayerUrl = hereApiKey
  ? `https://{s}.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?apikey=${hereApiKey}`
  : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

export default function MapComponent() {
  return (
    <MapContainer
      center={[-37.8136, 144.9631]}
      zoom={15}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url={`https://{s}.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?apikey=F0UC3TiYy2x5ki4eRf3D`}
        attribution='Map &copy; <a href="https://developer.here.com">HERE</a>'
        subdomains={["1", "2", "3", "4"]}
        detectRetina={true}
      />
      {/* other layers/components here */}
    </MapContainer>
  );
} 