import { Link } from "@tanstack/react-router";
import { Radar } from "lucide-react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 size-96 rounded-full gradient-aurora opacity-20 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 size-80 rounded-full bg-[var(--neon-blue)] opacity-15 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <Link to="/" className="flex items-center justify-center gap-2.5 mb-8">
          <div className="size-10 rounded-xl gradient-aurora glow-sm flex items-center justify-center">
            <Radar className="size-5 text-white" />
          </div>
          <div className="font-bold">OpportunityRadar <span className="text-muted-foreground font-normal">AI</span></div>
        </Link>
        <div className="glass-strong rounded-3xl p-7 shadow-elevated">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {subtitle && <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>}
          <div className="mt-6">{children}</div>
        </div>
        {footer && <div className="mt-5 text-center text-sm text-muted-foreground">{footer}</div>}
      </motion.div>
    </div>
  );
}

export function AuthInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-[var(--neon-purple)] focus:ring-2 focus:ring-[var(--neon-purple)]/30 transition"
    />
  );
}

export function AuthButton({
  children,
  loading,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className="w-full px-4 py-2.5 rounded-xl gradient-primary text-sm font-medium text-white glow-sm hover:opacity-95 disabled:opacity-50 transition"
    >
      {loading ? "Please wait…" : children}
    </button>
  );
}

export function SocialButton({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full px-4 py-2.5 rounded-xl glass border border-white/10 text-sm font-medium hover:bg-white/8 transition flex items-center justify-center gap-2"
    >
      {children}
    </button>
  );
}
