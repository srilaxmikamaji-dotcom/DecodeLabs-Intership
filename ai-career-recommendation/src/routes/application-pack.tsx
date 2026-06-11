import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/shared/AppShell";
import { GlassCard } from "@/components/shared/KpiCard";
import { Copy, RefreshCw, Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/application-pack")({
  component: ApplicationPack,
});

const TEMPLATES = ["Cover Letter", "Recruiter Email", "Cold Outreach", "LinkedIn DM", "SOP", "Scholarship Essay"] as const;

const SAMPLE: Record<string, string> = {
  "Cover Letter": `Dear Hiring Team,\n\nI'm applying for the Software Engineer Intern role at Google. As a 3rd-year CSE student with hands-on experience shipping production-grade React/Node apps, I bring both rigor in CS fundamentals and the bias-for-action your team is known for.\n\nTwo highlights I'd love to expand on in conversation:\n\n• Built and deployed a full-stack analytics dashboard with 1.2K MAU\n• Top 3% on LeetCode (500+ problems solved)\n\nI'd be thrilled to contribute. Resume attached.\n\nBest,\n— Your Name`,
  "Recruiter Email": `Hi [Recruiter],\n\nI'm a 3rd-year CS student really excited about the SDE Intern role at Google STEP. I've been building [X, Y, Z] and would love to get a quick sense of fit.\n\nResume attached. Happy to share my GitHub if useful.\n\nThanks!\n— Your Name`,
  "Cold Outreach": `Hi [Name], your work on [project] really resonated with me. I'm a CS student building in the same space — would love 15 min to learn from you.\n\nNo pressure if it's not the right time.`,
  "LinkedIn DM": `Hey [Name], huge fan of your career path. I'm a CS student aiming for similar roles — quick question if you have 30 sec?`,
  "SOP": `My fascination with computer science began the day a single line of Python automated my morning email triage…`,
  "Scholarship Essay": `Education was always non-negotiable in my family — but the path to it never was…`,
};

function ApplicationPack() {
  const [active, setActive] = useState<(typeof TEMPLATES)[number]>("Cover Letter");
  const [text, setText] = useState(SAMPLE["Cover Letter"]);

  return (
    <AppShell title="Application Pack">
      <div className="grid lg:grid-cols-[220px_1fr] gap-4">
        <GlassCard hover={false}>
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Templates</div>
          <div className="space-y-1">
            {TEMPLATES.map((t) => (
              <button
                key={t}
                onClick={() => {
                  setActive(t);
                  setText(SAMPLE[t]);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                  active === t ? "bg-white/8 text-foreground" : "text-muted-foreground hover:bg-white/5"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </GlassCard>

        <GlassCard hover={false}>
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold">{active}</div>
            <div className="flex gap-1">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(text);
                  toast.success("Copied!");
                }}
                className="p-2 rounded-lg hover:bg-white/5"
              >
                <Copy className="size-4" />
              </button>
              <button onClick={() => toast.info("Regenerated (mock)")} className="p-2 rounded-lg hover:bg-white/5">
                <RefreshCw className="size-4" />
              </button>
              <button onClick={() => toast.info("Export coming soon")} className="p-2 rounded-lg hover:bg-white/5">
                <Download className="size-4" />
              </button>
            </div>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-[60vh] bg-white/3 rounded-xl p-4 text-sm font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-[var(--neon-purple)]/30 resize-none"
          />
        </GlassCard>
      </div>
    </AppShell>
  );
}
