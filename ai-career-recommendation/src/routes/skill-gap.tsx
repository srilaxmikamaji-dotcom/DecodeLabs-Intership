import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/shared/AppShell";
import { GlassCard } from "@/components/shared/KpiCard";
import { motion } from "framer-motion";
import { useState } from "react";

export const Route = createFileRoute("/skill-gap")({
  component: SkillGap,
});

const SKILLS = [
  { name: "Docker", lift: 8 },
  { name: "AWS", lift: 16 },
  { name: "DSA Advanced", lift: 23 },
  { name: "System Design", lift: 12 },
  { name: "Kubernetes", lift: 9 },
];

function SkillGap() {
  const [picked, setPicked] = useState<string[]>([]);
  const base = 63;
  const projected = Math.min(99, base + picked.reduce((sum, n) => sum + (SKILLS.find((s) => s.name === n)?.lift ?? 0), 0));

  return (
    <AppShell title="Skill Gap Simulator">
      <GlassCard>
        <div className="text-sm text-muted-foreground">Current match score</div>
        <div className="text-4xl font-bold mt-1">{base}%</div>
        <div className="mt-3 h-3 rounded-full bg-white/5 overflow-hidden">
          <div className="h-full gradient-primary" style={{ width: `${base}%` }} />
        </div>
      </GlassCard>

      <GlassCard className="mt-4">
        <div className="font-semibold">Add skills to simulate</div>
        <div className="text-xs text-muted-foreground mb-3">Pick what you'd realistically learn next</div>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map((s) => {
            const active = picked.includes(s.name);
            return (
              <button
                key={s.name}
                onClick={() =>
                  setPicked((p) => (active ? p.filter((x) => x !== s.name) : [...p, s.name]))
                }
                className={`px-3 py-2 rounded-xl text-sm transition ${
                  active ? "gradient-primary text-white glow-sm" : "glass hover:bg-white/8"
                }`}
              >
                {s.name} <span className="opacity-70 text-xs">+{s.lift}%</span>
              </button>
            );
          })}
        </div>
      </GlassCard>

      <GlassCard className="mt-4">
        <div className="text-sm text-muted-foreground">Projected match score</div>
        <div className="text-5xl font-bold mt-1 gradient-text">{projected}%</div>
        <div className="mt-3 h-3 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full gradient-aurora"
            animate={{ width: `${projected}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
        <div className="mt-2 text-xs text-emerald-400">+{projected - base}% lift from {picked.length} skill{picked.length === 1 ? "" : "s"}</div>
      </GlassCard>
    </AppShell>
  );
}
