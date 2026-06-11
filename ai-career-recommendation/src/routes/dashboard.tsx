import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/shared/AppShell";
import { KpiCard, GlassCard } from "@/components/shared/KpiCard";
import { ScoreRing } from "@/components/shared/ScoreRing";
import { Sparkles, Target, Calendar, TrendingUp, Bell, ArrowRight, Zap } from "lucide-react";
import { opportunities, trendingRoles, profileRadar, notifications } from "@/lib/mock";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar as RRadar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { trendSeries } from "@/lib/mock";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <AppShell title="Dashboard">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard icon={Sparkles} label="Opportunities" value={247} delta="+18 this wk" accent="purple" />
        <KpiCard icon={Target} label="High Match" value={38} delta="+6" accent="blue" />
        <KpiCard icon={Calendar} label="Deadlines / wk" value={6} accent="pink" />
        <KpiCard icon={TrendingUp} label="Success Rate" value={78} suffix="%" delta="+4%" accent="cyan" />
        <KpiCard icon={Zap} label="Profile Score" value={84} suffix="/100" accent="purple" />
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-4">
        <GlassCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold">Recommended for you</div>
              <div className="text-xs text-muted-foreground">Top matches based on your profile</div>
            </div>
            <Link to="/opportunities" className="text-xs text-[var(--neon-purple)] inline-flex items-center gap-1">
              View all <ArrowRight className="size-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {opportunities.slice(0, 4).map((o) => (
              <div key={o.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/3 hover:bg-white/5 transition">
                <div className="size-11 rounded-xl gradient-primary flex items-center justify-center text-sm font-bold text-white shrink-0">
                  {o.company[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium truncate">{o.role}</div>
                  <div className="text-xs text-muted-foreground truncate">{o.company} · {o.platform}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-lg font-bold gradient-text">{o.matchScore}%</div>
                  <div className="text-[10px] text-muted-foreground">match</div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-sm font-semibold">Profile Strength</div>
          <div className="text-xs text-muted-foreground mb-2">Across key skill axes</div>
          <div className="h-56">
            <ResponsiveContainer>
              <RadarChart data={profileRadar}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <PolarRadiusAxis tick={false} stroke="rgba(255,255,255,0.05)" />
                <RRadar dataKey="score" stroke="#a855f7" fill="#a855f7" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-4">
        <GlassCard className="lg:col-span-2">
          <div className="text-sm font-semibold mb-1">Demand Trends</div>
          <div className="text-xs text-muted-foreground mb-3">Role demand growth across the year</div>
          <div className="h-56">
            <ResponsiveContainer>
              <AreaChart data={trendSeries}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                <Area type="monotone" dataKey="AI" stroke="#a855f7" fill="url(#g1)" strokeWidth={2} />
                <Area type="monotone" dataKey="React" stroke="#3b82f6" fill="url(#g2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-sm font-semibold mb-2 flex items-center gap-2">
            <Bell className="size-4 text-[var(--neon-pink)]" /> Live Alerts
          </div>
          <div className="space-y-2">
            {notifications.slice(0, 5).map((n) => (
              <div key={n.id} className="p-2.5 rounded-lg bg-white/3 text-xs">
                <div className="font-medium">{n.title}</div>
                <div className="text-muted-foreground text-[10px] mt-0.5">{n.time}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {trendingRoles.slice(0, 4).map((r) => (
          <GlassCard key={r.name}>
            <div className="text-xs text-muted-foreground">Trending role</div>
            <div className="font-semibold mt-1">{r.name}</div>
            <div className="mt-3 flex items-end justify-between">
              <ScoreRing value={Math.min(95, 50 + r.change)} size={70} />
              <div className="text-emerald-400 text-sm font-semibold">+{r.change}%</div>
            </div>
          </GlassCard>
        ))}
      </div>
    </AppShell>
  );
}
