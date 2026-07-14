import type { Destination } from "@/types/destination";

export const destinations: Destination[] = [
  // 서울특별시
  { id: "seoul-seoul", slug: "seoul", province: "서울특별시", city: "서울특별시", regionId: "seoul" },

  // 부산광역시
  { id: "busan-busan", slug: "busan", province: "부산광역시", city: "부산광역시", regionId: "busan" },

  // 대구광역시
  { id: "daegu-daegu", slug: "daegu", province: "대구광역시", city: "대구광역시", regionId: "daegu" },

  // 인천광역시
  { id: "incheon-incheon", slug: "incheon", province: "인천광역시", city: "인천광역시", regionId: "incheon" },
  { id: "incheon-ganghwa", slug: "ganghwa", province: "인천광역시", city: "강화군", regionId: "incheon" },

  // 광주광역시
  { id: "gwangju-gwangju", slug: "gwangju", province: "광주광역시", city: "광주광역시", regionId: "gwangju" },

  // 대전광역시
  { id: "daejeon-daejeon", slug: "daejeon", province: "대전광역시", city: "대전광역시", regionId: "daejeon" },

  // 울산광역시
  { id: "ulsan-ulsan", slug: "ulsan", province: "울산광역시", city: "울산광역시", regionId: "ulsan" },

  // 세종특별자치시
  { id: "sejong-sejong", slug: "sejong", province: "세종특별자치시", city: "세종특별자치시", regionId: "sejong" },

  // 경기도
  { id: "gyeonggi-suwon", slug: "suwon", province: "경기도", city: "수원시", regionId: "gyeonggi" },
  { id: "gyeonggi-paju", slug: "paju", province: "경기도", city: "파주시", regionId: "gyeonggi" },
  { id: "gyeonggi-gapyeong", slug: "gapyeong", province: "경기도", city: "가평군", regionId: "gyeonggi" },
  { id: "gyeonggi-yangpyeong", slug: "yangpyeong", province: "경기도", city: "양평군", regionId: "gyeonggi" },
  { id: "gyeonggi-pocheon", slug: "pocheon", province: "경기도", city: "포천시", regionId: "gyeonggi" },
  { id: "gyeonggi-yeoju", slug: "yeoju", province: "경기도", city: "여주시", regionId: "gyeonggi" },
  { id: "gyeonggi-ansan", slug: "ansan", province: "경기도", city: "안산시", regionId: "gyeonggi" },
  { id: "gyeonggi-hwaseong", slug: "hwaseong", province: "경기도", city: "화성시", regionId: "gyeonggi" },
  { id: "gyeonggi-yongin", slug: "yongin", province: "경기도", city: "용인시", regionId: "gyeonggi" },
  { id: "gyeonggi-icheon", slug: "icheon", province: "경기도", city: "이천시", regionId: "gyeonggi" },
  { id: "gyeonggi-yeoncheon", slug: "yeoncheon", province: "경기도", city: "연천군", regionId: "gyeonggi" },

  // 강원특별자치도
  { id: "gangwon-chuncheon", slug: "chuncheon", province: "강원특별자치도", city: "춘천시", regionId: "gangwon" },
  { id: "gangwon-gangneung", slug: "gangneung", province: "강원특별자치도", city: "강릉시", regionId: "gangwon" },
  { id: "gangwon-sokcho", slug: "sokcho", province: "강원특별자치도", city: "속초시", regionId: "gangwon" },
  { id: "gangwon-yangyang", slug: "yangyang", province: "강원특별자치도", city: "양양군", regionId: "gangwon" },
  { id: "gangwon-donghae", slug: "donghae", province: "강원특별자치도", city: "동해시", regionId: "gangwon" },
  { id: "gangwon-samcheok", slug: "samcheok", province: "강원특별자치도", city: "삼척시", regionId: "gangwon" },
  { id: "gangwon-wonju", slug: "wonju", province: "강원특별자치도", city: "원주시", regionId: "gangwon" },
  { id: "gangwon-pyeongchang", slug: "pyeongchang", province: "강원특별자치도", city: "평창군", regionId: "gangwon" },
  { id: "gangwon-jeongseon", slug: "jeongseon", province: "강원특별자치도", city: "정선군", regionId: "gangwon" },
  { id: "gangwon-goseong", slug: "goseong", province: "강원특별자치도", city: "고성군", regionId: "gangwon" },
  { id: "gangwon-taebaek", slug: "taebaek", province: "강원특별자치도", city: "태백시", regionId: "gangwon" },
  { id: "gangwon-hongcheon", slug: "hongcheon", province: "강원특별자치도", city: "홍천군", regionId: "gangwon" },
  { id: "gangwon-cheorwon", slug: "cheorwon", province: "강원특별자치도", city: "철원군", regionId: "gangwon" },

  // 충청북도
  { id: "chungbuk-cheongju", slug: "cheongju", province: "충청북도", city: "청주시", regionId: "chungbuk" },
  { id: "chungbuk-chungju", slug: "chungju", province: "충청북도", city: "충주시", regionId: "chungbuk" },
  { id: "chungbuk-jecheon", slug: "jecheon", province: "충청북도", city: "제천시", regionId: "chungbuk" },
  { id: "chungbuk-danyang", slug: "danyang", province: "충청북도", city: "단양군", regionId: "chungbuk" },
  { id: "chungbuk-goesan", slug: "goesan", province: "충청북도", city: "괴산군", regionId: "chungbuk" },
  { id: "chungbuk-boeun", slug: "boeun", province: "충청북도", city: "보은군", regionId: "chungbuk" },
  { id: "chungbuk-okcheon", slug: "okcheon", province: "충청북도", city: "옥천군", regionId: "chungbuk" },

  // 충청남도
  { id: "chungnam-cheonan", slug: "cheonan", province: "충청남도", city: "천안시", regionId: "chungnam" },
  { id: "chungnam-gongju", slug: "gongju", province: "충청남도", city: "공주시", regionId: "chungnam" },
  { id: "chungnam-buyeo", slug: "buyeo", province: "충청남도", city: "부여군", regionId: "chungnam" },
  { id: "chungnam-boryeong", slug: "boryeong", province: "충청남도", city: "보령시", regionId: "chungnam" },
  { id: "chungnam-taean", slug: "taean", province: "충청남도", city: "태안군", regionId: "chungnam" },
  { id: "chungnam-seosan", slug: "seosan", province: "충청남도", city: "서산시", regionId: "chungnam" },
  { id: "chungnam-asan", slug: "asan", province: "충청남도", city: "아산시", regionId: "chungnam" },
  { id: "chungnam-nonsan", slug: "nonsan", province: "충청남도", city: "논산시", regionId: "chungnam" },
  { id: "chungnam-yesan", slug: "yesan", province: "충청남도", city: "예산군", regionId: "chungnam" },
  { id: "chungnam-dangjin", slug: "dangjin", province: "충청남도", city: "당진시", regionId: "chungnam" },

  // 전북특별자치도
  { id: "jeonbuk-jeonju", slug: "jeonju", province: "전북특별자치도", city: "전주시", regionId: "jeonbuk" },
  { id: "jeonbuk-gunsan", slug: "gunsan", province: "전북특별자치도", city: "군산시", regionId: "jeonbuk" },
  { id: "jeonbuk-iksan", slug: "iksan", province: "전북특별자치도", city: "익산시", regionId: "jeonbuk" },
  { id: "jeonbuk-namwon", slug: "namwon", province: "전북특별자치도", city: "남원시", regionId: "jeonbuk" },
  { id: "jeonbuk-gochang", slug: "gochang", province: "전북특별자치도", city: "고창군", regionId: "jeonbuk" },
  { id: "jeonbuk-buan", slug: "buan", province: "전북특별자치도", city: "부안군", regionId: "jeonbuk" },
  { id: "jeonbuk-muju", slug: "muju", province: "전북특별자치도", city: "무주군", regionId: "jeonbuk" },
  { id: "jeonbuk-jeongeup", slug: "jeongeup", province: "전북특별자치도", city: "정읍시", regionId: "jeonbuk" },
  { id: "jeonbuk-jinan", slug: "jinan", province: "전북특별자치도", city: "진안군", regionId: "jeonbuk" },

  // 전라남도
  { id: "jeonnam-yeosu", slug: "yeosu", province: "전라남도", city: "여수시", regionId: "jeonnam" },
  { id: "jeonnam-suncheon", slug: "suncheon", province: "전라남도", city: "순천시", regionId: "jeonnam" },
  { id: "jeonnam-mokpo", slug: "mokpo", province: "전라남도", city: "목포시", regionId: "jeonnam" },
  { id: "jeonnam-damyang", slug: "damyang", province: "전라남도", city: "담양군", regionId: "jeonnam" },
  { id: "jeonnam-boseong", slug: "boseong", province: "전라남도", city: "보성군", regionId: "jeonnam" },
  { id: "jeonnam-haenam", slug: "haenam", province: "전라남도", city: "해남군", regionId: "jeonnam" },
  { id: "jeonnam-wando", slug: "wando", province: "전라남도", city: "완도군", regionId: "jeonnam" },
  { id: "jeonnam-gangjin", slug: "gangjin", province: "전라남도", city: "강진군", regionId: "jeonnam" },
  { id: "jeonnam-gurye", slug: "gurye", province: "전라남도", city: "구례군", regionId: "jeonnam" },
  { id: "jeonnam-naju", slug: "naju", province: "전라남도", city: "나주시", regionId: "jeonnam" },
  { id: "jeonnam-sinan", slug: "sinan", province: "전라남도", city: "신안군", regionId: "jeonnam" },
  { id: "jeonnam-goheung", slug: "goheung", province: "전라남도", city: "고흥군", regionId: "jeonnam" },

  // 경상북도
  { id: "gyeongbuk-gyeongju", slug: "gyeongju", province: "경상북도", city: "경주시", regionId: "gyeongbuk" },
  { id: "gyeongbuk-pohang", slug: "pohang", province: "경상북도", city: "포항시", regionId: "gyeongbuk" },
  { id: "gyeongbuk-andong", slug: "andong", province: "경상북도", city: "안동시", regionId: "gyeongbuk" },
  { id: "gyeongbuk-yeongju", slug: "yeongju", province: "경상북도", city: "영주시", regionId: "gyeongbuk" },
  { id: "gyeongbuk-mungyeong", slug: "mungyeong", province: "경상북도", city: "문경시", regionId: "gyeongbuk" },
  { id: "gyeongbuk-uljin", slug: "uljin", province: "경상북도", city: "울진군", regionId: "gyeongbuk" },
  { id: "gyeongbuk-yeongdeok", slug: "yeongdeok", province: "경상북도", city: "영덕군", regionId: "gyeongbuk" },
  { id: "gyeongbuk-cheongdo", slug: "cheongdo", province: "경상북도", city: "청도군", regionId: "gyeongbuk" },
  { id: "gyeongbuk-sangju", slug: "sangju", province: "경상북도", city: "상주시", regionId: "gyeongbuk" },
  { id: "gyeongbuk-gimcheon", slug: "gimcheon", province: "경상북도", city: "김천시", regionId: "gyeongbuk" },
  { id: "gyeongbuk-bonghwa", slug: "bonghwa", province: "경상북도", city: "봉화군", regionId: "gyeongbuk" },

  // 경상남도
  { id: "gyeongnam-changwon", slug: "changwon", province: "경상남도", city: "창원시", regionId: "gyeongnam" },
  { id: "gyeongnam-tongyeong", slug: "tongyeong", province: "경상남도", city: "통영시", regionId: "gyeongnam" },
  { id: "gyeongnam-geoje", slug: "geoje", province: "경상남도", city: "거제시", regionId: "gyeongnam" },
  { id: "gyeongnam-namhae", slug: "namhae", province: "경상남도", city: "남해군", regionId: "gyeongnam" },
  { id: "gyeongnam-jinju", slug: "jinju", province: "경상남도", city: "진주시", regionId: "gyeongnam" },
  { id: "gyeongnam-hadong", slug: "hadong", province: "경상남도", city: "하동군", regionId: "gyeongnam" },
  { id: "gyeongnam-miryang", slug: "miryang", province: "경상남도", city: "밀양시", regionId: "gyeongnam" },
  { id: "gyeongnam-sancheong", slug: "sancheong", province: "경상남도", city: "산청군", regionId: "gyeongnam" },
  { id: "gyeongnam-sacheon", slug: "sacheon", province: "경상남도", city: "사천시", regionId: "gyeongnam" },
  { id: "gyeongnam-hapcheon", slug: "hapcheon", province: "경상남도", city: "합천군", regionId: "gyeongnam" },

  // 제주특별자치도
  { id: "jeju-jejusi", slug: "jejusi", province: "제주특별자치도", city: "제주시", regionId: "jeju" },
  { id: "jeju-seogwipo", slug: "seogwipo", province: "제주특별자치도", city: "서귀포시", regionId: "jeju" },
];

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((destination) => destination.slug === slug);
}

export function getDestinationsByRegion(regionId: string): Destination[] {
  return destinations.filter((destination) => destination.regionId === regionId);
}
