import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthInput, AuthButton } from "@/components/shared/AuthShell";
import { Radar, Sparkles, ArrowRight, ArrowLeft, Check, FileText, X } from "lucide-react";
import confetti from "canvas-confetti";

export const Route = createFileRoute("/onboarding")({
  component: Onboarding,
});

const STEPS = ["Personal", "Career", "Social", "AI Analysis"] as const;

function Onboarding() {
  const [step, setStep] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const navigate = useNavigate();

  const next = () => {
    if (step === 2) {
      setStep(3);
      setAnalyzing(true);
      setTimeout(() => {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#7c5cff", "#5cb8ff", "#ff6ec7"],
        });
        setTimeout(() => navigate({ to: "/dashboard" }), 1200);
      }, 3200);
      return;
    }
    setStep((s) => Math.min(s + 1, 3));
  };

  return (
    <div className="min-h-screen px-4 py-10 relative overflow-hidden">
      <div className="absolute top-0 left-1/3 size-96 rounded-full gradient-aurora opacity-20 blur-3xl" />
      <div className="relative max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="size-9 rounded-xl gradient-aurora glow-sm flex items-center justify-center">
            <Radar className="size-5 text-white" />
          </div>
          <div className="font-bold">OpportunityRadar AI</div>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div
                className={`flex items-center gap-2 ${i <= step ? "text-foreground" : "text-muted-foreground"}`}
              >
                <div
                  className={`size-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                    i < step
                      ? "gradient-primary text-white"
                      : i === step
                      ? "border-2 border-[var(--neon-purple)] text-[var(--neon-purple)]"
                      : "bg-white/5 border border-white/10"
                  }`}
                >
                  {i < step ? <Check className="size-4" /> : i + 1}
                </div>
                <span className="hidden sm:inline text-xs">{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px mx-2 ${i < step ? "bg-[var(--neon-purple)]" : "bg-white/10"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="glass-strong rounded-3xl p-7 shadow-elevated">
          <AnimatePresence mode="wait">
            {step === 0 && <StepPersonal key="p" />}
            {step === 1 && <StepCareer key="c" />}
            {step === 2 && <StepSocial key="s" />}
            {step === 3 && <StepAnalyze key="a" analyzing={analyzing} />}
          </AnimatePresence>

          {step < 3 && (
            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30"
              >
                <ArrowLeft className="size-4" /> Back
              </button>
              <button
                onClick={next}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl gradient-primary text-sm font-medium text-white glow-sm"
              >
                {step === 2 ? "Analyze me" : "Continue"} <ArrowRight className="size-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StepWrap({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
      <div className="mt-5 space-y-3">{children}</div>
    </motion.div>
  );
}

function StepPersonal() {
  return (
    <StepWrap title="Tell us about you" subtitle="The basics — used to match you with eligible programs">
      <AuthInput placeholder="Full name" />
      <AuthInput placeholder="College name" />
      <div className="grid grid-cols-2 gap-3">
        <AuthInput placeholder="Branch (e.g., CSE)" />
        <AuthInput placeholder="Graduation year" />
      </div>
      <AuthInput placeholder="CGPA (e.g., 8.4)" />
    </StepWrap>
  );
}

function StepCareer() {
  return (
    <StepWrap title="Career profile" subtitle="What you want — and what you bring">
      <AuthInput placeholder="Skills (React, Python, ML…)" />
      <AuthInput placeholder="Preferred roles" />
      <div className="grid grid-cols-2 gap-3">
        <AuthInput placeholder="Domain interests" />
        <AuthInput placeholder="Target companies" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <AuthInput placeholder="Preferred location" />
        <AuthInput placeholder="Expected package" />
      </div>
      <AuthInput placeholder="Career goals (1 line)" />
    </StepWrap>
  );
}

function StepSocial() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const onPick = () => inputRef.current?.click();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) setFile(f);
  };

  return (
    <StepWrap title="Plug in your work" subtitle="Helps the AI understand your real strengths">
      <AuthInput placeholder="GitHub URL" />
      <AuthInput placeholder="LinkedIn URL" />
      <AuthInput placeholder="Portfolio URL" />

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
        onChange={onChange}
      />

      {!file ? (
        <button
          type="button"
          onClick={onPick}
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          className="w-full rounded-xl border border-dashed border-white/15 p-6 text-center text-sm text-muted-foreground hover:border-[var(--neon-purple)]/50 hover:bg-white/5 transition cursor-pointer"
        >
          <Sparkles className="size-5 mx-auto mb-2 text-[var(--neon-purple)]" />
          Drop your resume here or click to upload (PDF/DOCX)
        </button>
      ) : (
        <div className="rounded-xl border border-[var(--neon-purple)]/40 bg-white/5 p-4 flex items-center gap-3">
          <div className="size-10 rounded-lg gradient-aurora flex items-center justify-center shrink-0">
            <FileText className="size-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium truncate">{file.name}</div>
            <div className="text-xs text-muted-foreground">
              {(file.size / 1024).toFixed(1)} KB · Ready to upload
            </div>
          </div>
          <button
            type="button"
            onClick={onPick}
            className="text-xs px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-muted-foreground"
          >
            Replace
          </button>
          <button
            type="button"
            onClick={() => {
              setFile(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="size-7 rounded-md hover:bg-white/10 flex items-center justify-center text-muted-foreground"
            aria-label="Remove file"
          >
            <X className="size-4" />
          </button>
        </div>
      )}
    </StepWrap>
  );
}

function StepAnalyze({ analyzing }: { analyzing: boolean }) {
  const stages = [
    "Parsing your profile…",
    "Indexing 50,000+ live opportunities…",
    "Computing match probabilities…",
    "Generating your dashboard…",
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-10"
    >
      <div className="relative inline-flex">
        <div className="size-24 rounded-full gradient-aurora animate-pulse-glow" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="size-10 text-white" />
        </div>
      </div>
      <h2 className="mt-6 text-2xl font-bold gradient-text">AI is analyzing your profile</h2>
      <p className="text-sm text-muted-foreground mt-2">This usually takes a few seconds</p>
      {analyzing && (
        <div className="mt-6 space-y-2 max-w-sm mx-auto text-left">
          {stages.map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.7 }}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <div className="size-1.5 rounded-full bg-[var(--neon-purple)] animate-pulse" />
              {s}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
