"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence, animate, useMotionValue } from "framer-motion";
import KoreaMap from "@/components/KoreaMap";
import SkyScene from "@/components/SkyScene";
import IntroScreen from "@/components/IntroScreen";
import ImpactEffect from "@/components/ImpactEffect";
import RevealSequence from "@/components/RevealSequence";
import ResultSheet from "@/components/ResultSheet";
import { selectDestination } from "@/lib/selectDestination";
import { getStoredResult, hasUsedReroll, setRerollUsed, setStoredResult } from "@/lib/storage";
import { trackEvent } from "@/lib/utils";
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
        나도 뛰어내리기
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
  const [introSeen, setIntroSeen] = useState(
    () => Boolean(sharedDestination) || Boolean(getStoredResult())
  );
  const [sheetOpen, setSheetOpen] = useState(true);
  const reducedMotion = useReducedMotion();

  const planeX = useMotionValue(0.5);
  const planeY = useMotionValue(0.42);
  const skyX = useMotionValue(0.5);
  const skyY = useMotionValue(0.42);
  const skyRotate = useMotionValue(0);
  const skyScale = useMotionValue(0.55);

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

  const handleFlightComplete = useCallback(() => {
    setPhase("landed");
    if (typeof navigator !== "undefined") {
      navigator.vibrate?.([30, 30, 50]);
    }
    window.setTimeout(() => setPhase("revealing"), reducedMotion ? 150 : 550);
  }, [reducedMotion]);

  const handleJumpClick = useCallback(() => {
    if (phase !== "ready") return;

    const aimed = { x: planeX.get(), y: planeY.get() };
    const computed = selectDestination(aimed);
    setResult(computed);
    setPhase("flying");
    trackEvent("jump_clicked");
    if (typeof navigator !== "undefined") {
      navigator.vibrate?.(20);
    }

    skyX.set(aimed.x);
    skyY.set(aimed.y);
    skyRotate.set(0);
    skyScale.set(0.55);

    const duration = reducedMotion ? 0.3 : 1.15;
    Promise.all([
      animate(skyX, computed.landingX, { duration, ease: "easeInOut" }),
      animate(skyY, computed.landingY, { duration, ease: [0.3, 0, 0.7, 1] }),
      animate(skyScale, 1, { duration, ease: "easeOut" }),
      animate(
        skyRotate,
        reducedMotion ? 0 : [0, -10, 8, -5, 0],
        { duration, ease: "easeInOut" }
      ),
    ]).then(() => {
      handleFlightComplete();
    });
  }, [phase, reducedMotion, planeX, planeY, skyX, skyY, skyRotate, skyScale, handleFlightComplete]);

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

  if (viewMode === "shared" && sharedDestination) {
    return <SharedIntro destination={sharedDestination} onStart={handleStartOwn} />;
  }

  if (!introSeen) {
    return (
      <IntroScreen onStart={() => setIntroSeen(true)} reducedMotion={reducedMotion} />
    );
  }

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
          {phase === "ready" && (
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
                비행기가 마음에 드는 곳을 지날 때 내려보세요.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="relative mx-6 mt-2 mb-6 flex flex-1 items-center justify-center">
        <div className="relative aspect-[520/553] w-full max-w-[360px]">
          <KoreaMap highlightedRegionId={highlightedRegionId} highlightedCity={highlightedCity} />
          <SkyScene
            phase={phase}
            reducedMotion={reducedMotion}
            planeX={planeX}
            planeY={planeY}
            skyX={skyX}
            skyY={skyY}
            skyRotate={skyRotate}
            skyScale={skyScale}
          />
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
        </div>
      </div>

      {phase === "ready" && (
        <div className="flex justify-center pb-[calc(env(safe-area-inset-bottom)+18px)]">
          <button
            type="button"
            onClick={handleJumpClick}
            className="min-h-11 min-w-[220px] rounded-full bg-[var(--color-accent)] px-8 py-4 text-base font-bold text-white shadow-md active:scale-[0.98]"
          >
            여기서 내리기
          </button>
        </div>
      )}

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
