import { cn } from "@/lib/utils";

type RiskLevel = "low" | "medium" | "high" | "critical";

interface RiskBadgeProps {
  level: RiskLevel;
  className?: string;
}

const riskConfig = {
  low: {
    label: "Low",
    className: "bg-success/20 text-success border-success/30",
  },
  medium: {
    label: "Medium",
    className: "bg-warning/20 text-warning border-warning/30",
  },
  high: {
    label: "High",
    className: "bg-danger/20 text-danger border-danger/30",
  },
  critical: {
    label: "Critical",
    className: "bg-danger/30 text-danger border-danger/50 animate-pulse-glow",
  },
};

export function RiskBadge({ level, className }: RiskBadgeProps) {
  const config = riskConfig[level];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-all",
        config.className,
        className
      )}
    >
      <span className={cn(
        "h-1.5 w-1.5 rounded-full",
        level === "low" && "bg-success",
        level === "medium" && "bg-warning",
        (level === "high" || level === "critical") && "bg-danger"
      )} />
      {config.label}
    </span>
  );
}
