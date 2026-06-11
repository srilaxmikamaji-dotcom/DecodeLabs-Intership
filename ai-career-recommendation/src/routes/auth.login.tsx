import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell, AuthInput, AuthButton, SocialButton } from "@/components/shared/AuthShell";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Welcome back!");
    navigate({ to: "/dashboard" });
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue your opportunity hunt"
      footer={
        <>
          New here?{" "}
          <Link to="/auth/signup" className="text-[var(--neon-purple)] hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <AuthInput type="email" placeholder="you@college.edu" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <AuthInput type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <div className="text-right -mt-1">
          <Link to="/auth/forgot-password" className="text-xs text-muted-foreground hover:text-foreground">
            Forgot password?
          </Link>
        </div>
        <AuthButton loading={loading} type="submit">Sign in</AuthButton>
      </form>
      <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
        <div className="flex-1 h-px bg-white/10" />
        OR
        <div className="flex-1 h-px bg-white/10" />
      </div>
      <div className="space-y-2">
        <SocialButton onClick={() => toast.info("Demo: social login is mocked")}>Continue with Google</SocialButton>
        <SocialButton onClick={() => toast.info("Demo: social login is mocked")}>Continue with LinkedIn</SocialButton>
        <SocialButton onClick={() => toast.info("Demo: social login is mocked")}>Continue with GitHub</SocialButton>
      </div>
    </AuthShell>
  );
}
