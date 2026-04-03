import type { ComponentType } from "react";
import { AssetsPreviewScreen } from "@/pages/screens/assets-preview-screen";
import { ChatScreen, type ChatPreviewStateId } from "@/pages/screens/chat-screen";
import { InsightsScreen } from "@/pages/screens/insights-screen";
import { InputScreen } from "@/pages/screens/input-screen";
import { MainScreen, type MainPreviewStateId } from "@/pages/screens/main-screen";
import { ResultScreen, type ResultPreviewStateId } from "@/pages/screens/result-screen";

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
    description: "오늘의 시장 감정과 감정 공유 보드, 대화 진입 CTA를 보여주는 시작 화면",
    status: "wip",
    component: MainScreen,
    previewStates: [
      { id: "home", label: "1. 홈" },
      { id: "account-sheet", label: "2. 계정 시트" },
      { id: "login", label: "3. 로그인" },
    ],
    getComponentProps: (previewStateId) => ({
      initialPreviewStateId: previewStateId as MainPreviewStateId,
    }),
  },
  {
    id: "input",
    title: "입력",
    description: "모드 선택, 종목 입력, 감정 선택을 단계별로 처리하는 화면",
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
        description: "AI가 첫 질문을 준비하는 단계입니다.",
      },
      {
        id: "pre-question",
        label: "2. 사전 - 질문",
        description: "입력한 상황을 바탕으로 첫 질문을 던지는 단계입니다.",
      },
      {
        id: "pre-meta",
        label: "3. 사전 - 핵심 선택",
        description: "최종 선택 전 메타인지 질문을 보여주는 단계입니다.",
      },
      {
        id: "post-question",
        label: "4. 사후 - 질문",
        description: "이미 한 매매를 돌아보는 복기 질문 단계입니다.",
      },
      {
        id: "post-complete",
        label: "5. 사후 - 기록 완료",
        description: "복기가 마무리되고 결과 화면으로 이어지는 단계입니다.",
      },
    ],
    getComponentProps: (previewStateId) => ({
      initialPreviewStateId: previewStateId as ChatPreviewStateId,
    }),
  },
  {
    id: "result",
    title: "결과",
    description: "사전 결과와 사후 결과를 같은 셸 안에서 보여주는 결과 화면",
    status: "wip",
    component: ResultScreen,
    previewStates: [
      {
        id: "pre",
        label: "1. 사전 - 선택 직전",
        description: "지금 멈출지 계속할지 정리하는 결과 단계입니다.",
      },
      {
        id: "post",
        label: "2. 사후 - 기록 완료",
        description: "복기 기록이 정리된 뒤 내 기록으로 이어지는 단계입니다.",
      },
    ],
    getComponentProps: (previewStateId) => ({
      initialPreviewStateId: previewStateId as ResultPreviewStateId,
    }),
  },
  {
    id: "insights",
    title: "내 기록",
    description: "마음이 남았던 날과 그때의 생각을 다시 보는 개인 기록 화면",
    status: "wip",
    component: InsightsScreen,
    previewStates: [],
  },
  {
    id: "assets-preview",
    title: "그래픽 에셋 / 컴포넌트",
    description: "서비스에 사용하는 커스텀 그래픽, 모션 요소, UI 조각 모음",
    status: "ready",
    component: AssetsPreviewScreen,
    previewStates: [],
  },
];
