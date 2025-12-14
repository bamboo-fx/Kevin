import { Point, Rect, Line } from '../types';

export const getDistance = (p1: Point, p2: Point): number => {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

export const degToRad = (deg: number) => (deg * Math.PI) / 180;

// Get the center point of a rotated rectangle
export const getRectCenter = (rect: Rect): Point => {
  // Since x,y usually denotes top-left of an unrotated rect, but in our SVG logic 
  // we will treat x,y as the center to make rotation easier, or calculate it.
  // For this game, let's assume the Rect object stores the CENTER coordinates (x,y)
  // as that simplifies the "Symmetry" logic significantly.
  return { x: rect.x, y: rect.y };
};

// Distance from a point to a line defined by two points
export const distanceFromPointToLine = (point: Point, line: Line): number => {
  const { start: p1, end: p2 } = line;
  const A = point.x - p1.x;
  const B = point.y - p1.y;
  const C = p2.x - p1.x;
  const D = p2.y - p1.y;

  const dot = A * C + B * D;
  const len_sq = C * C + D * D;
  let param = -1;
  
  if (len_sq !== 0) // in case of 0 length line
      param = dot / len_sq;

  let xx, yy;

  if (param < 0) {
    xx = p1.x;
    yy = p1.y;
  } else if (param > 1) {
    xx = p2.x;
    yy = p2.y;
  } else {
    xx = p1.x + param * C;
    yy = p1.y + param * D;
  }

  const dx = point.x - xx;
  const dy = point.y - yy;
  return Math.sqrt(dx * dx + dy * dy);
};

// Check if a line (the cut) passes close enough to a point (the center)
// Since the cut is an infinite line conceptually for the solution, 
// we care about the perpendicular distance from the point to the extended line.
export const perpendicularDistanceToLine = (point: Point, line: Line): number => {
  const { start: p1, end: p2 } = line;
  const numerator = Math.abs((p2.x - p1.x) * (p1.y - point.y) - (p1.x - point.x) * (p2.y - p1.y));
  const denominator = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  if (denominator === 0) return 0;
  return numerator / denominator;
};

// Generates a random rect within bounds, ensuring it doesn't clip edges
export const generateRandomHole = (containerWidth: number, containerHeight: number): Rect => {
  const minSize = 40;
  const maxSize = 100;
  
  const width = Math.random() * (maxSize - minSize) + minSize;
  const height = Math.random() * (maxSize - minSize) + minSize;
  
  // Padding from edge
  const padding = 60;
  
  // Center positions
  const x = padding + (Math.random() * (containerWidth - width - padding * 2)) + width/2;
  const y = padding + (Math.random() * (containerHeight - height - padding * 2)) + height/2;
  
  const rotation = Math.random() * 360;
  
  return { x, y, width, height, rotation };
};