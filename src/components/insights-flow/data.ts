import type { EmotionStory, InsightRecord } from "./types";

export const calendarLegend = [
  { label: "관망", tone: "bg-stone-900" },
  { label: "진행", tone: "bg-stone-400" },
  { label: "기록", tone: "bg-stone-200" },
] as const;

export const calendarCells = [
  "empty",
  "empty",
  "review",
  "pause",
  "empty",
  "proceed",
  "empty",
  "pause",
  "empty",
  "review",
  "pause",
  "empty",
  "empty",
  "proceed",
  "pause",
  "empty",
  "empty",
  "review",
  "pause",
  "empty",
  "pause",
  "empty",
  "empty",
  "proceed",
  "pause",
  "review",
  "empty",
  "empty",
] as const;

export const distortionFrequency = [
  { label: "지금 아니면 안 된다는 생각", value: 42 },
  { label: "최악을 상상하고 있어요", value: 31 },
  { label: "나만 뒤처지는 것 같은 느낌", value: 18 },
  { label: "그 가격이 머릿속에 박혀 있어요", value: 9 },
];

export const recentRecords: InsightRecord[] = [
  { id: "record-1", date: "04.02", tag: "지금 아니면 안 된다는 생각", outcome: "관망" },
  { id: "record-2", date: "04.01", tag: "최악을 상상하고 있어요", outcome: "진행" },
  { id: "record-3", date: "03.31", tag: "지금 아니면 안 된다는 생각", outcome: "기록" },
  { id: "record-4", date: "03.30", tag: "나만 뒤처지는 것 같은 느낌", outcome: "관망" },
];

export const emotionDistribution = [
  { label: "지금 아니면 안 된다는 생각", value: 38 },
  { label: "최악을 상상하고 있어요", value: 27 },
  { label: "나만 뒤처지는 것 같은 느낌", value: 19 },
  { label: "불안함이 신호처럼 느껴져요", value: 16 },
];

export const emotionStories: EmotionStory[] = [
  {
    id: "story-1",
    tag: "지금 아니면 안 된다는 생각",
    mode: "사전",
    content: "NVDA 급등 보고 30분 기다렸다가 안 샀어요",
  },
  {
    id: "story-2",
    tag: "최악을 상상하고 있어요",
    mode: "사전",
    content: "삼성전자 3일 연속 하락인데 일단 버텨보기로 했어요",
  },
  {
    id: "story-3",
    tag: "지금 아니면 안 된다는 생각",
    mode: "사후",
    content: "급등장에서 산 거 거의 다 후회함. 이제 30분 기다리는 규칙 만들었어요",
  },
  {
    id: "story-4",
    tag: "나만 뒤처지는 것 같은 느낌",
    mode: "사전",
    content: "FOMO인 거 알면서도 샀다가 후회한 게 한두 번이 아님",
  },
];
