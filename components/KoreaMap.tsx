"use client";

import { mapUnits, MAP_VIEWBOX_WIDTH, MAP_VIEWBOX_HEIGHT } from "@/data/mapUnits";
import { provinceOutlines } from "@/data/mapProvinces";
import { regions } from "@/data/regions";
import type { RegionId } from "@/types/destination";
import { cx } from "@/lib/utils";

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

interface KoreaMapProps {
  highlightedRegionId?: RegionId | null;
  /** exact municipality name (Destination.city) to spotlight, e.g. "속초시" */
  highlightedCity?: string | null;
  className?: string;
}

export default function KoreaMap({
  highlightedRegionId,
  highlightedCity,
  className,
}: KoreaMapProps) {
  return (
    <svg
      viewBox={`0 0 ${MAP_VIEWBOX_WIDTH} ${MAP_VIEWBOX_HEIGHT}`}
      className={cx("h-full w-full overflow-visible", className)}
      role="img"
      aria-label="대한민국 지도"
    >
      <g>
        {mapUnits.map((unit) => {
          const isHighlighted =
            highlightedRegionId === unit.regionId && highlightedCity === unit.name;
          const fill = isHighlighted ? "var(--color-map-selected)" : REGION_FILL[unit.regionId];
          return (
            <path
              key={`${unit.regionId}-${unit.name}`}
              data-region={unit.regionId}
              data-city={unit.name}
              d={unit.d}
              style={{ fill }}
              className={cx(
                "transition-[filter,fill] duration-300 ease-out",
                !isHighlighted && "hover:brightness-105"
              )}
              stroke="var(--color-map-unit-border)"
              strokeWidth={0.6}
              strokeLinejoin="round"
            />
          );
        })}
      </g>

      <g
        fill="none"
        stroke="var(--color-map-border)"
        strokeWidth={1.8}
        strokeLinejoin="round"
        className="pointer-events-none"
      >
        {provinceOutlines.map((province) => (
          <path key={province.regionId} d={province.d} />
        ))}
      </g>

      {regions.map((region) => (
        <text
          key={region.id}
          x={region.x * MAP_VIEWBOX_WIDTH}
          y={region.y * MAP_VIEWBOX_HEIGHT}
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
