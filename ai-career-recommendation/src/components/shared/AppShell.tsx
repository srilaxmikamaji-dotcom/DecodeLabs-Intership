import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Sparkles,
  Target,
  Bot,
  TrendingUp,
  FileText,
  GitCompare,
  Mail,
  Map,
  MessagesSquare,
  Radar,
  Settings,
  LogOut,
  Bell,
  Menu,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/opportunities", icon: Sparkles, label: "Opportunities" },
  { to: "/predictor", icon: Target, label: "AI Predictor" },
  { to: "/copilot", icon: Bot, label: "Career Copilot" },
  { to: "/trends", icon: TrendingUp, label: "Trend Radar" },
  { to: "/resume-analysis", icon: FileText, label: "Resume Analysis" },
  { to: "/skill-gap", icon: GitCompare, label: "Skill Gap" },
  { to: "/application-pack", icon: Mail, label: "Application Pack" },
  { to: "/roadmap", icon: Map, label: "Roadmap" },
  { to: "/mock-interview", icon: MessagesSquare, label: "Mock Interview" },
  { to: "/hunter-bot", icon: Radar, label: "Hunter Bot" },
  { to: "/settings", icon: Settings, label: "Settings" },
] as const;

export function AppShell({ children, title }: { children: ReactNode; title?: string }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar — desktop */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col glass-strong border-r border-white/5 sticky top-0 h-screen">
        <SidebarInner pathname={location.pathname} onSignOut={handleSignOut} />
      </aside>

      {/* Sidebar — mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 w-72 glass-strong z-50 lg:hidden"
            >
              <SidebarInner
                pathname={location.pathname}
                onSignOut={handleSignOut}
                onNavigate={() => setOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-30 glass border-b border-white/5">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/5"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </button>
              {title && <h1 className="text-lg font-semibold tracking-tight">{title}</h1>}
            </div>
            <div className="flex items-center gap-2">
              <button className="relative p-2 rounded-lg hover:bg-white/5" aria-label="Notifications">
                <Bell className="size-5" />
                <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-[var(--neon-pink)] animate-pulse" />
              </button>
              <div className="size-9 rounded-full gradient-aurora glow-sm" />
            </div>
          </div>
        </header>
        <main className="flex-1 px-4 lg:px-8 py-6 lg:py-8">{children}</main>
      </div>
    </div>
  );
}

function SidebarInner({
  pathname,
  onSignOut,
  onNavigate,
}: {
  pathname: string;
  onSignOut: () => void;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5" onClick={onNavigate}>
          <div className="size-9 rounded-xl gradient-aurora glow-sm flex items-center justify-center">
            <Radar className="size-5 text-white" />
          </div>
          <div className="leading-tight">
            <div className="font-bold text-sm">OpportunityRadar</div>
            <div className="text-[10px] text-muted-foreground tracking-wider">AI · BETA</div>
          </div>
        </Link>
        {onNavigate && (
          <button onClick={onNavigate} className="lg:hidden p-1 rounded-md hover:bg-white/5">
            <X className="size-4" />
          </button>
        )}
      </div>
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto scrollbar-thin">
        {NAV.map((item) => {
          const active = pathname === item.to || pathname.startsWith(item.to + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
                active
                  ? "bg-white/8 text-foreground shadow-card"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
              )}
            >
              <Icon className={cn("size-4", active && "text-[var(--neon-purple)]")} />
              <span>{item.label}</span>
              {active && <span className="ml-auto size-1.5 rounded-full bg-[var(--neon-purple)] glow-sm" />}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-white/5">
        <button
          onClick={onSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground transition"
        >
          <LogOut className="size-4" />
          Sign out
        </button>
      </div>
    </div>
  );
}
