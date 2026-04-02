export function DistortionBanner({ text }: { text: string }) {
  return (
    <div className="shrink-0 border-b border-stone-100 bg-white px-5 py-3">
      <div className="rounded-xl bg-stone-100 px-4 py-3 text-center">
        <p className="text-sm font-medium text-stone-800">{text}</p>
      </div>
    </div>
  );
}
