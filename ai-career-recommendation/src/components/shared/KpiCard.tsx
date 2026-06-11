import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function KpiCard({
  icon: Icon,
  label,
  value,
  suffix = "",
  delta,
  accent = "purple",
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  suffix?: string;
  delta?: string;
  accent?: "purple" | "blue" | "cyan" | "pink";
}) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString());
  useEffect(() => {
    const controls = animate(mv, value, { duration: 1.2, ease: "easeOut" });
    return controls.stop;
  }, [mv, value]);

  const accentColor = {
    purple: "var(--neon-purple)",
    blue: "var(--neon-blue)",
    cyan: "var(--neon-cyan)",
    pink: "var(--neon-pink)",
  }[accent];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass rounded-2xl p-5 shadow-card relative overflow-hidden group"
    >
      <div
        className="absolute -right-8 -top-8 size-28 rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition"
        style={{ background: accentColor }}
      />
      <div className="flex items-center justify-between relative">
        <div
          className="size-10 rounded-xl flex items-center justify-center"
          style={{ background: `${accentColor.replace(")", " / 0.15)")}`, color: accentColor }}
        >
          <Icon className="size-5" />
        </div>
        {delta && (
          <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
            {delta}
          </span>
        )}
      </div>
      <div className="mt-4">
        <div className="text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
        <div className="mt-1 flex items-baseline gap-1">
          <motion.span className="text-3xl font-bold tracking-tight">{rounded}</motion.span>
          {suffix && <span className="text-lg text-muted-foreground">{suffix}</span>}
        </div>
      </div>
    </motion.div>
  );
}

export function GlassCard({
  children,
  className,
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  const Comp = hover ? motion.div : "div";
  const props = hover ? { whileHover: { y: -2 } } : {};
  return (
    <Comp {...props} className={cn("glass rounded-2xl p-5 shadow-card", className)}>
      {children}
    </Comp>
  );
}
