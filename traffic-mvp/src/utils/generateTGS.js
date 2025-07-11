import { getSpacingRules } from "./vicroadsRules";

export function generateTGS(bounds, speedKmh = 60) {
  const { top, left, bottom, right } = bounds;
  const spacing = getSpacingRules(speedKmh);

  const signs = [];

  const isEastWest = Math.abs(right - left) > Math.abs(top - bottom);
  const centerLat = (top + bottom) / 2;
  const centerLng = (left + right) / 2;

  if (isEastWest) {
    signs.push({
      type: "WORK_AHEAD",
      lat: centerLat,
      lng: left - spacing.bufferLength * 0.00001,
    });
    signs.push({
      type: "REDUCE_SPEED",
      lat: centerLat,
      lng: left - spacing.bufferLength * 0.00002,
    });
    signs.push({
      type: "END_ROAD_WORK",
      lat: centerLat,
      lng: right + spacing.bufferLength * 0.00001,
    });
  } else {
    signs.push({
      type: "WORK_AHEAD",
      lat: top + spacing.bufferLength * 0.00001,
      lng: centerLng,
    });
    signs.push({
      type: "REDUCE_SPEED",
      lat: top + spacing.bufferLength * 0.00002,
      lng: centerLng,
    });
    signs.push({
      type: "END_ROAD_WORK",
      lat: bottom - spacing.bufferLength * 0.00001,
      lng: centerLng,
    });
  }

  return signs;
} 