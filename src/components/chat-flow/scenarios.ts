import type { ChatPreviewStateId, ChatScenario, PromptResponse } from "./types";

const preResponse: PromptResponse = {
  question_type: "exploratory",
  distortion_type: "catastrophizing",
  distortion_tag: "최악을 상상하고 있어요",
  empathy: "3일 연속 하락이면 정말 불안하셨겠어요.",
  question:
    "처음 이 종목을 매수했을 때의 근거, 예를 들면 실적이나 배당, 장기 보유 계획 같은 것들이 오늘도 여전히 유효한가요?",
  meta_question_type: "meta_cognition",
  meta_question:
    "지금 매도하려는 이유가 '매수 근거가 실제로 바뀌어서'인가요, 아니면 '빨간 숫자를 보는 게 너무 불안해서'인가요?",
  meta_options: ["매수 근거가 바뀌었어요", "감정 때문인 것 같아요"],
};

const postResponse: PromptResponse = {
  question_type: "exploratory",
  distortion_type: "all_or_nothing",
  distortion_tag: "지금 아니면 안 된다는 생각",
  empathy: "이미 매수를 하셨군요. 괜찮아요, 지금 이렇게 돌아보는 것 자체가 중요한 첫 걸음이에요.",
  question: "매수 직전, 어떤 근거를 보고 결정하셨나요? 아니면 근거보다 감정이 먼저였나요?",
  meta_question_type: null,
  meta_question: null,
  meta_options: null,
};

export const chatScenarios: Record<ChatPreviewStateId, ChatScenario> = {
  "pre-awaiting": {
    id: "pre-awaiting",
    mode: "pre",
    stage: "awaiting",
    userText: "삼성전자 3일 연속 빠지는데 더 떨어지기 전에 팔아야 할 것 같아요.",
    promptResponse: preResponse,
  },
  "pre-question": {
    id: "pre-question",
    mode: "pre",
    stage: "question",
    userText: "삼성전자 3일 연속 빠지는데 더 떨어지기 전에 팔아야 할 것 같아요.",
    promptResponse: preResponse,
  },
  "pre-meta": {
    id: "pre-meta",
    mode: "pre",
    stage: "meta",
    userText: "삼성전자 3일 연속 빠지는데 더 떨어지기 전에 팔아야 할 것 같아요.",
    userReply: "근거가 바뀌었다기보다 손실이 더 커질까 봐 무서워요.",
    promptResponse: preResponse,
  },
  "post-question": {
    id: "post-question",
    mode: "post",
    stage: "question",
    userText: "아까 에코프로 급등할 때 참지 못하고 사버렸는데, 벌써 4% 빠지고 있어요.",
    promptResponse: postResponse,
  },
  "post-complete": {
    id: "post-complete",
    mode: "post",
    stage: "complete",
    userText: "아까 에코프로 급등할 때 참지 못하고 사버렸는데, 벌써 4% 빠지고 있어요.",
    userReply: "급등하는 걸 놓치면 안 될 것 같아서 근거보다 조급함이 먼저였어요.",
    promptResponse: postResponse,
    completionMessage: "좋아요. 지금 나눈 내용은 결과 화면에서 한 번 더 정리해볼게요.",
    completionCtaLabel: "결과 보기",
  },
};
