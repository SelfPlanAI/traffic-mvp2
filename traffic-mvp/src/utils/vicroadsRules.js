export function getSpacingRules(speedKmh) {
  if (speedKmh >= 100) {
    return { taperLength: 60, bufferLength: 120 };
  } else if (speedKmh >= 80) {
    return { taperLength: 40, bufferLength: 80 };
  } else if (speedKmh >= 60) {
    return { taperLength: 30, bufferLength: 60 };
  } else {
    return { taperLength: 20, bufferLength: 40 };
  }
} 