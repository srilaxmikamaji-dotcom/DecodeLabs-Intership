import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell, AuthInput, AuthButton } from "@/components/shared/AuthShell";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/forgot-password")({
  component: ForgotPage,
});

function ForgotPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/auth/login",
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    setSent(true);
  }

  return (
    <AuthShell
      title="Forgot password?"
      subtitle="We'll send you a reset link"
      footer={
        <Link to="/auth/login" className="text-[var(--neon-purple)] hover:underline">
          Back to sign in
        </Link>
      }
    >
      {sent ? (
        <div className="text-sm text-muted-foreground">
          ✓ Reset link sent to <span className="text-foreground">{email}</span>. Check your inbox.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <AuthInput type="email" placeholder="you@college.edu" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <AuthButton loading={loading} type="submit">Send reset link</AuthButton>
        </form>
      )}
    </AuthShell>
  );
}
