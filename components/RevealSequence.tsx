"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Destination } from "@/types/destination";

interface RevealSequenceProps {
  destination: Destination;
  reducedMotion: boolean;
  onComplete: () => void;
}

type Step = "landed" | "teaser" | "reveal";

export default function RevealSequence({
  destination,
  reducedMotion,
  onComplete,
}: RevealSequenceProps) {
  const [step, setStep] = useState<Step>("landed");

  useEffect(() => {
    const speed = reducedMotion ? 0.35 : 1;
    const timers = [
      window.setTimeout(() => setStep("teaser"), 500 * speed),
      window.setTimeout(() => setStep("reveal"), 900 * speed),
      window.setTimeout(() => onComplete(), 2000 * speed),
    ];
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [reducedMotion, onComplete]);

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center px-6"
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        {step === "landed" && (
          <motion.p
            key="landed"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-full bg-[var(--color-text)]/85 px-5 py-2 text-base font-semibold text-[var(--color-bg)]"
          >
            다트가 꽂혔습니다
          </motion.p>
        )}
        {step === "teaser" && (
          <motion.p
            key="teaser"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-full bg-[var(--color-text)]/85 px-5 py-2 text-base font-semibold text-[var(--color-bg)]"
          >
            이번 여행지는…
          </motion.p>
        )}
        {step === "reveal" && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="rounded-3xl bg-[var(--color-bg)] px-8 py-6 text-center shadow-xl"
          >
            <p className="text-lg font-semibold text-[var(--color-accent)]">
              {destination.province}
            </p>
            <p className="mt-1 text-4xl font-black tracking-tight text-[var(--color-text)]">
              {destination.city}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
