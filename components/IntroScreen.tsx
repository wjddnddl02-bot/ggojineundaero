"use client";

import { motion } from "framer-motion";
import KoreaMap from "@/components/KoreaMap";
import AirplaneShape from "@/components/AirplaneShape";
import { SERVICE_NAME } from "@/lib/constants";

interface IntroScreenProps {
  onStart: () => void;
  reducedMotion: boolean;
}

export default function IntroScreen({ onStart, reducedMotion }: IntroScreenProps) {
  return (
    <div className="relative flex h-dvh w-full flex-col items-center overflow-hidden bg-[var(--color-mystery-bg)]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 32%, var(--color-mystery-glow), transparent 70%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-[18%] flex justify-center opacity-[0.14] grayscale">
        <div className="w-[280px]">
          <KoreaMap />
        </div>
      </div>

      <div className="relative z-10 flex h-full w-full flex-col items-center px-8 pt-[calc(env(safe-area-inset-top)+28px)] pb-[calc(env(safe-area-inset-bottom)+28px)]">
        <p className="text-sm font-bold tracking-[0.2em] text-[var(--color-accent)]">
          {SERVICE_NAME}
        </p>

        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="text-2xl leading-snug font-black text-[var(--color-mystery-text)]">
              대한민국 어딘가에
              <br />
              당신의 다음 여행지가
              <br />
              숨어 있습니다
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-[var(--color-mystery-text)]/60">
              뛰어내리기 전까지는
              <br />
              아무도 알 수 없어요.
            </p>
          </motion.div>

          <motion.div
            aria-hidden
            className="mt-10"
            animate={reducedMotion ? {} : { x: [-14, 14, -14], y: [0, -6, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <AirplaneShape size={44} />
          </motion.div>
        </div>

        <button
          type="button"
          onClick={onStart}
          className="min-h-11 w-full max-w-[320px] rounded-full bg-[var(--color-accent)] py-4 text-base font-bold text-white shadow-[0_0_30px_var(--color-mystery-glow)] active:scale-[0.98]"
        >
          여행지 뽑으러 가기
        </button>
      </div>
    </div>
  );
}
