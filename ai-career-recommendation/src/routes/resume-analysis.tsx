import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/shared/AppShell";
import { GlassCard } from "@/components/shared/KpiCard";
import { ScoreRing } from "@/components/shared/ScoreRing";
import { Upload, FileText } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/resume-analysis")({
  component: ResumeAnalysis,
});

function ResumeAnalysis() {
  const [uploaded, setUploaded] = useState(false);
  return (
    <AppShell title="Resume Analysis">
      {!uploaded ? (
        <GlassCard className="flex flex-col items-center justify-center py-16 text-center cursor-pointer hover:bg-white/5" hover={false}>
          <div onClick={() => setUploaded(true)} className="w-full">
            <div className="size-16 rounded-2xl gradient-aurora glow-sm mx-auto flex items-center justify-center">
              <Upload className="size-7 text-white" />
            </div>
            <div className="mt-4 font-semibold">Drop your resume</div>
            <div className="text-sm text-muted-foreground mt-1">PDF or DOCX · We'll analyze it instantly</div>
            <button className="mt-5 px-5 py-2 rounded-xl gradient-primary text-white text-sm font-medium glow-sm">
              Upload sample
            </button>
          </div>
        </GlassCard>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "ATS Score", value: 82 },
              { label: "Keyword Match", value: 71 },
              { label: "Readability", value: 88 },
              { label: "Role Fit", value: 76 },
            ].map((m) => (
              <GlassCard key={m.label} className="flex flex-col items-center text-center">
                <ScoreRing value={m.value} size={120} />
                <div className="mt-2 text-sm font-medium">{m.label}</div>
              </GlassCard>
            ))}
          </div>

          <div className="mt-5 grid lg:grid-cols-2 gap-4">
            <GlassCard>
              <div className="font-semibold mb-2 flex items-center gap-2">
                <FileText className="size-4 text-[var(--neon-purple)]" /> Missing Keywords
              </div>
              <div className="flex flex-wrap gap-2">
                {["Kubernetes", "GraphQL", "System Design", "A/B testing", "Distributed Systems"].map((k) => (
                  <span key={k} className="text-xs px-2.5 py-1 rounded-full bg-[var(--neon-pink)]/15 text-[var(--neon-pink)] border border-[var(--neon-pink)]/30">
                    {k}
                  </span>
                ))}
              </div>
            </GlassCard>
            <GlassCard>
              <div className="font-semibold mb-2">AI Suggestions</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>→ Quantify impact in your top 3 bullets (e.g., "reduced load by 38%")</li>
                <li>→ Move "Skills" above "Projects" for ATS</li>
                <li>→ Add a 2-line summary tuned for SDE roles</li>
                <li>→ Replace weak verbs ("worked on") with action verbs ("shipped", "led")</li>
              </ul>
            </GlassCard>
          </div>
        </>
      )}
    </AppShell>
  );
}
