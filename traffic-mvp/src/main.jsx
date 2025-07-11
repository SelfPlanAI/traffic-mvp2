// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "leaflet/dist/leaflet.css";
import "./index.css"; // if you have Tailwind or custom styles

// 🔧 Fix Leaflet missing marker icons in production
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Override default Leaflet icon URLs
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// 🧠 Render App
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
