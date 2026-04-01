import type { ComponentType } from "react";
import { BlankCanvasScreen } from "@/pages/screens/blank-canvas-screen";
import { StarterScreen } from "@/pages/screens/starter-screen";

export type ScreenStatus = "draft" | "wip" | "ready";

export type ScreenDefinition = {
  id: string;
  title: string;
  description: string;
  status: ScreenStatus;
  component: ComponentType;
};

export const screenRegistry: ScreenDefinition[] = [
  {
    id: "blank-canvas",
    title: "빈 캔버스",
    description: "lo-fi 레이아웃을 mid-fi 화면으로 바꾸기 위한 기본 베이스 화면입니다.",
    status: "draft",
    component: BlankCanvasScreen,
  },
  {
    id: "starter-screen",
    title: "스타터 화면",
    description: "초기 스타터 페이지를 참고용으로 남겨둔 화면입니다.",
    status: "ready",
    component: StarterScreen,
  },
];
