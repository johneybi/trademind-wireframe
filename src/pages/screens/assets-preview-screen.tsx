import { AiAuraIndicator } from "@/components/ui/ai-aura-indicator";

export function AssetsPreviewScreen() {
  return (
    <div className="flex h-full flex-col overflow-y-auto bg-stone-50 p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-stone-900">그래픽 애셋 & 컴포넌트</h1>
        <p className="mt-2 text-sm text-stone-500">
          서비스에 사용되는 각종 커스텀 그래픽, 모션 요소 및 디자인 에셋들을 모아보는 화면입니다.
        </p>
      </div>

      <div className="space-y-12">
        {/* Section 1: AI Aura */}
        <section className="space-y-6">
          <div className="border-b border-stone-200 pb-2">
            <h2 className="text-lg font-semibold text-stone-800">1. AI Aura (Rational Aura)</h2>
            <p className="mt-1 text-sm text-stone-500">
              CBT 챗봇이 생각 중이거나 말할 때 사용되는 메쉬 그라데이션 애니메이션 (Metaball + Blur + Contrast)
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* 기본 스케일 (다크) */}
            <div className="flex flex-col items-center justify-center rounded-3xl bg-[#0c0a09] p-12 shadow-sm border border-stone-800">
               <h3 className="mb-8 text-sm font-medium text-stone-400">Dark 배경 (size=1)</h3>
               <AiAuraIndicator />
            </div>

            {/* 축소 스케일 (다크) */}
            <div className="flex flex-col items-center justify-center rounded-3xl bg-[#0c0a09] p-12 shadow-sm border border-stone-800">
               <h3 className="mb-8 text-sm font-medium text-stone-400">Dark 버블 내부용 (size=0.5)</h3>
               <div className="flex h-16 w-32 items-center justify-center rounded-2xl bg-stone-900 border border-stone-800">
                 <AiAuraIndicator size={0.5} />
               </div>
            </div>

            {/* 기본 스케일 (라이트) */}
            <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-12 shadow-sm border border-stone-200">
               <h3 className="mb-8 text-sm font-medium text-stone-500">Light / White 배경 (size=1)</h3>
               <AiAuraIndicator variant="light" />
            </div>

            {/* 축소 스케일 (라이트) */}
            <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-12 shadow-sm border border-stone-200">
               <h3 className="mb-8 text-sm font-medium text-stone-500">Light 버블 내부용 (size=0.5)</h3>
               <div className="flex h-16 w-32 items-center justify-center rounded-2xl bg-stone-100 border border-stone-200">
                 <AiAuraIndicator variant="light" size={0.5} />
               </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
