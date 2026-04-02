export function InsightsHeader() {
  return (
    <header className="space-y-2 border-b border-stone-200 bg-white px-5 pb-4 pt-5">
      <div className="inline-flex items-center rounded-full border border-stone-200 bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
        내 기록
      </div>
      <h1 className="text-[28px] font-semibold tracking-tight text-stone-950">멘탈 캘린더</h1>
      <p className="font-serif text-sm leading-6 text-stone-500">
        지금까지의 선택과 반복되는 패턴을 한 화면에서 봅니다.
      </p>
    </header>
  );
}
