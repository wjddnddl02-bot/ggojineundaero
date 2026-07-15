"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { MAX_GAUGE_DISTANCE, MIN_TOTAL_DISTANCE } from "@/lib/throwPhysics";

interface AimGaugeProps {
  x: MotionValue<number>;
  y: MotionValue<number>;
  visible: boolean;
}

const RING_RADIUS = 40;
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const READY_RATIO = MIN_TOTAL_DISTANCE / MAX_GAUGE_DISTANCE;

// viewBox is centered on the dart's rest position (0,0), with more room
// above than below since throws are aimed upward.
const VIEW_LEFT = -170;
const VIEW_TOP = -340;
const VIEW_WIDTH = 340;
const VIEW_HEIGHT = 400;

export default function AimGauge({ x, y, visible }: AimGaugeProps) {
  const magnitude = useTransform([x, y], (values) => {
    const [xv, yv] = values as number[];
    return Math.hypot(xv, yv);
  });
  const powerRatio = useTransform(magnitude, (m) => Math.min(m / MAX_GAUGE_DISTANCE, 1));
  const dashOffset = useTransform(powerRatio, (ratio) => CIRCUMFERENCE * (1 - ratio));
  const ringColor = useTransform(
    powerRatio,
    [0, READY_RATIO, 1],
    ["#9c8e73", "#f5a623", "#f0442e"]
  );
  const ringScale = useTransform(powerRatio, [0, 1], [0.94, 1.08]);

  const lineX2 = useTransform([x, y], (values) => {
    const [xv] = values as number[];
    return xv * 1.8;
  });
  const lineY2 = useTransform([x, y], (values) => {
    const [, yv] = values as number[];
    return yv * 1.8;
  });
  const lineOpacity = useTransform(magnitude, [10, 45], [0, 0.9]);

  if (!visible) return null;

  return (
    <svg
      viewBox={`${VIEW_LEFT} ${VIEW_TOP} ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
      className="pointer-events-none absolute left-1/2 top-1/2 z-10 overflow-visible"
      style={{
        width: VIEW_WIDTH,
        height: VIEW_HEIGHT,
        transform: `translate(${VIEW_LEFT}px, ${VIEW_TOP}px)`,
      }}
      aria-hidden
    >
      <defs>
        <marker id="aim-arrowhead" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-accent)" />
        </marker>
      </defs>

      <circle
        cx={0}
        cy={0}
        r={RING_RADIUS}
        fill="none"
        stroke="var(--color-map-border)"
        strokeOpacity={0.25}
        strokeWidth={5}
      />
      <motion.circle
        cx={0}
        cy={0}
        r={RING_RADIUS}
        fill="none"
        stroke={ringColor}
        strokeWidth={5}
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        style={{ strokeDashoffset: dashOffset, scale: ringScale }}
        transform="rotate(-90)"
      />

      <motion.line
        x1={x}
        y1={y}
        x2={lineX2}
        y2={lineY2}
        stroke="var(--color-accent)"
        strokeWidth={3}
        strokeDasharray="2 8"
        strokeLinecap="round"
        style={{ opacity: lineOpacity }}
        markerEnd="url(#aim-arrowhead)"
      />
    </svg>
  );
}
