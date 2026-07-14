"use client";

import { motion, AnimatePresence } from "framer-motion";

interface IntroGuideProps {
  visible: boolean;
  reducedMotion: boolean;
}

export default function IntroGuide({ visible, reducedMotion }: IntroGuideProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pointer-events-none absolute left-1/2 top-full flex -translate-x-1/2 flex-col items-center gap-2 pt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="text-2xl"
            aria-hidden
            animate={reducedMotion ? {} : { y: [0, -10, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            ☝️
          </motion.div>
          <p className="whitespace-nowrap text-sm font-medium text-[var(--color-text)]/70">
            잡아서 위로 던지기
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
