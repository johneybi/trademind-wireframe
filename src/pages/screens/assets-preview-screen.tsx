import { AiAuraIndicator } from "@/components/ui/ai-aura-indicator";
import { AnxiousCandleChart } from "@/components/ui/anxious-candle-chart";

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

            {/* 피그마 다이렉트 수출용 (투명 배경) */}
            <div className="md:col-span-2 flex flex-col items-center justify-center rounded-3xl border border-dashed border-stone-300 p-12 relative overflow-hidden bg-[url('https://t3.ftcdn.net/jpg/03/89/30/23/360_F_389302381_x760fGfIOrTofVl5Cg1OepY8vEqV8zIf.jpg')] bg-repeat bg-[size:12px_12px]">
               <div className="absolute inset-0 bg-white/70" />
               <div className="z-10 flex flex-col items-center">
                 <h3 className="mb-8 text-sm font-medium text-stone-600 bg-white/80 px-4 py-1 rounded-full">Figma Export (Checkered)</h3>
                 <div className="p-16">
                   <AiAuraIndicator variant="light" size={2} />
                 </div>
               </div>
            </div>

            {/* 피그마 다이렉트 수출용 (클린 화이트 배경) */}
            <div className="md:col-span-2 flex flex-col items-center justify-center rounded-3xl border border-dashed border-stone-300 p-12 relative overflow-hidden bg-white">
               <div className="z-10 flex flex-col items-center">
                 <h3 className="mb-8 text-sm font-medium text-stone-400">Figma Clean Capture (White BG)</h3>
                 
                 {/* 그림자가 퍼지는 것을 고려하여 p-40(160px)의 여유 공간을 확보합니다. */}
                 <div id="figma-export-target" className="p-40 bg-white inline-block">
                   <AiAuraIndicator variant="light" size={3} />
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* Section 2: Anxious Candle Chart */}
        <section className="space-y-6">
          <div className="border-b border-stone-200 pb-2">
            <h2 className="text-lg font-semibold text-stone-800">2. Anxious Candle Chart (Volatility)</h2>
            <p className="mt-1 text-sm text-stone-500">
              시장의 불안정성과 유저의 심리적 요동을 시각화하는 파동형 캔들 차트 애니메이션
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col items-center justify-center rounded-3xl bg-[#0c0a09] p-12 shadow-sm border border-stone-800">
               <h3 className="mb-8 text-sm font-medium text-stone-400">Dark Background (Volatility)</h3>
               <AnxiousCandleChart />
            </div>

            <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-12 shadow-sm border border-stone-200">
               <h3 className="mb-8 text-sm font-medium text-stone-500">Light Background (Volatility)</h3>
               <AnxiousCandleChart variant="dark" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
