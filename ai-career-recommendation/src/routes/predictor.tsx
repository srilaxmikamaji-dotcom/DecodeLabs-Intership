import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/shared/AppShell";
import { GlassCard } from "@/components/shared/KpiCard";
import { ScoreRing } from "@/components/shared/ScoreRing";
import { opportunities } from "@/lib/mock";

export const Route = createFileRoute("/predictor")({
  component: Predictor,
});

function Predictor() {
  const o = opportunities[0];
  return (
    <AppShell title="AI Success Predictor">
      <GlassCard>
        <div className="flex items-center gap-4">
          <div className="size-14 rounded-2xl gradient-aurora flex items-center justify-center text-white text-xl font-bold">
            {o.company[0]}
          </div>
          <div>
            <div className="font-semibold">{o.role}</div>
            <div className="text-sm text-muted-foreground">{o.company} · Predicting your odds in real time</div>
          </div>
        </div>
      </GlassCard>

      <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: "Match Score", value: o.matchScore },
          { label: "Selection", value: o.selectionProbability },
          { label: "Interview", value: o.interviewProbability },
          { label: "Offer", value: o.offerProbability },
          { label: "Confidence", value: 81 },
          { label: "Readiness", value: 73 },
        ].map((m) => (
          <GlassCard key={m.label} className="flex flex-col items-center text-center">
            <ScoreRing value={m.value} size={140} />
            <div className="mt-3 text-sm font-medium">{m.label}</div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="mt-5">
        <div className="text-sm font-semibold mb-2">What moves the needle</div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>→ Add a System Design project — could lift match by ~7%</li>
          <li>→ Get 1 referral via your LinkedIn network — interview probability +12%</li>
          <li>→ Solve 30 more DSA problems before deadline — selection +5%</li>
        </ul>
      </GlassCard>
    </AppShell>
  );
}
