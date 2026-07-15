import KoreaMap from "@/components/KoreaMap";
import { SERVICE_NAME, SERVICE_SLOGAN } from "@/lib/constants";
import type { ThrowResult } from "@/types/destination";

interface ShareCardProps {
  result: ThrowResult;
}

export default function ShareCard({ result }: ShareCardProps) {
  return (
    <div
      className="flex h-[1920px] w-[1080px] flex-col items-center bg-[var(--color-bg)] px-16 py-20 font-sans"
      style={{ backgroundColor: "#F6F1E7" }}
    >
      <p className="text-4xl font-bold tracking-tight text-[var(--color-text)]">
        {SERVICE_NAME}
      </p>
      <p className="mt-6 text-3xl text-[var(--color-text)]/70">
        대한민국 랜덤 여행 결과
      </p>

      <div className="mt-16 text-center">
        <p className="text-5xl font-bold text-[var(--color-accent)]">
          {result.destination.province}
        </p>
        <p className="mt-4 text-8xl font-black tracking-tight text-[var(--color-text)]">
          {result.destination.city}
        </p>
      </div>

      <div className="relative mt-16 flex h-[820px] w-full items-center justify-center">
        <KoreaMap
          highlightedRegionId={result.destination.regionId}
          highlightedCity={result.destination.city}
          className="h-full w-full"
        />
        <div
          className="absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-pin)] shadow-lg"
          style={{ left: `${result.landingX * 100}%`, top: `${result.landingY * 100}%` }}
        />
      </div>

      <div className="mt-16 w-full rounded-3xl bg-[var(--color-map-base)] px-10 py-8 text-center">
        <p className="text-2xl font-semibold text-[var(--color-text)]/70">
          오늘의 여행 룰
        </p>
        <p className="mt-3 text-3xl font-bold text-[var(--color-text)]">
          {result.travelRule}
        </p>
      </div>

      <p className="mt-auto pt-16 text-3xl font-semibold text-[var(--color-text)]/80">
        {SERVICE_SLOGAN}
      </p>
    </div>
  );
}
