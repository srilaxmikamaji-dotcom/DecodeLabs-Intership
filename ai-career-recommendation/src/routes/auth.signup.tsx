import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell, AuthInput, AuthButton, SocialButton } from "@/components/shared/AuthShell";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/signup")({
  component: SignupPage,
});

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin + "/onboarding" },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Account created — let's set up your profile");
    navigate({ to: "/onboarding" });
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join 12,000+ students finding the right opportunities"
      footer={
        <>
          Already a member?{" "}
          <Link to="/auth/login" className="text-[var(--neon-purple)] hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <AuthInput type="email" placeholder="you@college.edu" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <AuthInput type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
        <AuthButton loading={loading} type="submit">Create account</AuthButton>
      </form>
      <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
        <div className="flex-1 h-px bg-white/10" />
        OR
        <div className="flex-1 h-px bg-white/10" />
      </div>
      <div className="space-y-2">
        <SocialButton onClick={() => toast.info("Demo: social signup is mocked")}>Sign up with Google</SocialButton>
        <SocialButton onClick={() => toast.info("Demo: social signup is mocked")}>Sign up with LinkedIn</SocialButton>
        <SocialButton onClick={() => toast.info("Demo: social signup is mocked")}>Sign up with GitHub</SocialButton>
      </div>
    </AuthShell>
  );
}
