"use client";

import southKorea from "@svg-maps/south-korea";
import { regions } from "@/data/regions";
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

const SVG_ID_TO_REGION: Record<string, RegionId> = Object.fromEntries(
  Object.entries(REGION_TO_SVG_ID).map(([regionId, svgId]) => [svgId, regionId as RegionId])
);

// Neighbouring provinces get a different hue from this muted palette so every
// border reads clearly at a glance, like a real reference map rather than a
// single-tone silhouette.
const REGION_FILL: Record<RegionId, string> = {
  seoul: "#E7B79A",
  gangwon: "#E7B79A",
  daejeon: "#E7B79A",
  jeonnam: "#E7B79A",
  ulsan: "#E7B79A",
  jeju: "#E7B79A",
  incheon: "#AEB6CC",
  chungbuk: "#AEB6CC",
  gwangju: "#AEB6CC",
  gyeongnam: "#AEB6CC",
  gyeonggi: "#B4C69B",
  jeonbuk: "#B4C69B",
  daegu: "#B4C69B",
  chungnam: "#DCC583",
  gyeongbuk: "#DCC583",
  busan: "#DCC583",
  sejong: "#C6A3B8",
};

const [VIEWBOX_WIDTH, VIEWBOX_HEIGHT] = southKorea.viewBox
  .split(" ")
  .slice(2)
  .map(Number);

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
        const regionId = SVG_ID_TO_REGION[location.id];
        return (
          <path
            key={location.id}
            data-region={regionId}
            d={location.path}
            style={isHighlighted ? undefined : { fill: REGION_FILL[regionId] }}
            className={cx(
              "transition-[filter,fill] duration-300 ease-out",
              isHighlighted
                ? "fill-[var(--color-map-selected)]"
                : "hover:brightness-105"
            )}
            stroke="var(--color-map-border)"
            strokeWidth={1.6}
            strokeLinejoin="round"
          />
        );
      })}

      {regions.map((region) => (
        <text
          key={region.id}
          x={region.x * VIEWBOX_WIDTH}
          y={region.y * VIEWBOX_HEIGHT}
          textAnchor="middle"
          dominantBaseline="middle"
          className="pointer-events-none select-none"
          style={{
            fontSize: 13,
            fontWeight: 700,
            fill: "var(--color-text)",
            paintOrder: "stroke",
            stroke: "var(--color-bg)",
            strokeWidth: 3,
            strokeLinejoin: "round",
          }}
        >
          {region.shortLabel}
        </text>
      ))}
    </svg>
  );
}
