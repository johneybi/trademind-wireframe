export type InsightRecord = {
  id: string;
  date: string;
  mode: "사전" | "사후";
  emotion: string;
  distortion: string;
  summary: string;
};

export type EmotionStory = {
  id: string;
  tag: string;
  mode: "사전" | "사후";
  content: string;
};
