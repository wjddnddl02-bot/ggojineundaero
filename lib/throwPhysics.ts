import { clamp, randomBetween } from "@/lib/utils";

export interface ThrowVector {
  dx: number;
  dy: number;
  distance: number;
  /** px/ms, framer-motion PanInfo.velocity is already px/s so callers should divide */
  speed: number;
}

const MIN_UPWARD_DISTANCE = 40;
const MIN_TOTAL_DISTANCE = 60;
const MIN_UPWARD_VELOCITY = 250;

export function createThrowVector(
  offset: { x: number; y: number },
  velocity: { x: number; y: number }
): ThrowVector {
  const distance = Math.hypot(offset.x, offset.y);
  const speed = Math.hypot(velocity.x, velocity.y);
  return { dx: offset.x, dy: offset.y, distance, speed };
}

/**
 * A throw only counts if it was thrown upward (negative y) with enough
 * distance or velocity - a short drop or sideways nudge is rejected.
 */
export function isValidThrow(
  vector: ThrowVector,
  velocity: { x: number; y: number }
): boolean {
  const movedUpEnough = vector.dy < -MIN_UPWARD_DISTANCE;
  const flungUpEnough = velocity.y < -MIN_UPWARD_VELOCITY;
  const longEnough = vector.distance > MIN_TOTAL_DISTANCE;
  return longEnough && (movedUpEnough || flungUpEnough);
}

export interface NormalizedLanding {
  x: number;
  y: number;
}

/**
 * Aims a rough landing point from the throw direction/speed. The faster and
 * further up the pin is thrown, the further north it tends to land; the
 * horizontal direction of the drag nudges the landing east/west. A small
 * random offset keeps identical throws from always landing in the same spot.
 */
export function computeAimedLanding(
  vector: ThrowVector,
  velocity: { x: number; y: number }
): NormalizedLanding {
  const speedBoost = clamp(velocity.y / -3000, 0, 0.18);
  const x = clamp(0.5 + vector.dx / 500 + randomBetween(-0.08, 0.08), 0.06, 0.94);
  const y = clamp(
    0.9 - Math.abs(vector.dy) / 700 - speedBoost + randomBetween(-0.07, 0.07),
    0.05,
    0.95
  );
  return { x, y };
}
