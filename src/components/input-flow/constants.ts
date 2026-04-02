import type { ModeOption, StockSelection } from "./types";

export const FLOW_STEPS = 3;

export const modeOptions: { value: ModeOption; label: string; hint: string }[] = [
  {
    value: "pre",
    label: "사고 싶거나 팔고 싶어요",
    hint: "매매 전 감정 살펴보기",
  },
  {
    value: "post",
    label: "이미 한 매매가 마음에 걸려요",
    hint: "매매 후 감정 기록",
  },
];

export const STOCKS: StockSelection[] = [
  { name: "삼성전자", code: "005930", market: "KOSPI", source: "preset" },
  { name: "삼성SDI", code: "006400", market: "KOSPI", source: "preset" },
  { name: "SK하이닉스", code: "000660", market: "KOSPI", source: "preset" },
  { name: "LG에너지솔루션", code: "373220", market: "KOSPI", source: "preset" },
  { name: "현대차", code: "005380", market: "KOSPI", source: "preset" },
  { name: "기아", code: "000270", market: "KOSPI", source: "preset" },
  { name: "POSCO홀딩스", code: "005490", market: "KOSPI", source: "preset" },
  { name: "에코프로비엠", code: "247540", market: "KOSDAQ", source: "preset" },
  { name: "에코프로", code: "086520", market: "KOSDAQ", source: "preset" },
  { name: "카카오", code: "035720", market: "KOSPI", source: "preset" },
  { name: "네이버", code: "035420", market: "KOSPI", source: "preset" },
  { name: "셀트리온", code: "068270", market: "KOSPI", source: "preset" },
  { name: "NVDA", code: "NVDA", market: "NASDAQ", source: "preset" },
  { name: "TSLA", code: "TSLA", market: "NASDAQ", source: "preset" },
  { name: "AAPL", code: "AAPL", market: "NASDAQ", source: "preset" },
  { name: "MSFT", code: "MSFT", market: "NASDAQ", source: "preset" },
  { name: "AMZN", code: "AMZN", market: "NASDAQ", source: "preset" },
  { name: "META", code: "META", market: "NASDAQ", source: "preset" },
  { name: "GOOGL", code: "GOOGL", market: "NASDAQ", source: "preset" },
];

export const emotionOptions = ["불안해요", "조급해요", "확신해요", "후회돼요", "모르겠어요"];
