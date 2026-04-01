import { PrototypeScreenTemplate } from "@/components/prototype-screen-template";

export function PostReviewResultScreen() {
  return (
    <PrototypeScreenTemplate
      code="화면 4-B"
      title="결과 - 사후 복기"
      summary="방금 한 매매를 복기하고, 다음 개입을 위한 기록으로 남기는 화면입니다."
      mode="사후 복기"
      primaryAction="멘탈 캘린더로 이동"
      sections={[
        {
          title: "복기 요약",
          description: "이번 결정의 인지 왜곡과 감정 상태를 간단히 요약합니다.",
        },
        {
          title: "커뮤니티 비율",
          description: "비슷한 상황에서 사후 후회를 남긴 비율을 보여줍니다.",
        },
        {
          title: "기록 완료 안내",
          description: "이번 기록이 다음 개입 근거로 쓰인다는 점만 짧게 전달합니다.",
        },
      ]}
      notes={[
        "해커톤 우선순위 5",
        "사전 결과 화면과 구조는 최대한 공유 가능",
        "행동 변화 루프 강조",
      ]}
    />
  );
}
