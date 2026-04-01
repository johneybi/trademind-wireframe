import { PrototypeScreenTemplate } from "@/components/prototype-screen-template";

export function PreDecisionResultScreen() {
  return (
    <PrototypeScreenTemplate
      code="화면 4-A"
      title="결과 - 사전 모드"
      summary="매수/매도 직전 개입 결과를 보여주는 화면입니다. 커뮤니티 데이터와 최종 선택 버튼이 핵심입니다."
      mode="사전 모드"
      primaryAction="보류 / 진행"
      sections={[
        {
          title: "상단 진단 태그",
          description: "현재 상태를 짧은 태그로 다시 보여줍니다.",
        },
        {
          title: "커뮤니티 데이터",
          description: "비슷한 상황의 사용자 선택 비율을 강조합니다.",
        },
        {
          title: "익명 사연",
          description: "2~3개의 짧은 이유 카드로 사회적 안전감을 전달합니다.",
        },
      ]}
      notes={[
        "해커톤 우선순위 4",
        "TOGETHER 차별점이 직접 드러나는 화면",
        "최종 버튼은 2개만 유지",
      ]}
    />
  );
}
