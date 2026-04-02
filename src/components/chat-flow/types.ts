export type ChatMode = "pre" | "post";
export type ChatStage = "awaiting" | "question" | "meta" | "complete";
export type ChatPreviewStateId =
  | "pre-awaiting"
  | "pre-question"
  | "pre-meta"
  | "post-question"
  | "post-complete";

export type PromptResponse = {
  distortion_type:
    | "catastrophizing"
    | "all_or_nothing"
    | "emotional_reasoning"
    | "confirmation_bias"
    | "fomo_herd"
    | "illusion_of_control"
    | "anchoring_bias"
    | "sunk_cost";
  distortion_tag: string;
  empathy: string;
  question: string;
  meta_question: string | null;
  meta_options: string[] | null;
  required: boolean;
};

export type ChatMessage =
  | {
      id: string;
      role: "user";
      text: string;
    }
  | {
      id: string;
      role: "assistant";
      text: string;
      showAvatar?: boolean;
    }
  | {
      id: string;
      role: "typing";
    };

export type ChatFooterModel =
  | {
      type: "composer";
      placeholder: string;
      secondaryActionLabel?: string;
      submitLabel?: string;
      disabled?: boolean;
      disabledHint?: string;
    }
  | {
      type: "choices";
      title?: string;
      description?: string;
      choices: {
        id: string;
        label: string;
        highlighted?: boolean;
      }[];
    }
  | {
      type: "cta";
      title?: string;
      label: string;
      description?: string;
    };

export type ChatScenario = {
  id: ChatPreviewStateId;
  mode: ChatMode;
  stage: ChatStage;
  userText: string;
  promptResponse: PromptResponse;
  userReply?: string;
  selectedMetaOption?: string;
  completionMessage?: string;
  completionCtaLabel?: string;
};

export type ChatViewModel = {
  id: ChatPreviewStateId;
  mode: ChatMode;
  stage: ChatStage;
  distortionLabel: string;
  messages: ChatMessage[];
  footer: ChatFooterModel;
};
