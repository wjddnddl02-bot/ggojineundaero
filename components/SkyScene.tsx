"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useTransform,
  type MotionValue,
} from "framer-motion";
import AirplaneShape from "@/components/AirplaneShape";
import SkydiverShape from "@/components/SkydiverShape";
import type { AppPhase } from "@/types/destination";

interface SkySceneProps {
  phase: AppPhase;
  reducedMotion: boolean;
  planeX: MotionValue<number>;
  planeY: MotionValue<number>;
  skyX: MotionValue<number>;
  skyY: MotionValue<number>;
  skyRotate: MotionValue<number>;
  skyScale: MotionValue<number>;
}

export default function SkyScene({
  phase,
  reducedMotion,
  planeX,
  planeY,
  skyX,
  skyY,
  skyRotate,
  skyScale,
}: SkySceneProps) {
  const planeRotate = useMotionValue(-20);
  const prevRef = useRef({ x: 0.5, y: 0.42 });

  useAnimationFrame((elapsed) => {
    if (phase !== "ready") return;
    const t = elapsed / 1000;
    const speed = reducedMotion ? 0.45 : 1;
    const x = 0.5 + 0.32 * Math.sin(t * 0.21 * speed);
    const y = 0.44 + 0.27 * Math.sin(t * 0.14 * speed + 1.4);

    const dx = x - prevRef.current.x;
    const dy = y - prevRef.current.y;
    if (Math.hypot(dx, dy) > 0.0001) {
      planeRotate.set((Math.atan2(dy, dx) * 180) / Math.PI);
    }
    prevRef.current = { x, y };
    planeX.set(x);
    planeY.set(y);
  });

  const planeLeft = useTransform(planeX, (v) => `${v * 100}%`);
  const planeTop = useTransform(planeY, (v) => `${v * 100}%`);
  const skyLeft = useTransform(skyX, (v) => `${v * 100}%`);
  const skyTop = useTransform(skyY, (v) => `${v * 100}%`);

  const skydiverSize = phase === "revealing" || phase === "result" ? 32 : 46;

  return (
    <>
      {phase === "ready" && (
        <motion.div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: planeLeft, top: planeTop, rotate: planeRotate }}
        >
          <AirplaneShape size={34} />
        </motion.div>
      )}
      {phase !== "ready" && (
        <motion.div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: skyLeft, top: skyTop, rotate: skyRotate, scale: skyScale }}
        >
          <SkydiverShape size={skydiverSize} />
        </motion.div>
      )}
    </>
  );
}
