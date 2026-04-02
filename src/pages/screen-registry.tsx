import type { ComponentType } from "react";
import { ChatScreen, type ChatPreviewStateId } from "@/pages/screens/chat-screen";
import { InsightsScreen } from "@/pages/screens/insights-screen";
import { InputScreen } from "@/pages/screens/input-screen";
import { MainScreen, type MainPreviewStateId } from "@/pages/screens/main-screen";
import { ResultScreen, type ResultPreviewStateId } from "@/pages/screens/result-screen";
import { AssetsPreviewScreen } from "@/pages/screens/assets-preview-screen";

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
    description: "오늘의 시장 감정과 익명 피드, 핵심 진입 CTA를 보여주는 시작 화면",
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
        description: "첫 질문 전 단계입니다. AI가 첫 질문을 건네기 직전의 순간을 봅니다.",
      },
      {
        id: "pre-question",
        label: "2. 사전 - 질문",
        description: "매매 전 점검의 첫 질문 단계입니다. 지금 판단의 근거를 다시 살펴봅니다.",
      },
      {
        id: "pre-meta",
        label: "3. 사전 - 핵심 선택",
        description: "매매 전 점검의 마지막 질문 단계입니다. 계속할지 멈출지 직전의 핵심 선택을 봅니다.",
      },
      {
        id: "post-question",
        label: "4. 사후 - 질문",
        description: "매매 돌아보기의 질문 단계입니다. 이미 한 매매를 감정과 근거로 나눠 돌아봅니다.",
      },
      {
        id: "post-complete",
        label: "5. 사후 - 기록 완료",
        description: "매매 돌아보기의 마무리 단계입니다. 기록을 정리하고 결과 화면으로 이어집니다.",
      },
    ],
    getComponentProps: (previewStateId) => ({
      initialPreviewStateId: previewStateId as ChatPreviewStateId,
    }),
  },
  {
    id: "result",
    title: "결과",
    description: "매매 전 점검과 매매 돌아보기를 같은 셸 안에서 보여주는 결과 화면",
    status: "wip",
    component: ResultScreen,
    previewStates: [
      {
        id: "pre",
        label: "1. 사전 - 선택 직전",
        description: "지금 판단을 멈출지 계속할지 고르기 직전의 결과 화면입니다.",
      },
      {
        id: "post",
        label: "2. 사후 - 기록 완료",
        description: "기록을 저장하고 다음 매매의 기준으로 남기는 결과 화면입니다.",
      },
    ],
    getComponentProps: (previewStateId) => ({
      initialPreviewStateId: previewStateId as ResultPreviewStateId,
    }),
  },
  {
    id: "insights",
    title: "내 기록",
    description: "이번 달 감정 흐름과 반복되는 인지 왜곡 패턴을 보는 개인 기록 화면",
    status: "wip",
    component: InsightsScreen,
    previewStates: [],
  },
  {
    id: "assets-preview",
    title: "그래픽 애셋 / 컴포넌트",
    description: "서비스에 사용되는 각종 커스텀 그래픽, 모션 요소(AI 오라 등) 및 에셋 모음",
    status: "ready",
    component: AssetsPreviewScreen,
    previewStates: [],
  },
];
