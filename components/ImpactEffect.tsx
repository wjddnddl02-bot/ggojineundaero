"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ImpactEffectProps {
  x: number;
  y: number;
  visible: boolean;
  reducedMotion: boolean;
}

export default function ImpactEffect({ x, y, visible, reducedMotion }: ImpactEffectProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${x * 100}%`, top: `${y * 100}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.1 : 0.3 }}
        >
          <motion.span
            className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--color-accent)]"
            initial={{ width: 6, height: 6, opacity: 0.7 }}
            animate={
              reducedMotion
                ? { width: 40, height: 40, opacity: 0 }
                : { width: 130, height: 130, opacity: 0 }
            }
            transition={{ duration: reducedMotion ? 0.2 : 0.6, ease: "easeOut" }}
          />
          <motion.span
            className="absolute left-1/2 top-1/2 block h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent)]"
            initial={{ scale: 0.4, opacity: 0.9 }}
            animate={{ scale: [0.4, 1.6, 1], opacity: [0.9, 0.5, 0] }}
            transition={{ duration: reducedMotion ? 0.2 : 0.5, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
