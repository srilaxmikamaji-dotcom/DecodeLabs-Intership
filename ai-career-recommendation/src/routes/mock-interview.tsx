import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/shared/AppShell";
import { GlassCard } from "@/components/shared/KpiCard";
import { ScoreRing } from "@/components/shared/ScoreRing";
import { interviewQuestions } from "@/lib/mock";
import { useState, useEffect } from "react";
import { Send, Clock } from "lucide-react";

export const Route = createFileRoute("/mock-interview")({
  component: MockInterview,
});

function MockInterview() {
  const [role, setRole] = useState("SDE Intern");
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [time, setTime] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    const id = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [done]);

  function submit() {
    if (!input.trim()) return;
    setAnswers((a) => [...a, input]);
    setInput("");
    if (qIdx + 1 >= interviewQuestions.length) setDone(true);
    else setQIdx(qIdx + 1);
  }

  if (done) {
    return (
      <AppShell title="Interview Report">
        <div className="grid sm:grid-cols-3 gap-4">
          <GlassCard className="flex flex-col items-center text-center">
            <ScoreRing value={78} size={140} label="Overall" />
          </GlassCard>
          <GlassCard className="flex flex-col items-center text-center">
            <ScoreRing value={84} size={140} label="Communication" />
          </GlassCard>
          <GlassCard className="flex flex-col items-center text-center">
            <ScoreRing value={71} size={140} label="Confidence" />
          </GlassCard>
        </div>
        <GlassCard className="mt-5">
          <div className="font-semibold mb-2">Weak areas</div>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li>→ Be more specific with quantitative impact in stories</li>
            <li>→ Practice system design depth (load, sharding, caching)</li>
            <li>→ Work on STAR framework for behavioral answers</li>
          </ul>
        </GlassCard>
      </AppShell>
    );
  }

  return (
    <AppShell title="Mock Interview">
      <div className="flex items-center justify-between mb-4">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="px-3 py-2 rounded-lg glass text-sm bg-transparent"
        >
          <option>SDE Intern</option>
          <option>ML Engineer</option>
          <option>Frontend Engineer</option>
          <option>Product Manager</option>
        </select>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="size-4" />
          {Math.floor(time / 60).toString().padStart(2, "0")}:{(time % 60).toString().padStart(2, "0")}
        </div>
      </div>

      <GlassCard>
        <div className="text-xs text-[var(--neon-purple)] uppercase tracking-wider">Question {qIdx + 1} of {interviewQuestions.length}</div>
        <div className="mt-2 text-lg font-semibold leading-snug">{interviewQuestions[qIdx]}</div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your answer..."
          className="mt-4 w-full h-40 bg-white/3 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--neon-purple)]/30 resize-none"
        />
        <div className="mt-3 flex justify-end">
          <button
            onClick={submit}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-sm font-medium text-white glow-sm"
          >
            Submit answer <Send className="size-4" />
          </button>
        </div>
      </GlassCard>

      <div className="mt-3 text-xs text-muted-foreground text-center">{answers.length} answered</div>
    </AppShell>
  );
}
