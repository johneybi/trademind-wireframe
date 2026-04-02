export type ResultMode = "pre" | "post";

export type ResultPreviewStateId = "pre" | "post";
export type ResultDecision = "pause" | "proceed";

export type ResultStat = {
  primaryLabel: string;
  primaryValue: number;
  secondaryLabel: string;
  secondaryValue: number;
  helperText: string;
};

export type ResultFeedbackState = {
  title: string;
  description: string;
  actionLabel: string;
};

export type ResultScenario = {
  id: ResultPreviewStateId;
  mode: ResultMode;
  badgeLabel: string;
  title: string;
  description: string;
  distortionTag: string;
  summaryTitle: string;
  summaryBody: string;
  reflectionNote?: string;
  stat: ResultStat;
  reasonsTitle: string;
  reasons: string[];
  footerTitle: string;
  footerDescription: string;
  primaryActionLabel: string;
  secondaryActionLabel?: string;
  decisionResponses?: Record<ResultDecision, ResultFeedbackState>;
  postActionResponse?: ResultFeedbackState;
};
