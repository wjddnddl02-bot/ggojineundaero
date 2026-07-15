import type { Region } from "@/types/destination";

// x/y are normalized centroids (0 to 1) of each province's real boundary,
// derived from KOSTAT administrative geometry (see data/mapUnits.ts).
export const regions: Region[] = [
  { id: "seoul", label: "서울특별시", shortLabel: "서울", x: 0.376, y: 0.201 },
  { id: "incheon", label: "인천광역시", shortLabel: "인천", x: 0.286, y: 0.194 },
  { id: "gyeonggi", label: "경기도", shortLabel: "경기", x: 0.406, y: 0.204 },
  { id: "gangwon", label: "강원특별자치도", shortLabel: "강원", x: 0.583, y: 0.168 },
  { id: "sejong", label: "세종특별자치시", shortLabel: "세종", x: 0.419, y: 0.387 },
  { id: "daejeon", label: "대전광역시", shortLabel: "대전", x: 0.44, y: 0.428 },
  { id: "chungbuk", label: "충청북도", shortLabel: "충북", x: 0.51, y: 0.353 },
  { id: "chungnam", label: "충청남도", shortLabel: "충남", x: 0.354, y: 0.392 },
  { id: "daegu", label: "대구광역시", shortLabel: "대구", x: 0.632, y: 0.496 },
  { id: "gyeongbuk", label: "경상북도", shortLabel: "경북", x: 0.656, y: 0.425 },
  { id: "ulsan", label: "울산광역시", shortLabel: "울산", x: 0.733, y: 0.573 },
  { id: "busan", label: "부산광역시", shortLabel: "부산", x: 0.705, y: 0.637 },
  { id: "gyeongnam", label: "경상남도", shortLabel: "경남", x: 0.578, y: 0.614 },
  { id: "jeonbuk", label: "전북특별자치도", shortLabel: "전북", x: 0.401, y: 0.543 },
  { id: "gwangju", label: "광주광역시", shortLabel: "광주", x: 0.351, y: 0.646 },
  { id: "jeonnam", label: "전라남도", shortLabel: "전남", x: 0.363, y: 0.695 },
  { id: "jeju", label: "제주특별자치도", shortLabel: "제주", x: 0.306, y: 0.966 },
];

export function getRegionById(id: string) {
  return regions.find((region) => region.id === id);
}
