export type RegionId =
  | "seoul"
  | "incheon"
  | "gyeonggi"
  | "gangwon"
  | "sejong"
  | "daejeon"
  | "chungbuk"
  | "chungnam"
  | "daegu"
  | "gyeongbuk"
  | "ulsan"
  | "busan"
  | "gyeongnam"
  | "jeonbuk"
  | "gwangju"
  | "jeonnam"
  | "jeju";

export interface Region {
  id: RegionId;
  label: string;
  /** normalized anchor position within the map container, 0 to 1 */
  x: number;
  y: number;
}

export interface Destination {
  id: string;
  slug: string;
  province: string;
  city: string;
  regionId: RegionId;
}

export type AppPhase =
  | "ready"
  | "dragging"
  | "flying"
  | "landed"
  | "revealing"
  | "result";

export interface ThrowResult {
  destination: Destination;
  travelRule: string;
  resultMessage: string;
  /** normalized landing position of the pin within the map, 0 to 1 */
  landingX: number;
  landingY: number;
  timestamp: number;
}
