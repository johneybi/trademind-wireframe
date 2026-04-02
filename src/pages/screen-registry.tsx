import type { ComponentType } from "react";
import { ChatScreen, type ChatPreviewStateId } from "@/pages/screens/chat-screen";
import { EmotionBoardScreen } from "@/pages/screens/emotion-board-screen";
import { InputScreen } from "@/pages/screens/input-screen";
import { MainScreen } from "@/pages/screens/main-screen";
import { MentalCalendarScreen } from "@/pages/screens/mental-calendar-screen";
import { PostReviewResultScreen } from "@/pages/screens/post-review-result-screen";
import { PreDecisionResultScreen } from "@/pages/screens/pre-decision-result-screen";

export type ScreenStatus = "todo" | "wip" | "ready";
export type ScreenPreviewState = {
  id: string;
  label: string;
  description?: string;
};

export type ScreenDefinition = {
  id: string;
  title: string;
  description: string;
  status: ScreenStatus;
  component: ComponentType<any>;
  previewStates?: ScreenPreviewState[];
  getComponentProps?: (previewStateId?: string) => Record<string, unknown>;
};

export const screenRegistry: ScreenDefinition[] = [
  {
    id: "main",
    title: "메인",
    description: "시장 감정 요약과 핵심 진입 버튼을 배치하는 시작 화면",
    status: "todo",
    component: MainScreen,
  },
  {
    id: "input",
    title: "입력",
    description: "모드 선택, 종목 입력, 감정 선택을 처리하는 화면",
    status: "wip",
    component: InputScreen,
    previewStates: [
      { id: "entry", label: "0. 진입" },
      { id: "stock", label: "1. 종목" },
      { id: "emotion", label: "2. 감정" },
      { id: "detail", label: "3. 상황" },
      { id: "bridge", label: "4. 브릿지" },
    ],
    getComponentProps: (previewStateId) => ({
      initialPreviewStateId: previewStateId,
    }),
  },
  {
    id: "chat",
    title: "AI 채팅",
    description: "CBT 기반 질문 흐름을 진행하는 대화 화면",
    status: "wip",
    component: ChatScreen,
    previewStates: [
      {
        id: "pre-awaiting",
        label: "1. 사전 - 응답 대기",
        description: "첫 질문 전 단계입니다. 지금 판단을 멈추고 AI가 개입을 시작하는 순간을 봅니다.",
      },
      {
        id: "pre-question",
        label: "2. 사전 - 질문",
        description: "사전 개입의 첫 질문 단계입니다. 지금 판단의 근거를 다시 묻습니다.",
      },
      {
        id: "pre-meta",
        label: "3. 사전 - 핵심 선택",
        description: "사전 개입의 마지막 질문 단계입니다. 계속할지 멈출지 직전의 핵심 선택을 봅니다.",
      },
      {
        id: "post-question",
        label: "4. 사후 - 질문",
        description: "사후 복기의 질문 단계입니다. 이미 한 매매를 감정과 근거로 나눠 돌아봅니다.",
      },
      {
        id: "post-complete",
        label: "5. 사후 - 복기 완료",
        description: "사후 복기의 마무리 단계입니다. 복기 내용을 정리하고 결과 화면으로 이어집니다.",
      },
    ],
    getComponentProps: (previewStateId) => ({
      initialPreviewStateId: previewStateId as ChatPreviewStateId,
    }),
  },
  {
    id: "pre-decision-result",
    title: "결과 - 사전 모드",
    description: "개입 결과와 커뮤니티 데이터를 보여주는 화면",
    status: "todo",
    component: PreDecisionResultScreen,
  },
  {
    id: "post-review-result",
    title: "결과 - 사후 복기",
    description: "복기 결과와 기록 완료 상태를 보여주는 화면",
    status: "todo",
    component: PostReviewResultScreen,
  },
  {
    id: "mental-calendar",
    title: "멘탈 캘린더",
    description: "개인 기록과 패턴을 보는 화면",
    status: "todo",
    component: MentalCalendarScreen,
  },
  {
    id: "emotion-board",
    title: "감정 공유 보드",
    description: "오늘의 분포와 익명 사연을 보여주는 TOGETHER 화면",
    status: "todo",
    component: EmotionBoardScreen,
  },
];
