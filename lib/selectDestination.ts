import { regions } from "@/data/regions";
import { getDestinationsByRegion } from "@/data/destinations";
import { travelRules } from "@/data/travelRules";
import { resultMessages } from "@/data/resultMessages";
import { clamp, pickRandom, randomBetween } from "@/lib/utils";
import type { NormalizedLanding } from "@/lib/throwPhysics";
import type { ThrowResult } from "@/types/destination";

const LANDING_JITTER = 0.035;

function findNearestRegion(point: NormalizedLanding) {
  let nearest = regions[0];
  let nearestDistance = Infinity;
  for (const region of regions) {
    const distance = Math.hypot(region.x - point.x, region.y - point.y);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearest = region;
    }
  }
  return nearest;
}

export function selectDestination(aimedLanding: NormalizedLanding): ThrowResult {
  const region = findNearestRegion(aimedLanding);
  const candidates = getDestinationsByRegion(region.id);
  const destination = pickRandom(candidates);

  return {
    destination,
    travelRule: pickRandom(travelRules),
    resultMessage: pickRandom(resultMessages),
    landingX: clamp(region.x + randomBetween(-LANDING_JITTER, LANDING_JITTER), 0.04, 0.96),
    landingY: clamp(region.y + randomBetween(-LANDING_JITTER, LANDING_JITTER), 0.04, 0.96),
    timestamp: Date.now(),
  };
}
