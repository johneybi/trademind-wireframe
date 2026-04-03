import type { EmotionStory, InsightRecord } from "./types";

export const calendarLegend = [
  { label: "없음", tone: "bg-stone-100" },
  { label: "한 번", tone: "bg-stone-400" },
  { label: "여러 번", tone: "bg-stone-900" },
] as const;

export const calendarCells = [
  "empty",
  "empty",
  "single",
  "single",
  "empty",
  "multiple",
  "empty",
  "single",
  "empty",
  "multiple",
  "single",
  "empty",
  "empty",
  "multiple",
  "single",
  "empty",
  "empty",
  "single",
  "single",
  "empty",
  "single",
  "empty",
  "empty",
  "multiple",
  "single",
  "multiple",
  "empty",
  "empty",
] as const;

export const distortionFrequency = [
  { label: "지금 아니면 안 된다는 생각", value: 42 },
  { label: "최악을 상상하고 있어요", value: 31 },
  { label: "나만 뒤처질 것 같은 느낌", value: 18 },
  { label: "처음 본 가격에 묶여 있어요", value: 9 },
] as const;

export const recentRecords: InsightRecord[] = [
  {
    id: "record-1",
    date: "04.02",
    mode: "사전",
    emotion: "조급해요",
    distortion: "지금 아니면 안 된다는 생각",
    summary: "급등 흐름을 보고 따라가고 싶은 마음이 컸어요.",
  },
  {
    id: "record-2",
    date: "04.01",
    mode: "사전",
    emotion: "불안해요",
    distortion: "최악을 상상하고 있어요",
    summary: "연속 하락을 보며 손실이 더 커질까 걱정했어요.",
  },
  {
    id: "record-3",
    date: "03.31",
    mode: "사후",
    emotion: "후회돼요",
    distortion: "나만 뒤처질 것 같은 느낌",
    summary: "급등 때 들어간 뒤 왜 그때 서둘렀는지 돌아봤어요.",
  },
  {
    id: "record-4",
    date: "03.30",
    mode: "사후",
    emotion: "억울해요",
    distortion: "처음 본 가격에 묶여 있어요",
    summary: "예전 가격을 기준으로 보고 있었던 이유를 다시 적어봤어요.",
  },
] as const;

export const emotionDistribution = [
  { label: "조급해요", value: 38 },
  { label: "불안해요", value: 27 },
  { label: "후회돼요", value: 19 },
  { label: "억울해요", value: 16 },
] as const;

export const emotionStories: EmotionStory[] = [
  {
    id: "story-1",
    tag: "지금 아니면 안 된다는 생각",
    mode: "사전",
    content: "NVDA 급등을 보고 30분만 기다리자고 적었더니 손이 조금 느려졌어요.",
  },
  {
    id: "story-2",
    tag: "최악을 상상하고 있어요",
    mode: "사전",
    content: "삼성전자 3일 연속 하락을 보고도 근거가 바뀐 건 아니라는 걸 다시 적었어요.",
  },
  {
    id: "story-3",
    tag: "지금 아니면 안 된다는 생각",
    mode: "사후",
    content: "급등 추격 뒤 복기하면서, 다음엔 30분 기다리는 규칙을 만들었어요.",
  },
  {
    id: "story-4",
    tag: "나만 뒤처질 것 같은 느낌",
    mode: "사전",
    content: "FOMO일 때 화면을 닫아도 괜찮다는 걸 적어두고 넘겼어요.",
  },
] as const;
