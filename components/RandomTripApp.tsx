"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import KoreaMap from "@/components/KoreaMap";
import ThrowablePin from "@/components/ThrowablePin";
import IntroGuide from "@/components/IntroGuide";
import ImpactEffect from "@/components/ImpactEffect";
import RevealSequence from "@/components/RevealSequence";
import ResultSheet from "@/components/ResultSheet";
import { selectDestination } from "@/lib/selectDestination";
import type { NormalizedLanding } from "@/lib/throwPhysics";
import { getStoredResult, hasUsedReroll, setRerollUsed, setStoredResult } from "@/lib/storage";
import { trackEvent, randomBetween } from "@/lib/utils";
import { SERVICE_NAME } from "@/lib/constants";
import type { AppPhase, Destination, ThrowResult } from "@/types/destination";

interface RandomTripAppProps {
  sharedDestination?: Destination | null;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const listener = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);
  return reduced;
}

function SharedIntro({
  destination,
  onStart,
}: {
  destination: Destination;
  onStart: () => void;
}) {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-6 px-8 text-center">
      <p className="text-sm font-semibold text-[var(--color-text)]/60">
        친구의 랜덤 여행지는
      </p>
      <div>
        <p className="text-xl font-bold text-[var(--color-accent)]">
          {destination.province}
        </p>
        <p className="mt-1 text-4xl font-black tracking-tight text-[var(--color-text)]">
          {destination.city}
        </p>
      </div>
      <button
        type="button"
        onClick={onStart}
        className="mt-6 min-h-11 rounded-full bg-[var(--color-accent)] px-8 py-4 text-lg font-bold text-white shadow-md active:scale-[0.98]"
      >
        나도 핀 던지기
      </button>
    </div>
  );
}

