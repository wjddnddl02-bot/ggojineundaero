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

// Every one of the 17 regions gets its own hue (not shared with any other
// region) so the map reads unambiguously like a real administrative map,
// instead of a handful of tones repeated across the country.
const REGION_FILL: Record<RegionId, string> = {
  seoul: "hsl(0, 55%, 80%)",
  gyeonggi: "hsl(148, 35%, 76%)",
  incheon: "hsl(296, 38%, 82%)",
  gangwon: "hsl(85, 38%, 74%)",
  gyeongbuk: "hsl(233, 40%, 82%)",
  daegu: "hsl(21, 50%, 76%)",
  ulsan: "hsl(169, 40%, 74%)",
  busan: "hsl(318, 40%, 82%)",
  gyeongnam: "hsl(106, 32%, 74%)",
  jeonnam: "hsl(254, 42%, 82%)",
  gwangju: "hsl(42, 48%, 76%)",
  jeonbuk: "hsl(191, 42%, 76%)",
  chungnam: "hsl(339, 45%, 80%)",
  sejong: "hsl(127, 30%, 74%)",
  daejeon: "hsl(275, 40%, 82%)",
  chungbuk: "hsl(64, 40%, 68%)",
  jeju: "hsl(212, 42%, 80%)",
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
