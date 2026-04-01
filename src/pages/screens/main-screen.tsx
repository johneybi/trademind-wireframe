import { PrototypeScreenTemplate } from "@/components/prototype-screen-template";

export function MainScreen() {
  return (
    <PrototypeScreenTemplate
      code="화면 1"
      title="메인"
      summary="서비스 진입 화면. 시장 감정 요약, 주요 CTA, 익명 감정 공유 미리보기를 포함합니다."
      primaryAction="살까 / 팔까"
      sections={[
        {
          title: "오늘의 시장 감정",
          description: "오늘의 시장 감정 요약과 주요 인지 왜곡 분포를 상단에 배치합니다.",
        },
        {
          title: "핵심 진입 CTA",
          description: "살까, 팔까 진입 버튼을 가장 강하게 노출합니다.",
        },
        {
          title: "감정 공유 미리보기",
          description: "익명 사연 1~2개와 현재 분위기를 짧게 보여줍니다.",
        },
      ]}
      notes={[
        "해커톤 우선순위 1",
        "서비스 첫인상과 핵심 진입 동선 정리",
        "하단 진입: 멘탈 캘린더 / 감정 공유 보드",
      ]}
    />
  );
}
