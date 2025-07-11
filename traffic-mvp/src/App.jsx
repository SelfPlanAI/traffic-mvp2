import HereMapComponent from "./components/HereMapComponent";
import { useState } from "react";

export default function App() {
  const [search, setSearch] = useState("");

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
      <HereMapComponent />
    </>
  );
}
