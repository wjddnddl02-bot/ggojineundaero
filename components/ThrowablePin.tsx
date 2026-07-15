"use client";

import { useRef } from "react";
import type { RefObject } from "react";
import { motion, useMotionValue, animate, type PanInfo } from "framer-motion";
import DartShape from "@/components/DartShape";
import {
  createThrowVector,
  isValidThrow,
  computeAimedLanding,
} from "@/lib/throwPhysics";
import type { NormalizedLanding } from "@/lib/throwPhysics";
import type { AppPhase } from "@/types/destination";

interface ThrowablePinProps {
  phase: AppPhase;
  mapContainerRef: RefObject<HTMLDivElement | null>;
  reducedMotion: boolean;
  onDragStart: () => void;
  onInvalidThrow: () => void;
  onValidThrow: (aimed: NormalizedLanding) => NormalizedLanding;
  onFlightComplete: () => void;
}

export default function ThrowablePin({
  phase,
  mapContainerRef,
  reducedMotion,
  onDragStart,
  onInvalidThrow,
  onValidThrow,
  onFlightComplete,
}: ThrowablePinProps) {
  const pinRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);
  const scale = useMotionValue(1);

  const interactive = phase === "ready" || phase === "dragging";
  const pinSize = phase === "result" || phase === "revealing" ? 44 : 56;

  function handleDragStart() {
    scale.set(1.12);
    onDragStart();
    if (typeof navigator !== "undefined") {
      navigator.vibrate?.(20);
    }
  }

  function handleDragEnd(_event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) {
    const vector = createThrowVector(info.offset, info.velocity);
    const valid = isValidThrow(vector, info.velocity);

    if (!valid) {
      onInvalidThrow();
      const springBack = reducedMotion
        ? { duration: 0.15 }
        : { type: "spring" as const, stiffness: 420, damping: 28 };
      animate(x, 0, springBack);
      animate(y, 0, springBack);
      animate(scale, 1, springBack);
      return;
    }

    const aimed = computeAimedLanding(vector, info.velocity);
    const target = onValidThrow(aimed);

    const mapRect = mapContainerRef.current?.getBoundingClientRect();
    const pinRect = pinRef.current?.getBoundingClientRect();

    if (!mapRect || !pinRect) {
      onFlightComplete();
      return;
    }

    const pinCenterX = pinRect.left + pinRect.width / 2;
    const pinCenterY = pinRect.top + pinRect.height / 2;
    const targetAbsX = mapRect.left + target.x * mapRect.width;
    const targetAbsY = mapRect.top + target.y * mapRect.height;

    const deltaX = targetAbsX - pinCenterX;
    const deltaY = targetAbsY - pinCenterY;
    const currentY = y.get();
    const duration = reducedMotion ? 0.25 : 0.65;

    Promise.all([
      animate(x, deltaX, { duration, ease: [0.2, 0.7, 0.3, 1] }),
      animate(
        y,
        reducedMotion ? deltaY : [currentY, currentY - 140, deltaY],
        {
          duration,
          times: reducedMotion ? undefined : [0, 0.45, 1],
          ease: "easeInOut",
        }
      ),
      animate(rotate, reducedMotion ? 0 : 540, { duration, ease: "easeOut" }),
      animate(scale, 0.8, { duration }),
    ]).then(() => {
      onFlightComplete();
    });
  }

  return (
    <motion.div
      ref={pinRef}
      drag={interactive}
      dragElastic={0.2}
      dragMomentum={false}
      dragConstraints={{ left: -140, right: 140, top: -320, bottom: 60 }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{ x, y, rotate, scale, touchAction: "none" }}
      className="relative z-20 flex cursor-grab items-center justify-center select-none active:cursor-grabbing"
      whileTap={interactive ? { scale: 1.12 } : undefined}
      role="button"
      tabIndex={interactive ? 0 : -1}
      aria-label="다트를 잡아 위로 던지기"
    >
      <DartShape size={pinSize} />
    </motion.div>
  );
}
