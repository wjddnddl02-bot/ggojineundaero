"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import SharePreviewModal from "@/components/SharePreviewModal";
import { trackEvent } from "@/lib/utils";
import type { ThrowResult } from "@/types/destination";

interface ResultSheetProps {
  result: ThrowResult;
  rerollAvailable: boolean;
  onReroll: () => void;
  onClose: () => void;
}

export default function ResultSheet({ result, rerollAvailable, onReroll, onClose }: ResultSheetProps) {
  const [shareOpen, setShareOpen] = useState(false);

  function openShare() {
    setShareOpen(true);
    trackEvent("share_clicked", { source: "result_sheet" });
  }

  function handleReroll() {
    trackEvent("reroll_clicked");
    onReroll();
  }

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative z-30 w-full rounded-t-[28px] bg-[var(--color-bg)] px-6 pb-[calc(env(safe-area-inset-bottom)+20px)] pt-6 shadow-[0_-8px_30px_rgba(0,0,0,0.12)]"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="결과 화면 닫기"
        className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-text)]/50 hover:bg-black/5"
      >
        <X size={20} />
      </button>

      <div aria-live="polite" className="text-center">
        <p className="text-sm font-medium text-[var(--color-text)]/60">
          당신의 이번 여행지는
        </p>
        <p className="mt-1 text-lg font-bold text-[var(--color-accent)]">
          {result.destination.province}
        </p>
        <p className="text-3xl font-black tracking-tight text-[var(--color-text)]">
          {result.destination.city}
        </p>
        <p className="mt-3 text-base text-[var(--color-text)]/80">
          &ldquo;{result.resultMessage}&rdquo;
        </p>
      </div>

      <div className="mt-5 rounded-2xl bg-[var(--color-map-base)] px-5 py-4 text-center">
        <p className="text-xs font-semibold text-[var(--color-text)]/60">오늘의 여행 룰</p>
        <p className="mt-1 text-base font-bold text-[var(--color-text)]">
          {result.travelRule}
        </p>
      </div>

      <div className="mt-6 flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={openShare}
          className="min-h-11 w-full rounded-full bg-[var(--color-accent)] py-3.5 text-base font-bold text-white shadow-md active:scale-[0.98]"
        >
          결과 공유하기
        </button>
        <button
          type="button"
          onClick={openShare}
          className="min-h-11 w-full rounded-full border border-[var(--color-map-border)] py-3.5 text-base font-semibold text-[var(--color-text)] active:scale-[0.98]"
        >
          인스타용 이미지 저장
        </button>

        {rerollAvailable ? (
          <div className="mt-1 flex flex-col items-center gap-1">
            <button
              type="button"
              onClick={handleReroll}
              className="min-h-11 px-3 text-sm font-semibold text-[var(--color-text)]/70 underline underline-offset-4"
            >
              다시 던지기
            </button>
            <p className="text-xs text-[var(--color-text)]/50">
              다시 던질 기회 1번 남음
            </p>
          </div>
        ) : (
          <p className="mt-1 text-xs text-[var(--color-text)]/50">
            운명은 두 번이면 충분합니다.
          </p>
        )}
      </div>

      <SharePreviewModal
        result={result}
        open={shareOpen}
        onClose={() => setShareOpen(false)}
      />
    </motion.div>
  );
}
