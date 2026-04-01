import { PrototypeScreenTemplate } from "@/components/prototype-screen-template";

export function ChatScreen() {
  return (
    <PrototypeScreenTemplate
      code="화면 3"
      title="AI 채팅"
      summary="CBT 기반 질문 흐름을 진행하는 화면입니다. 사전 모드와 사후 복기를 내부 분기로 처리합니다."
      mode="사전 / 사후 분기"
      sections={[
        {
          title: "상단 태그",
          description: "현재 인지 왜곡을 짧은 태그로 표시합니다.",
        },
        {
          title: "질문 흐름",
          description: "공감, 질문, 메타인지 유도 질문을 순서대로 보여줍니다.",
        },
        {
          title: "응답 입력",
          description: "질문 타입에 따라 필수 입력과 건너뛰기 가능 여부를 나눕니다.",
        },
      ]}
      notes={[
        "해커톤 우선순위 3",
        "대화 수는 최소 흐름만 구현",
        "사전/사후를 별도 페이지로 쪼개지 않음",
      ]}
    />
  );
}
