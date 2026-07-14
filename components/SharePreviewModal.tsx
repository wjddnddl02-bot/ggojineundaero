"use client";

import { useRef, useState } from "react";
import { X } from "lucide-react";
import ShareCard from "@/components/ShareCard";
import {
  buildShareText,
  downloadBlob,
  renderNodeToPngBlob,
  shareOrDownloadImage,
} from "@/lib/shareResult";
import { trackEvent } from "@/lib/utils";
import type { ThrowResult } from "@/types/destination";

interface SharePreviewModalProps {
  result: ThrowResult;
  open: boolean;
  onClose: () => void;
}

type Status = "idle" | "generating" | "ready" | "error";

const PREVIEW_SCALE = 260 / 1080;

export default function SharePreviewModal({ result, open, onClose }: SharePreviewModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  if (!open) return null;

  function handleClose() {
    setStatus("idle");
    setMessage(null);
    onClose();
  }

  const regionAndCity = `${result.destination.province} ${result.destination.city}`;

  async function handleShare() {
    if (status === "generating" || !cardRef.current) return;
    setStatus("generating");
    setMessage(null);
    try {
      const blob = await renderNodeToPngBlob(cardRef.current);
      const outcome = await shareOrDownloadImage(blob, buildShareText(regionAndCity));
      trackEvent("share_clicked", { outcome });
      if (outcome === "downloaded") {
        setMessage("이미지를 저장했어요. 공유 앱에서 첨부해 주세요.");
      } else if (outcome === "error") {
        setMessage("공유에 실패했어요. 다시 시도해 주세요.");
      }
      setStatus("ready");
    } catch {
      setStatus("error");
      setMessage("이미지를 만들지 못했어요. 다시 시도해 주세요.");
    }
  }

  async function handleDownload() {
    if (status === "generating" || !cardRef.current) return;
    setStatus("generating");
    setMessage(null);
    try {
      const blob = await renderNodeToPngBlob(cardRef.current);
      downloadBlob(blob, "kkojineundaero-result.png");
      trackEvent("image_downloaded");
      setMessage("이미지가 저장되었습니다.");
      setStatus("ready");
    } catch {
      setStatus("error");
      setMessage("이미지를 저장하지 못했어요. 다시 시도해 주세요.");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 px-4 pb-6 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="결과 공유"
    >
      <div className="w-full max-w-[420px] rounded-3xl bg-[var(--color-bg)] p-5 shadow-2xl">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-base font-bold text-[var(--color-text)]">결과 공유하기</p>
          <button
            type="button"
            onClick={handleClose}
            aria-label="닫기"
            className="flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-text)]/60 hover:bg-black/5"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex justify-center overflow-hidden rounded-2xl border border-[var(--color-map-border)]">
          <div style={{ width: 1080 * PREVIEW_SCALE, height: 1920 * PREVIEW_SCALE }}>
            <div
              style={{
                width: 1080,
                height: 1920,
                transform: `scale(${PREVIEW_SCALE})`,
                transformOrigin: "top left",
              }}
            >
              <ShareCard result={result} />
            </div>
          </div>
        </div>

        {message && (
          <p className="mt-3 text-center text-sm text-[var(--color-text)]/70" role="status">
            {message}
          </p>
        )}

        <div className="mt-4 flex flex-col gap-2">
          <button
            type="button"
            onClick={handleShare}
            disabled={status === "generating"}
            className="min-h-11 rounded-full bg-[var(--color-accent)] px-6 py-3 text-base font-bold text-white transition-opacity disabled:opacity-60"
          >
            {status === "generating" ? "이미지 생성 중..." : "공유하기"}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={status === "generating"}
            className="min-h-11 rounded-full border border-[var(--color-map-border)] px-6 py-3 text-base font-semibold text-[var(--color-text)] transition-opacity disabled:opacity-60"
          >
            인스타용 이미지 저장
          </button>
        </div>
      </div>

      {/* Full-resolution card kept off-screen for PNG capture */}
      <div className="fixed left-[-10000px] top-0" aria-hidden>
        <div ref={cardRef}>
          <ShareCard result={result} />
        </div>
      </div>
    </div>
  );
}
