import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/shared/AppShell";
import { GlassCard } from "@/components/shared/KpiCard";
import { connectors, hunterFeed, opportunities } from "@/lib/mock";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Radar, Zap } from "lucide-react";

export const Route = createFileRoute("/hunter-bot")({
  component: HunterBot,
});

function HunterBot() {
  const [feed, setFeed] = useState<string[]>([]);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setFeed((f) => [hunterFeed[i % hunterFeed.length], ...f].slice(0, 12));
      i++;
    }, 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <AppShell title="Auto Opportunity Hunter">
      <GlassCard className="mb-5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="size-10 rounded-xl gradient-aurora flex items-center justify-center animate-pulse-glow">
              <Radar className="size-5 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-semibold">LIVE</span>
              <span className="text-xs text-muted-foreground">· Scanning {connectors.filter(c => c.connected).length} portals</span>
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">Hunter Bot is autonomously discovering matches for you</div>
          </div>
        </div>
      </GlassCard>

      <div className="grid lg:grid-cols-[1fr_380px] gap-4">
        <div className="space-y-4">
          <GlassCard hover={false}>
            <div className="text-sm font-semibold mb-3">Newly discovered</div>
            <div className="space-y-2">
              {opportunities.slice(0, 4).map((o) => (
                <motion.div
                  key={o.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/3"
                >
                  <Zap className="size-4 text-[var(--neon-cyan)]" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm truncate">{o.role} · <span className="text-muted-foreground">{o.company}</span></div>
                  </div>
                  <div className="text-sm font-bold gradient-text">{o.matchScore}%</div>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          <div className="grid sm:grid-cols-2 gap-3">
            {connectors.map((c) => (
              <GlassCard key={c.id}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm">{c.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {c.connected ? (
                        <span className="text-emerald-400">● Connected</span>
                      ) : (
                        <span className="text-muted-foreground">○ Disconnected</span>
                      )}
                    </div>
                  </div>
                  <button className="text-xs px-2.5 py-1 rounded-lg glass hover:bg-white/8">Sync</button>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        <GlassCard hover={false}>
          <div className="text-sm font-semibold mb-2">Live feed</div>
          <div className="rounded-xl bg-black/40 border border-white/5 p-3 font-mono text-xs space-y-1.5 h-[500px] overflow-hidden">
            {feed.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1 - i * 0.06, y: 0 }}
                className="text-[var(--neon-cyan)]"
              >
                <span className="text-muted-foreground">[{new Date().toLocaleTimeString()}]</span> {line}
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </AppShell>
  );
}
