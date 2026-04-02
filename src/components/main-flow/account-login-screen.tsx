import { ArrowLeft, LockKeyhole, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AccountLoginScreen({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <div className="absolute inset-0 z-30 flex flex-col bg-white text-stone-950">
      <header className="flex items-center gap-3 border-b border-stone-200 px-5 pb-4 pt-5">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onBack}
          className="h-10 w-10 rounded-full border-stone-200 bg-white text-stone-700 hover:bg-white"
          aria-label="뒤로 가기"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <p className="text-sm font-medium text-stone-500">계정</p>
          <h2 className="text-lg font-semibold tracking-tight text-stone-950">로그인</h2>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto bg-stone-50 px-5 py-5">
        <div className="space-y-5 rounded-[28px] border border-stone-200 bg-white p-5">
          <div className="space-y-4">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-stone-700">이메일</span>
              <div className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3">
                <Mail className="h-4 w-4 text-stone-400" />
                <Input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full border-0 bg-transparent p-0 text-sm text-stone-900 shadow-none outline-none ring-0 placeholder:text-stone-400 focus-visible:ring-0"
                />
              </div>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-stone-700">비밀번호</span>
              <div className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3">
                <LockKeyhole className="h-4 w-4 text-stone-400" />
                <Input
                  type="password"
                  placeholder="비밀번호를 입력해 주세요"
                  className="w-full border-0 bg-transparent p-0 text-sm text-stone-900 shadow-none outline-none ring-0 placeholder:text-stone-400 focus-visible:ring-0"
                />
              </div>
            </label>
          </div>

          <div className="space-y-3 pt-2">
            <Button className="h-12 w-full rounded-2xl bg-stone-900 text-white hover:bg-stone-900/95">
              로그인
            </Button>
            <p className="text-center text-sm text-stone-500">
              처음이신가요?{" "}
              <button type="button" className="font-medium text-stone-900 underline underline-offset-2">
                회원가입
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
