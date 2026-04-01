import { PrototypeScreenTemplate } from "@/components/prototype-screen-template";

export function EmotionBoardScreen() {
  return (
    <PrototypeScreenTemplate
      code="화면 6"
      title="감정 공유 보드"
      summary="오늘의 시장 감정 분포와 익명 사연을 모아 보여주는 TOGETHER 화면입니다."
      sections={[
        {
          title: "감정 분포",
          description: "오늘의 주요 감정과 인지 왜곡 비중을 차트로 표시합니다.",
        },
        {
          title: "익명 사연 피드",
          description: "짧은 이유 카드 중심으로 스크롤 피드를 구성합니다.",
        },
        {
          title: "필터",
          description: "인지 왜곡 유형, 사전/사후 모드 기준으로 필터링합니다.",
        },
      ]}
      notes={[
        "해커톤 우선순위 7",
        "MVP에서는 더미 데이터로도 충분",
        "메인 화면 미리보기 소스가 되는 화면",
      ]}
    />
  );
}
