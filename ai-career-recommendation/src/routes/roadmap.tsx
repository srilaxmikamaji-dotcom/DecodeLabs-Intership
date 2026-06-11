import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/shared/AppShell";
import { GlassCard } from "@/components/shared/KpiCard";
import { roadmap } from "@/lib/mock";
import { Check } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/roadmap")({
  component: Roadmap,
});

function Roadmap() {
  const [done, setDone] = useState<Set<string>>(new Set());
  const total = roadmap.reduce((s, w) => s + w.tasks.length, 0);
  const completed = done.size;
  const pct = Math.round((completed / total) * 100);

  return (
    <AppShell title="Your 4-Week Roadmap">
      <GlassCard className="mb-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-muted-foreground">Overall progress</div>
            <div className="text-3xl font-bold gradient-text">{pct}%</div>
          </div>
          <div className="text-sm text-muted-foreground">{completed}/{total} tasks</div>
        </div>
        <div className="mt-3 h-2 rounded-full bg-white/5 overflow-hidden">
          <div className="h-full gradient-primary transition-all" style={{ width: `${pct}%` }} />
        </div>
      </GlassCard>

      <div className="relative pl-6">
        <div className="absolute left-2 top-2 bottom-2 w-px bg-white/10" />
        {roadmap.map((w) => (
          <div key={w.week} className="relative mb-6">
            <div className="absolute -left-[26px] top-2 size-4 rounded-full gradient-primary glow-sm" />
            <GlassCard hover={false}>
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-[var(--neon-purple)] uppercase tracking-wider">Week {w.week}</div>
              </div>
              <div className="font-semibold">{w.title}</div>
              <ul className="mt-3 space-y-2">
                {w.tasks.map((t) => {
                  const id = `${w.week}-${t}`;
                  const isDone = done.has(id);
                  return (
                    <li key={id}>
                      <button
                        onClick={() => {
                          const s = new Set(done);
                          if (isDone) s.delete(id);
                          else s.add(id);
                          setDone(s);
                        }}
                        className="w-full text-left flex items-center gap-3 p-2 rounded-lg hover:bg-white/5"
                      >
                        <span
                          className={`size-5 rounded-md flex items-center justify-center transition ${
                            isDone ? "gradient-primary" : "border border-white/20"
                          }`}
                        >
                          {isDone && <Check className="size-3 text-white" />}
                        </span>
                        <span className={`text-sm ${isDone ? "line-through text-muted-foreground" : ""}`}>{t}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </GlassCard>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
