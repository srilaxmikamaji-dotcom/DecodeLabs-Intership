import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/shared/AppShell";
import { GlassCard } from "@/components/shared/KpiCard";
import { chatStarters } from "@/lib/mock";
import { useState } from "react";
import { Send, Mic, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/copilot")({
  component: Copilot,
});

type Msg = { role: "user" | "ai"; text: string };

function Copilot() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "ai", text: "Hey 👋 I'm your Career Copilot. Ask me anything about your career path." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  function send(text: string) {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [
        ...m,
        {
          role: "ai",
          text:
            "Based on your profile, I'd prioritize Google STEP (deadline in 6 days) and brush up on System Design. Want me to draft a 7-day plan?",
        },
      ]);
      setTyping(false);
    }, 900);
  }

  return (
    <AppShell title="Career Copilot">
      <div className="grid lg:grid-cols-[1fr_280px] gap-4 h-[calc(100vh-10rem)]">
        <GlassCard className="flex flex-col">
          <div className="flex-1 overflow-y-auto scrollbar-thin space-y-3 pr-2">
            {msgs.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}
              >
                {m.role === "ai" && (
                  <div className="size-8 rounded-full gradient-aurora flex items-center justify-center shrink-0">
                    <Sparkles className="size-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                    m.role === "user"
                      ? "gradient-primary text-white"
                      : "glass"
                  }`}
                >
                  {m.text}
                </div>
              </motion.div>
            ))}
            {typing && (
              <div className="flex gap-3">
                <div className="size-8 rounded-full gradient-aurora flex items-center justify-center">
                  <Sparkles className="size-4 text-white" />
                </div>
                <div className="glass px-4 py-3 rounded-2xl flex gap-1">
                  <span className="size-1.5 rounded-full bg-white/60 animate-bounce" />
                  <span className="size-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: "0.15s" }} />
                  <span className="size-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: "0.3s" }} />
                </div>
              </div>
            )}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="mt-3 flex items-center gap-2 glass rounded-xl p-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 bg-transparent px-2 py-1.5 text-sm focus:outline-none"
            />
            <button type="button" className="p-2 rounded-lg hover:bg-white/5">
              <Mic className="size-4 text-muted-foreground" />
            </button>
            <button type="submit" className="p-2 rounded-lg gradient-primary">
              <Send className="size-4 text-white" />
            </button>
          </form>
        </GlassCard>

        <GlassCard>
          <div className="text-sm font-semibold mb-3">Suggestions</div>
          <div className="space-y-2">
            {chatStarters.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="w-full text-left text-xs p-2.5 rounded-lg bg-white/3 hover:bg-white/8 transition"
              >
                {s}
              </button>
            ))}
          </div>
        </GlassCard>
      </div>
    </AppShell>
  );
}
