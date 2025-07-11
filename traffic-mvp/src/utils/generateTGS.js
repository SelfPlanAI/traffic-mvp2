export function generateTGS(bounds) {
  const { top, left, bottom, right } = bounds;

  // Example: basic sign layout assuming traffic approaching from left
  const signs = [];

  const centerLat = (top + bottom) / 2;
  const centerLng = (left + right) / 2;

  const offset = 0.0005; // ~50m

  signs.push({
    type: "WORK_AHEAD",
    lat: centerLat,
    lng: left - offset,
  });

  signs.push({
    type: "REDUCE_SPEED",
    lat: centerLat,
    lng: left - offset * 2,
  });

  signs.push({
    type: "END_ROAD_WORK",
    lat: centerLat,
    lng: right + offset,
  });

  return signs;
} 