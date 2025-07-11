import 'leaflet/dist/leaflet.css';
import HereMapComponent from "./components/HereMapComponent";
import { useState } from "react";

export default function App() {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <HereMapComponent />
    </div>
  );
}
