import type { ResultScenario, ResultPreviewStateId } from "./types";

export const resultScenarios: Record<ResultPreviewStateId, ResultScenario> = {
  pre: {
    id: "pre",
    mode: "pre",
    badgeLabel: "매매 전 점검 결과",
    title: "지금 판단을 한 번 더 살펴봤어요",
    description: "감정이 앞서는 지점을 짧게 정리하고, 비슷한 상황의 선택도 함께 봅니다.",
    distortionTag: "🌀 최악을 상상하고 있어요",
    summaryTitle: "지금 보이는 흐름",
    summaryBody:
      "하락 자체보다 '더 큰 손실이 올 것 같다'는 상상이 판단을 먼저 끌고 가는 모습이 보였어요. 매수 근거가 바뀐 건지, 숫자를 보는 불안이 커진 건지 한 번 더 나눠볼 필요가 있어요.",
    reflectionNote: "결정을 서두르기보다, 처음 세웠던 기준이 아직 유효한지 다시 보는 단계예요.",
    stat: {
      primaryLabel: "잠시 관망",
      primaryValue: 75,
      secondaryLabel: "그래도 진행",
      secondaryValue: 25,
      helperText: "비슷한 상황의 투자자 75%가 관망을 선택했어요.",
    },
    reasonsTitle: "비슷한 상황의 한 줄 이유",
    reasons: [
      "손절하고 나서 다음 날 반등한 적이 있어서, 원칙부터 다시 확인했어요.",
      "불안이 클수록 차트보다 처음 세운 근거를 먼저 다시 읽어봤어요.",
      "지금 당장 누르기보다 반나절만 두고 보기로 했어요.",
    ],
    stateNote: "지금 보고 있는 요약은 이미 정리됐어요. 마지막 선택만 남았어요.",
    footerTitle: "이제 마지막 선택만 남았어요",
    footerDescription: "지금은 행동을 고르기보다, 방금 정리한 기준을 따라 한 번만 더 선택합니다.",
    primaryActionLabel: "잠시 관망하겠습니다",
    secondaryActionLabel: "그래도 진행하겠습니다",
    decisionResponses: {
      pause: {
        title: "기록해뒀어요",
        description: "다음 결정이 더 쉬워질 거예요. 오늘 선택은 멘탈 캘린더에 남았어요.",
        actionLabel: "선택 다시 보기",
      },
      proceed: {
        title: "알겠어요. 오늘의 선택은 기록해뒀어요",
        description: "매매 후 마음에 걸리면, 다음엔 사후 복기로 다시 돌아와도 괜찮아요.",
        actionLabel: "선택 다시 보기",
      },
    },
  },
  post: {
    id: "post",
    mode: "post",
    badgeLabel: "매매 돌아보기 결과",
    title: "이번 기록을 다음번 판단에 남겨둘게요",
    description: "이미 지나간 매매를 감정과 판단으로 나눠 보고, 다음 매매의 기준으로 저장합니다.",
    distortionTag: "⚡ 지금 아니면 안 된다는 생각",
    summaryTitle: "이번 기록에서 보인 점",
    summaryBody:
      "급등 흐름을 놓치고 싶지 않은 조급함이 근거보다 먼저 앞섰던 것으로 보여요. 이번 기록은 다음번 비슷한 순간에 '이전에도 같은 패턴이 있었다'는 힌트로 다시 쓰이게 됩니다.",
    reflectionNote: "기록은 잘못을 따지는 단계가 아니라, 다음 선택을 더 쉽게 만들 단서를 남기는 단계예요.",
    stat: {
      primaryLabel: "사후 후회 경험",
      primaryValue: 89,
      secondaryLabel: "비슷한 패턴 재발",
      secondaryValue: 11,
      helperText: "비슷한 상황에서 사후 후회를 느꼈다고 답한 비율이 89%였어요.",
    },
    reasonsTitle: "비슷한 상황의 한 줄 메모",
    reasons: [
      "급등장에서 산 건 거의 다 비슷한 이유였고, 기록해두니 패턴이 보였어요.",
      "근거보다 놓치기 싫은 마음이 앞섰던 날들이 반복됐다는 걸 나중에 알았어요.",
      "메모를 남겨두니까 다음엔 최소 30분은 기다리게 됐어요.",
    ],
    stateNote: "이번 복기는 이미 저장됐어요.",
    footerTitle: "이제 내 기록으로 이어서 볼 수 있어요",
    footerDescription: "이번 복기는 멘탈 캘린더에 남아 있고, 다음번 비슷한 상황에서 다시 떠올릴 수 있게 됩니다.",
    primaryActionLabel: "멘탈 캘린더 보러 가기",
    postActionResponse: {
      title: "내 기록으로 이어질게요",
      description: "프로토타입에서는 여기서 멘탈 캘린더 화면으로 연결되는 흐름만 보여줍니다.",
      actionLabel: "결과 다시 보기",
    },
  },
};
