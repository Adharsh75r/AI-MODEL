import { GlassCard } from "./GlassCard";
import { cn } from "@/lib/utils";

interface AuditCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function AuditCard({ title, icon, children, className }: AuditCardProps) {
  return (
    <GlassCard className={cn("", className)}>
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
        {icon}
        {title}
      </h3>
      {children}
    </GlassCard>
  );
}

interface AuditRowProps {
  label: string;
  value: string | React.ReactNode;
  mono?: boolean;
}

export function AuditRow({ label, value, mono = false }: AuditRowProps) {
  return (
    <div className="flex items-center justify-between border-b border-border/30 py-3 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={cn(
        "text-sm font-medium",
        mono && "font-mono text-xs"
      )}>
        {value}
      </span>
    </div>
  );
}
