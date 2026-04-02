import type { ChatFooterModel, ChatMessage, ChatScenario, ChatViewModel } from "./types";

function buildQuestionMessages(scenario: ChatScenario): ChatMessage[] {
  return [
    {
      id: `${scenario.id}-user-opening`,
      role: "user",
      text: scenario.userText,
    },
    {
      id: `${scenario.id}-empathy`,
      role: "assistant",
      text: scenario.promptResponse.empathy,
      showAvatar: true,
    },
    {
      id: `${scenario.id}-question`,
      role: "assistant",
      text: scenario.promptResponse.question,
    },
  ];
}

export function buildChatViewModel(scenario: ChatScenario): ChatViewModel {
  const questionMessages = buildQuestionMessages(scenario);
  let messages: ChatMessage[] = [];
  let footer: ChatFooterModel;

  switch (scenario.stage) {
    case "awaiting":
      messages = [
        {
          id: `${scenario.id}-user-opening`,
          role: "user",
          text: scenario.userText,
        },
        {
          id: `${scenario.id}-typing`,
          role: "typing",
        },
      ];
      footer = {
        type: "composer",
        placeholder: "AI가 답변을 정리하고 있어요",
        submitLabel: "보내기",
        disabled: true,
        disabledHint: "응답이 오면 다시 입력할 수 있어요.",
      };
      break;

    case "question":
      messages = questionMessages;
      footer = {
        type: "composer",
        placeholder: "직접 적어주세요",
        secondaryActionLabel: scenario.mode === "pre" ? "건너갈게요" : "이대로 복기할게요",
        submitLabel: "보내기",
      };
      break;

    case "meta":
      messages = [
        ...questionMessages,
        {
          id: `${scenario.id}-user-reply`,
          role: "user",
          text: scenario.userReply ?? "조급함 때문에 더 흔들리는 것 같아요.",
        },
        {
          id: `${scenario.id}-meta-question`,
          role: "assistant",
          text: scenario.promptResponse.meta_question ?? "",
          showAvatar: true,
        },
      ];
      footer = {
        type: "choices",
        title: "지금 필요한 선택",
        description: "계속 진행할지, 감정이 앞선 상태인지 마지막으로 나눠봅니다.",
        choices: (scenario.promptResponse.meta_options ?? []).map((option, index) => ({
          id: `${scenario.id}-meta-option-${index}`,
          label: option,
          highlighted: scenario.selectedMetaOption ? scenario.selectedMetaOption === option : index === 1,
        })),
      };
      break;

    case "complete":
      messages = [
        ...questionMessages,
        {
          id: `${scenario.id}-user-reply`,
          role: "user",
          text: scenario.userReply ?? "감정이 먼저였다는 걸 이제야 알겠어요.",
        },
        {
          id: `${scenario.id}-completion`,
          role: "assistant",
          text: scenario.completionMessage ?? "좋아요. 이 내용은 결과 화면에서 이어서 정리할게요.",
          showAvatar: true,
        },
      ];
      footer = {
        type: "cta",
        title: "복기를 저장할 준비가 됐어요",
        label: scenario.completionCtaLabel ?? "결과 보기",
        description: "복기 내용을 저장하고 다음 화면으로 이어집니다.",
      };
      break;
  }

  return {
    id: scenario.id,
    mode: scenario.mode,
    stage: scenario.stage,
    distortionLabel: scenario.promptResponse.distortion_tag,
    messages,
    footer,
  };
}
