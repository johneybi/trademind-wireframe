import { ArrowUpRight, BarChart3, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

const summaryCards = [
  { label: "Signals tracked", value: "128", detail: "Realtime market events" },
  { label: "Win-rate model", value: "73%", detail: "Strategy confidence trend" },
  { label: "Watchlists", value: "24", detail: "Cross-market monitoring" },
];

const stackItems = [
  "Vite dev/build script configured",
  "Tailwind CSS v3 + PostCSS connected",
  "shadcn aliases, tokens, and Button component added",
  "Recharts installed and ready for donut charts",
];

export function StarterScreen() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.08),_transparent_40%),linear-gradient(180deg,_#ffffff_0%,_#f8fafc_100%)]" />

      <div className="container flex min-h-screen items-center py-16">
        <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-3 py-1 text-sm text-muted-foreground backdrop-blur">
              <Sparkles className="h-4 w-4 text-primary" />
              React + Vite + Tailwind CSS v3 + shadcn/ui + Motion
            </div>

            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
                A lightweight starter structure for fast hackathon prototyping.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                Keep full screens in <code className="rounded bg-muted px-1.5 py-0.5 text-sm">src/pages</code>
                and move only repeated pieces into{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-sm">src/components</code>.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="gap-2">
                Start building
                <ArrowUpRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Add shadcn components
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {summaryCards.map((card, index) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 * index, duration: 0.45 }}
                  className="rounded-2xl border bg-card p-5 shadow-sm"
                >
                  <p className="text-sm text-muted-foreground">{card.label}</p>
                  <p className="mt-3 text-3xl font-semibold">{card.value}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{card.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
            className="relative overflow-hidden rounded-[28px] border bg-card p-6 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.35)]"
          >
            <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,_rgba(37,99,235,0.12),_transparent)]" />
            <div className="relative space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Prototype status</p>
                  <h2 className="mt-2 text-2xl font-semibold">UI workspace is ready</h2>
                </div>
                <div className="rounded-xl border bg-background/80 p-3">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
              </div>

              <div className="space-y-3 rounded-2xl border bg-background/80 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Stack health</span>
                  <span className="font-medium">Configured</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "88%" }}
                    transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Add the next screen first, then extract shared UI only if it repeats.
                </p>
              </div>

              <div className="grid gap-3">
                {stackItems.map((item) => (
                  <div key={item} className="rounded-xl border bg-background/70 px-4 py-3 text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
