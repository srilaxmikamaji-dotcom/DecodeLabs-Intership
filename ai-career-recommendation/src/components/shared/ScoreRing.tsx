import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ScoreRing({
  value,
  size = 120,
  label,
  sublabel,
  color = "var(--neon-purple)",
}: {
  value: number;
  size?: number;
  label?: string;
  sublabel?: string;
  color?: string;
}) {
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={`g-${size}-${value}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.72 0.2 245)" />
            <stop offset="50%" stopColor="oklch(0.68 0.24 295)" />
            <stop offset="100%" stopColor="oklch(0.75 0.22 340)" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="oklch(1 0 0 / 0.08)" strokeWidth={stroke} fill="none" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={`url(#g-${size}-${value})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className={cn("font-bold tracking-tight", size > 100 ? "text-2xl" : "text-lg")}>{value}%</div>
        {label && <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{label}</div>}
        {sublabel && <div className="text-[9px] text-muted-foreground">{sublabel}</div>}
      </div>
    </div>
  );
}
