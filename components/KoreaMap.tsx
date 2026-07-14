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

const SVG_ID_TO_REGION: Record<string, RegionId> = Object.fromEntries(
  Object.entries(REGION_TO_SVG_ID).map(([regionId, svgId]) => [svgId, regionId as RegionId])
);

// Neighbouring provinces get different tones from this shared warm palette so
// borders read clearly at a glance, without turning the map into a rainbow.
const REGION_FILL: Record<RegionId, string> = {
  seoul: "#E4D9C2",
  gangwon: "#E4D9C2",
  daejeon: "#E4D9C2",
  jeonnam: "#E4D9C2",
  ulsan: "#E4D9C2",
  jeju: "#E4D9C2",
  incheon: "#CFC2A0",
  chungbuk: "#CFC2A0",
  gwangju: "#CFC2A0",
  gyeongnam: "#CFC2A0",
  gyeonggi: "#E0CBAE",
  jeonbuk: "#E0CBAE",
  daegu: "#E0CBAE",
  chungnam: "#D3BFA0",
  gyeongbuk: "#D3BFA0",
  busan: "#D3BFA0",
  sejong: "#C7B78F",
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
    </svg>
  );
}
