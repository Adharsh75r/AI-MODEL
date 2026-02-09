import { GlassCard } from "./GlassCard";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: number;
  maxValue?: number;
  suffix?: string;
  icon?: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger";
  showProgress?: boolean;
  className?: string;
}

const variantColors = {
  default: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};

export function MetricCard({
  title,
  value,
  maxValue = 100,
  suffix = "%",
  icon,
  variant = "default",
  showProgress = true,
  className,
}: MetricCardProps) {
  const percentage = (value / maxValue) * 100;

  return (
    <GlassCard className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        {icon && <span className="text-muted-foreground">{icon}</span>}
      </div>
      
      <div className="flex items-baseline gap-2">
        <span className={cn("text-3xl font-bold", variantColors[variant])}>
          {value}
        </span>
        <span className="text-sm text-muted-foreground">{suffix}</span>
      </div>

      {showProgress && (
        <div className="relative">
          <Progress 
            value={percentage} 
            className="h-2 bg-secondary"
          />
          <div 
            className={cn(
              "absolute inset-0 h-2 rounded-full opacity-50 blur-sm",
              variant === "default" && "bg-primary",
              variant === "success" && "bg-success",
              variant === "warning" && "bg-warning",
              variant === "danger" && "bg-danger"
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </GlassCard>
  );
}