export default function RandomTripApp({ sharedDestination = null }: RandomTripAppProps) {
  const [viewMode, setViewMode] = useState<"shared" | "own">(() =>
    sharedDestination ? "shared" : "own"
  );
  const [phase, setPhase] = useState<AppPhase>(() =>
    !sharedDestination && getStoredResult() ? "result" : "ready"
  );
  const [result, setResult] = useState<ThrowResult | null>(() =>
    sharedDestination ? null : getStoredResult()
  );
  const [rerollAvailable, setRerollAvailable] = useState(() => !hasUsedReroll());
  const [sheetOpen, setSheetOpen] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showThrowFail, setShowThrowFail] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    trackEvent("page_view", { shared: Boolean(sharedDestination) });
    if (sharedDestination) {
      trackEvent("shared_result_viewed", { slug: sharedDestination.slug });
    }
  }, [sharedDestination]);

  const handleStartOwn = useCallback(() => {
    trackEvent("start_from_shared_result");
    const stored = getStoredResult();
    setRerollAvailable(!hasUsedReroll());
    if (stored) {
      setResult(stored);
      setSheetOpen(true);
      setPhase("result");
    } else {
      setPhase("ready");
    }
    setViewMode("own");
  }, []);

  const handleDragStart = useCallback(() => {
    setHasInteracted(true);
    setPhase("dragging");
    trackEvent("pin_drag_start");
  }, []);

  const handleInvalidThrow = useCallback(() => {
    setPhase("ready");
    setShowThrowFail(true);
    trackEvent("pin_throw_fail");
    window.setTimeout(() => setShowThrowFail(false), 1600);
  }, []);

  const handleValidThrow = useCallback((aimed: NormalizedLanding) => {
    const computed = selectDestination(aimed);
    setResult(computed);
    setPhase("flying");
    trackEvent("pin_throw_success");
    return { x: computed.landingX, y: computed.landingY };
  }, []);

  const handleFlightComplete = useCallback(() => {
    setPhase("landed");
    if (typeof navigator !== "undefined") {
      navigator.vibrate?.([30, 30, 50]);
    }
    window.setTimeout(() => setPhase("revealing"), reducedMotion ? 150 : 550);
  }, [reducedMotion]);

  const handleRevealComplete = useCallback(() => {
    setPhase("result");
    setSheetOpen(true);
    setResult((current) => {
      if (current) {
        setStoredResult(current);
        trackEvent("destination_revealed", { slug: current.destination.slug });
      }
      return current;
    });
  }, []);

  const handleReroll = useCallback(() => {
    setRerollUsed();
    setRerollAvailable(false);
    setResult(null);
    setPhase("ready");
  }, []);

  const handleRandomDraw = useCallback(() => {
    if (phase !== "ready") return;
    const aimed: NormalizedLanding = {
      x: randomBetween(0.1, 0.9),
      y: randomBetween(0.1, 0.9),
    };
    const computed = selectDestination(aimed);
    setResult(computed);
    setHasInteracted(true);
    setPhase("landed");
    trackEvent("pin_throw_success", { via: "keyboard" });
    if (typeof navigator !== "undefined") {
      navigator.vibrate?.([30, 30, 50]);
    }
    window.setTimeout(() => setPhase("revealing"), reducedMotion ? 100 : 400);
  }, [phase, reducedMotion]);

  if (viewMode === "shared" && sharedDestination) {
    return <SharedIntro destination={sharedDestination} onStart={handleStartOwn} />;
  }

  const isMapDimmed = phase === "dragging" || phase === "flying";
  const isRevealed = phase === "landed" || phase === "revealing" || phase === "result";
  const highlightedRegionId = isRevealed ? result?.destination.regionId ?? null : null;
  const highlightedCity = isRevealed ? result?.destination.city ?? null : null;

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-[var(--color-bg)]">
      <header className="px-6 pt-[calc(env(safe-area-inset-top)+18px)] text-center">
        <p className="text-sm font-bold tracking-wide text-[var(--color-accent)]">
          {SERVICE_NAME}
        </p>
        <AnimatePresence mode="wait">
          {(phase === "ready" || phase === "dragging") && (
            <motion.div
              key="copy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <h1 className="mt-3 text-2xl leading-tight font-black text-[var(--color-text)]">
                이번 여행지는
                <br />
                운명에 맡겨볼까요?
              </h1>
              <p className="mt-2 text-sm text-[var(--color-text)]/60">
                핀을 잡고 대한민국 어딘가로 던져보세요.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="relative mx-6 mt-2 flex flex-1 items-center justify-center">
        <motion.div
          ref={mapContainerRef}
          className="relative aspect-[520/553] w-full max-w-[360px]"
          animate={{
            scale: isMapDimmed ? 0.92 : 1,
            opacity: isMapDimmed ? 0.55 : 1,
          }}
          transition={{ duration: reducedMotion ? 0.1 : 0.4 }}
        >
          <KoreaMap highlightedRegionId={highlightedRegionId} highlightedCity={highlightedCity} />
          {result && (
            <ImpactEffect
              x={result.landingX}
              y={result.landingY}
              visible={phase === "landed" || phase === "revealing"}
              reducedMotion={reducedMotion}
            />
          )}
          {phase === "revealing" && result && (
            <RevealSequence
              destination={result.destination}
              reducedMotion={reducedMotion}
              onComplete={handleRevealComplete}
            />
          )}
        </motion.div>
      </div>

      <div
        className="relative flex flex-col items-center pb-[calc(env(safe-area-inset-bottom)+18px)] pt-2"
        onPointerDown={() => setHasInteracted(true)}
      >
        <AnimatePresence>
          {showThrowFail && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute -top-9 rounded-full bg-[var(--color-text)] px-4 py-1.5 text-xs font-semibold text-[var(--color-bg)]"
              role="status"
            >
              조금 더 힘껏 위로 던져주세요!
            </motion.p>
          )}
        </AnimatePresence>

        <div className="relative">
          <ThrowablePin
            phase={phase}
            mapContainerRef={mapContainerRef}
            reducedMotion={reducedMotion}
            onDragStart={handleDragStart}
            onInvalidThrow={handleInvalidThrow}
            onValidThrow={handleValidThrow}
            onFlightComplete={handleFlightComplete}
          />
          <IntroGuide visible={phase === "ready" && !hasInteracted} reducedMotion={reducedMotion} />
        </div>

        {phase === "ready" && (
          <button
            type="button"
            onClick={handleRandomDraw}
            className="mt-24 min-h-11 px-3 text-xs text-[var(--color-text)]/45 underline underline-offset-4"
          >
            직접 던지기 어려우신가요? 랜덤으로 뽑기
          </button>
        )}
      </div>

      <AnimatePresence>
        {phase === "result" && result && sheetOpen && (
          <div className="fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-[480px]">
            <ResultSheet
              result={result}
              rerollAvailable={rerollAvailable}
              onReroll={handleReroll}
              onClose={() => setSheetOpen(false)}
            />
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "result" && result && !sheetOpen && (
          <motion.button
            type="button"
            onClick={() => setSheetOpen(true)}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+18px)] z-30 mx-auto min-h-11 w-fit max-w-[calc(100%-3rem)] rounded-full bg-[var(--color-text)] px-6 py-3 text-sm font-semibold text-[var(--color-bg)] shadow-lg active:scale-[0.98]"
          >
            {result.destination.city} 결과 다시 보기
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
