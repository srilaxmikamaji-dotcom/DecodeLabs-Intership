import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { AuthShell, AuthButton } from "@/components/shared/AuthShell";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/verify-otp")({
  component: VerifyOtpPage,
});

function VerifyOtpPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  function handleChange(i: number, v: string) {
    if (!/^\d?$/.test(v)) return;
    const next = [...otp];
    next[i] = v;
    setOtp(next);
    if (v && i < 5) refs.current[i + 1]?.focus();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (otp.some((c) => !c)) return toast.error("Enter all 6 digits");
    toast.success("Verified! Redirecting…");
    setTimeout(() => navigate({ to: "/onboarding" }), 600);
  }

  return (
    <AuthShell
      title="Verify your email"
      subtitle="Enter the 6-digit code we sent you"
      footer={
        <Link to="/auth/login" className="text-[var(--neon-purple)] hover:underline">
          Back to sign in
        </Link>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-between gap-2">
          {otp.map((v, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              value={v}
              onChange={(e) => handleChange(i, e.target.value)}
              maxLength={1}
              className="size-12 text-center text-lg font-bold rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-[var(--neon-purple)] focus:ring-2 focus:ring-[var(--neon-purple)]/30"
            />
          ))}
        </div>
        <AuthButton type="submit">Verify & continue</AuthButton>
        <div className="text-center text-xs text-muted-foreground">
          Didn't get it?{" "}
          <button type="button" className="text-[var(--neon-purple)] hover:underline">
            Resend
          </button>
        </div>
      </form>
    </AuthShell>
  );
}
