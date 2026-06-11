import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/shared/AppShell";
import { GlassCard } from "@/components/shared/KpiCard";
import { ScoreRing } from "@/components/shared/ScoreRing";
import { opportunities } from "@/lib/mock";
import { useState, useMemo } from "react";
import { Bookmark, BookmarkCheck, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/opportunities")({
  component: OpportunitiesPage,
});

const FILTERS = ["all", "internship", "hackathon", "scholarship", "research", "job"] as const;
const SORTS = ["match", "deadline", "probability"] as const;

function daysLeft(iso: string) {
  return Math.max(0, Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000));
}

function OpportunitiesPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");
  const [sort, setSort] = useState<(typeof SORTS)[number]>("match");
  const [saved, setSaved] = useState<Set<string>>(new Set());

  const list = useMemo(() => {
    let l = opportunities.filter((o) => filter === "all" || o.type === filter);
    if (sort === "match") l = [...l].sort((a, b) => b.matchScore - a.matchScore);
    if (sort === "deadline") l = [...l].sort((a, b) => +new Date(a.deadline) - +new Date(b.deadline));
    if (sort === "probability") l = [...l].sort((a, b) => b.selectionProbability - a.selectionProbability);
    return l;
  }, [filter, sort]);

  return (
    <AppShell title="Opportunities">
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs capitalize transition ${
                filter === f ? "gradient-primary text-white glow-sm" : "glass hover:bg-white/8"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Sort:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as (typeof SORTS)[number])}
            className="px-3 py-1.5 rounded-lg glass text-xs bg-transparent"
          >
            <option value="match">Best match</option>
            <option value="deadline">Nearest deadline</option>
            <option value="probability">Highest probability</option>
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {list.map((o, i) => (
          <motion.div
            key={o.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <GlassCard>
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-xl gradient-aurora flex items-center justify-center text-white font-bold shrink-0">
                  {o.company[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{o.role}</div>
                      <div className="text-xs text-muted-foreground truncate">{o.company} · {o.platform}</div>
                    </div>
                    <button
                      onClick={() => {
                        const s = new Set(saved);
                        if (s.has(o.id)) s.delete(o.id);
                        else s.add(o.id);
                        setSaved(s);
                      }}
                      className="p-1.5 rounded-lg hover:bg-white/5"
                    >
                      {saved.has(o.id) ? (
                        <BookmarkCheck className="size-4 text-[var(--neon-purple)]" />
                      ) : (
                        <Bookmark className="size-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><MapPin className="size-3" />{o.location}</span>
                    <span className="inline-flex items-center gap-1"><Clock className="size-3" />{daysLeft(o.deadline)}d left</span>
                    {o.urgency === "high" && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-[var(--neon-pink)]/20 text-[var(--neon-pink)]">URGENT</span>
                    )}
                  </div>
                </div>
                <ScoreRing value={o.matchScore} size={70} />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <Stat label="Selection" value={o.selectionProbability} />
                <Stat label="Interview" value={o.interviewProbability} />
                <Stat label="Offer" value={o.offerProbability} />
              </div>

              <div className="mt-4 text-xs text-muted-foreground">
                <span className="text-foreground/80">Why: </span>{o.whyRecommended}
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {o.requiredSkills.map((s) => (
                  <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                    {s}
                  </span>
                ))}
                {o.missingSkills.map((s) => (
                  <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--neon-pink)]/15 text-[var(--neon-pink)] border border-[var(--neon-pink)]/30">
                    × {s}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <button className="flex-1 px-4 py-2 rounded-xl gradient-primary text-sm font-medium text-white glow-sm">
                  Apply now
                </button>
                <button className="px-4 py-2 rounded-xl glass text-sm hover:bg-white/8">Save</button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg bg-white/3 p-2">
      <div className="text-[10px] text-muted-foreground uppercase">{label}</div>
      <div className="text-sm font-bold">{value}%</div>
    </div>
  );
}
