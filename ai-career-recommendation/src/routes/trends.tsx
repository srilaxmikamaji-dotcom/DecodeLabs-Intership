import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/shared/AppShell";
import { GlassCard } from "@/components/shared/KpiCard";
import { trendingRoles, trendSeries } from "@/lib/mock";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/trends")({
  component: Trends,
});

function Trends() {
  return (
    <AppShell title="Trend Radar">
      <div className="grid lg:grid-cols-2 gap-4">
        <GlassCard>
          <div className="text-sm font-semibold">Trending Roles</div>
          <div className="text-xs text-muted-foreground mb-2">Demand growth, last 12 months</div>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={trendSeries}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                <Line type="monotone" dataKey="AI" stroke="#a855f7" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="React" stroke="#3b82f6" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="Data" stroke="#06b6d4" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-sm font-semibold">Skill Demand Growth</div>
          <div className="text-xs text-muted-foreground mb-2">Top 6 in-demand roles</div>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={trendingRoles}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} angle={-15} textAnchor="end" height={50} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                <Bar dataKey="demand" fill="#a855f7" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="lg:col-span-2">
          <div className="text-sm font-semibold">Hackathon & Scholarship Activity</div>
          <div className="h-64 mt-2">
            <ResponsiveContainer>
              <AreaChart data={trendSeries}>
                <defs>
                  <linearGradient id="ga" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                <Area type="monotone" dataKey="Data" stroke="#ec4899" fill="url(#ga)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {trendingRoles.map((r) => (
          <GlassCard key={r.name}>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{r.name}</div>
                <div className="text-xs text-muted-foreground">Demand index {r.demand}</div>
              </div>
              <div className="text-emerald-400 text-sm font-semibold">+{r.change}%</div>
            </div>
          </GlassCard>
        ))}
      </div>
    </AppShell>
  );
}
