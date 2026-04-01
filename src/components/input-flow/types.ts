export type InputStep = 0 | 1 | 2 | 3 | 4;

export type ModeOption = "pre" | "post";

export type StockSelection = {
  name: string;
  code?: string;
  market?: string;
  source: "preset" | "manual";
};
