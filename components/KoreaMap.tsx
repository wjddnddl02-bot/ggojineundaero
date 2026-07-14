"use client";

import southKorea from "@svg-maps/south-korea";
import type { RegionId } from "@/types/destination";
import { cx } from "@/lib/utils";

const REGION_TO_SVG_ID: Record<RegionId, string> = {
  seoul: "seoul",
  incheon: "incheon",
  gyeonggi: "gyeonggi",
  gangwon: "gangwon",
  sejong: "sejong",
  daejeon: "daejeon",
  chungbuk: "north-chungcheong",
  chungnam: "south-chungcheong",
  daegu: "daegu",
  gyeongbuk: "north-gyeongsang",
  ulsan: "ulsan",
  busan: "busan",
  gyeongnam: "south-gyeongsang",
  jeonbuk: "north-jeolla",
  gwangju: "gwangju",
  jeonnam: "south-jeolla",
  jeju: "jeju",
};

interface KoreaMapProps {
  highlightedRegionId?: RegionId | null;
  className?: string;
}

interface MapLocation {
  id: string;
  name: string;
  path: string;
}

export default function KoreaMap({ highlightedRegionId, className }: KoreaMapProps) {
  const highlightedSvgId = highlightedRegionId
    ? REGION_TO_SVG_ID[highlightedRegionId]
    : null;
  const locations = southKorea.locations as unknown as MapLocation[];

  return (
    <svg
      viewBox={southKorea.viewBox}
      className={cx("h-full w-full overflow-visible", className)}
      role="img"
      aria-label="대한민국 지도"
    >
      {locations.map((location) => {
        const isHighlighted = location.id === highlightedSvgId;
        return (
          <path
            key={location.id}
            d={location.path}
            className={cx(
              "transition-colors duration-300 ease-out",
              isHighlighted
                ? "fill-[var(--color-map-selected)]"
                : "fill-[var(--color-map-base)] hover:fill-[var(--color-map-hover)]"
            )}
            stroke="var(--color-map-border)"
            strokeWidth={1.4}
            strokeLinejoin="round"
          />
        );
      })}
    </svg>
  );
}
