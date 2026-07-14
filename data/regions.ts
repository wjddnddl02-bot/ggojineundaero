import type { Region } from "@/types/destination";

export const regions: Region[] = [
  { id: "seoul", label: "서울특별시", shortLabel: "서울", x: 0.34, y: 0.23 },
  { id: "incheon", label: "인천광역시", shortLabel: "인천", x: 0.25, y: 0.25 },
  { id: "gyeonggi", label: "경기도", shortLabel: "경기", x: 0.37, y: 0.28 },
  { id: "gangwon", label: "강원특별자치도", shortLabel: "강원", x: 0.62, y: 0.23 },
  { id: "sejong", label: "세종특별자치시", shortLabel: "세종", x: 0.4, y: 0.42 },
  { id: "daejeon", label: "대전광역시", shortLabel: "대전", x: 0.42, y: 0.47 },
  { id: "chungbuk", label: "충청북도", shortLabel: "충북", x: 0.5, y: 0.4 },
  { id: "chungnam", label: "충청남도", shortLabel: "충남", x: 0.31, y: 0.45 },
  { id: "daegu", label: "대구광역시", shortLabel: "대구", x: 0.57, y: 0.53 },
  { id: "gyeongbuk", label: "경상북도", shortLabel: "경북", x: 0.67, y: 0.48 },
  { id: "ulsan", label: "울산광역시", shortLabel: "울산", x: 0.69, y: 0.58 },
  { id: "busan", label: "부산광역시", shortLabel: "부산", x: 0.66, y: 0.64 },
  { id: "gyeongnam", label: "경상남도", shortLabel: "경남", x: 0.58, y: 0.7 },
  { id: "jeonbuk", label: "전북특별자치도", shortLabel: "전북", x: 0.39, y: 0.58 },
  { id: "gwangju", label: "광주광역시", shortLabel: "광주", x: 0.31, y: 0.69 },
  { id: "jeonnam", label: "전라남도", shortLabel: "전남", x: 0.31, y: 0.77 },
  { id: "jeju", label: "제주특별자치도", shortLabel: "제주", x: 0.28, y: 0.94 },
];

export function getRegionById(id: string) {
  return regions.find((region) => region.id === id);
}
