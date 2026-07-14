import type { Region } from "@/types/destination";

export const regions: Region[] = [
  { id: "seoul", label: "서울특별시", x: 0.34, y: 0.23 },
  { id: "incheon", label: "인천광역시", x: 0.25, y: 0.25 },
  { id: "gyeonggi", label: "경기도", x: 0.37, y: 0.28 },
  { id: "gangwon", label: "강원특별자치도", x: 0.62, y: 0.23 },
  { id: "sejong", label: "세종특별자치시", x: 0.4, y: 0.42 },
  { id: "daejeon", label: "대전광역시", x: 0.42, y: 0.47 },
  { id: "chungbuk", label: "충청북도", x: 0.5, y: 0.4 },
  { id: "chungnam", label: "충청남도", x: 0.31, y: 0.45 },
  { id: "daegu", label: "대구광역시", x: 0.65, y: 0.58 },
  { id: "gyeongbuk", label: "경상북도", x: 0.67, y: 0.48 },
  { id: "ulsan", label: "울산광역시", x: 0.76, y: 0.65 },
  { id: "busan", label: "부산광역시", x: 0.74, y: 0.74 },
  { id: "gyeongnam", label: "경상남도", x: 0.58, y: 0.7 },
  { id: "jeonbuk", label: "전북특별자치도", x: 0.39, y: 0.58 },
  { id: "gwangju", label: "광주광역시", x: 0.31, y: 0.69 },
  { id: "jeonnam", label: "전라남도", x: 0.31, y: 0.77 },
  { id: "jeju", label: "제주특별자치도", x: 0.28, y: 0.94 },
];

export function getRegionById(id: string) {
  return regions.find((region) => region.id === id);
}
