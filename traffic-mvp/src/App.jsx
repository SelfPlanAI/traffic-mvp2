import HereMapComponent from "./components/HereMapComponent";
import { useState } from "react";

export default function App() {
  const [search, setSearch] = useState("");
  const [signs, setSigns] = useState([]);

  const handleExport = () => {
    const geojson = {
      type: "FeatureCollection",
      features: signs.map((sign) => ({
        type: "Feature",
        properties: { type: sign.type },
        geometry: {
          type: "Point",
          coordinates: [sign.lng, sign.lat],
        },
      })),
    };

    const blob = new Blob([JSON.stringify(geojson, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tgs-setup.geojson";
    a.click();
  };

  window.signUpdate = setSigns;

  return (
    <>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            window.dispatchEvent(new CustomEvent("search-address", { detail: search }));
          }
        }}
        placeholder="Search address..."
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 1000,
          padding: "8px",
          fontSize: "16px",
        }}
      />
      <button
        onClick={handleExport}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1000,
          padding: "8px 16px",
        }}
      >
        Export Setup
      </button>
      <HereMapComponent />
    </>
  );
}
