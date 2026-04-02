export type InsightRecord = {
  id: string;
  date: string;
  tag: string;
  outcome: "관망" | "진행" | "기록";
};

export type EmotionStory = {
  id: string;
  tag: string;
  mode: "사전" | "사후";
  content: string;
};

export type InsightsTabId = "calendar" | "board";
