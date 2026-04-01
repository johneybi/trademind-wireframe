import { useState } from "react";
import { CheckCircle2, Eye, FolderKanban, LayoutTemplate, PieChart, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { screenRegistry, type ScreenStatus } from "@/pages/screen-registry";

const statusLabel: Record<ScreenStatus, string> = {
  todo: "미착수",
  wip: "작업 중",
  ready: "완료",
};

const statusClassName: Record<ScreenStatus, string> = {
  todo: "border-slate-200 bg-slate-100 text-slate-700",
  wip: "border-amber-200 bg-amber-50 text-amber-700",
  ready: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

export function HomePage() {
  const [selectedId, setSelectedId] = useState(screenRegistry[0]?.id ?? "");
  const activeScreen = screenRegistry.find((screen) => screen.id === selectedId) ?? screenRegistry[0];

  if (!activeScreen) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
        <div className="rounded-3xl border bg-card p-8 text-center shadow-xs">
          <p className="text-lg font-semibold">등록된 화면이 없습니다.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            <code>src/pages/screen-registry.tsx</code>에 화면을 등록하세요.
          </p>
        </div>
      </main>
    );
  }

  const ActiveScreen = activeScreen.component;

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)] text-slate-950">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col gap-6 p-4 lg:p-6">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="rounded-[28px] border border-slate-200 bg-white/85 p-6 shadow-[0_30px_80px_-42px_rgba(15,23,42,0.45)] backdrop-blur-sm"
        >
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-700">
                <FolderKanban className="h-4 w-4" />
                개발 인덱스
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">화면 인덱스</h1>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                  파일 위치: <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">src/pages/screens</code>
                  <br />
                  등록 위치: <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">src/pages/screen-registry.tsx</code>
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-sm text-slate-500">등록 화면</p>
                <p className="mt-2 text-2xl font-semibold">{screenRegistry.length}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-sm text-slate-500">차트</p>
                <p className="mt-2 text-2xl font-semibold">Recharts</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-sm text-slate-500">선택 화면</p>
                <p className="mt-2 text-2xl font-semibold">{activeScreen.title}</p>
              </div>
            </div>
          </div>
        </motion.header>

        <div className="grid min-h-0 flex-1 gap-6 xl:grid-cols-[340px_1fr]">
          <motion.aside
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
            className="space-y-6 rounded-[28px] border border-slate-200 bg-white/85 p-5 shadow-[0_30px_80px_-42px_rgba(15,23,42,0.45)] backdrop-blur-sm"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">화면 목록</h2>
                <div className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-500">
                  {screenRegistry.length}개
                </div>
              </div>

              <div className="space-y-3">
                {screenRegistry.map((screen) => (
                  <button
                    key={screen.id}
                    type="button"
                    onClick={() => setSelectedId(screen.id)}
                    className={cn(
                      "w-full rounded-2xl border p-4 text-left transition-colors",
                      selectedId === screen.id
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-200 bg-slate-50 hover:bg-slate-100",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium">{screen.title}</p>
                        <p
                          className={cn(
                            "mt-2 text-sm",
                            selectedId === screen.id ? "text-slate-300" : "text-slate-500",
                          )}
                        >
                          {screen.description}
                        </p>
                      </div>

                      <div
                        className={cn(
                          "inline-flex shrink-0 items-center whitespace-nowrap rounded-full border px-2.5 py-1 text-xs leading-none",
                          selectedId === screen.id
                            ? "border-white/20 bg-white/10 text-white"
                            : statusClassName[screen.status],
                        )}
                      >
                        {statusLabel[screen.status]}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-white p-3 shadow-xs">
                  <Plus className="h-5 w-5 text-slate-700" />
                </div>
                <div>
                  <p className="font-medium">등록 방법</p>
                  <p className="text-sm text-slate-500">수동 등록</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <p>1. `src/pages/screens`에 파일 추가</p>
                <p>2. 컴포넌트 export</p>
                <p>3. `screenRegistry` 등록</p>
              </div>
            </div>

            <div className="space-y-3 rounded-3xl border border-blue-200 bg-blue-50 p-4 text-blue-900">
              <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-white p-3 shadow-xs">
                  <PieChart className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <p className="font-medium">차트</p>
                  <p className="text-sm text-blue-700/80">Recharts 사용</p>
                </div>
              </div>
              <Button variant="outline" className="w-full border-blue-200 bg-white text-blue-700 hover:bg-blue-100">
                Recharts 설치됨
              </Button>
            </div>
          </motion.aside>

          <motion.section
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
            className="min-h-0 rounded-[28px] border border-slate-200 bg-white/85 p-4 shadow-[0_30px_80px_-42px_rgba(15,23,42,0.45)] backdrop-blur-sm lg:p-5"
          >
            <div className="flex flex-col gap-4 border-b border-slate-200 pb-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600">
                  <Eye className="h-4 w-4" />
                  미리보기
                </div>
                <h2 className="mt-3 text-2xl font-semibold">{activeScreen.title}</h2>
                <p className="mt-1 text-sm text-slate-500">{activeScreen.description}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-600">
                  <LayoutTemplate className="h-4 w-4" />
                  전체 화면
                </div>
                <div
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-sm leading-none",
                    statusClassName[activeScreen.status],
                  )}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {statusLabel[activeScreen.status]}
                </div>
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-[24px] border border-slate-200 bg-slate-100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScreen.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="h-[844px] overflow-auto"
                >
                  <ActiveScreen />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
