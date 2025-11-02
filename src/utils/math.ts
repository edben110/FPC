export const add = (a: number, b: number) => a + b;
export const sub = (a: number, b: number) => a - b;
export const mul = (a: number, b: number) => a * b;
export const div = (a: number, b: number) => {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
};

export const clamp = (value: number, min: number, max: number) => {
  if (min > max) throw new Error("Invalid clamp range");
  return Math.min(Math.max(value, min), max);
};

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const degToRad = (deg: number) => (deg * Math.PI) / 180;
export const radToDeg = (rad: number) => (rad * 180) / Math.PI;

export const roundTo = (value: number, decimals: number) => {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
};