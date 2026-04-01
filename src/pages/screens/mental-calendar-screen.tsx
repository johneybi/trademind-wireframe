import { PrototypeScreenTemplate } from "@/components/prototype-screen-template";

export function MentalCalendarScreen() {
  return (
    <PrototypeScreenTemplate
      code="화면 5"
      title="멘탈 캘린더"
      summary="감정 기록과 인지 왜곡 패턴을 시각적으로 확인하는 개인 기록 화면입니다."
      sections={[
        {
          title: "캘린더 히트맵",
          description: "날짜별 개입 결과와 기록 상태를 색이나 점으로 표현합니다.",
        },
        {
          title: "왜곡 빈도 차트",
          description: "가장 자주 나타나는 인지 왜곡 유형을 차트로 표시합니다.",
        },
        {
          title: "최근 기록 리스트",
          description: "날짜, 유형, 결과를 최근 순으로 정리합니다.",
        },
      ]}
      notes={[
        "해커톤 우선순위 6",
        "차트는 Recharts 사용 예정",
        "개인 패턴 확인용 화면",
      ]}
    />
  );
}
