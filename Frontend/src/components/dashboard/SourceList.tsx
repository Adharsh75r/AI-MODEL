import { GlassCard } from "./GlassCard";
import { FileText, Shield, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface Source {
  id: string;
  name: string;
  section: string;
  trustLevel: "verified" | "trusted" | "unknown";
}

interface SourceListProps {
  sources: Source[];
  className?: string;
}

const trustConfig = {
  verified: {
    label: "Verified",
    className: "bg-success/20 text-success",
    icon: Shield,
  },
  trusted: {
    label: "Trusted",
    className: "bg-accent/20 text-accent",
    icon: Shield,
  },
  unknown: {
    label: "Unknown",
    className: "bg-muted text-muted-foreground",
    icon: Shield,
  },
};

export function SourceList({ sources, className }: SourceListProps) {
  return (
    <GlassCard className={cn("", className)}>
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
        <FileText className="h-5 w-5 text-primary" />
        Evidence Sources
      </h3>
      
      <div className="space-y-3">
        {sources.map((source, idx) => {

           const s = typeof source === "string" ? {
            id: `source-${idx}`,
            name: source.split(/[/\\]/).pop() || source,
            section: "",
            trustLevel: "unknown"
          } : source;

          const trust = trustConfig[source.trustLevel] || trustConfig.unknown;;
          const TrustIcon = trust.icon;

          
          return (
            <div
              key={source.id}
              className="group flex items-center justify-between rounded-xl border border-border/50 bg-secondary/30 p-3 transition-all hover:border-primary/30 hover:bg-secondary/50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{source.name}</p>
                  <p className="text-xs text-muted-foreground">{source.section}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={cn(
                  "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
                  trust.className
                )}>
                </span>
                <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
