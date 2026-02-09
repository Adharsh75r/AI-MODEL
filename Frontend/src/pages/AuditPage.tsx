import { AuditCard, AuditRow, GlassCard, MetricCard } from "@/components/dashboard";
import { mockAuditLog } from "@/data/mockData";
import { Progress } from "@/components/ui/progress";
import { 
  Cpu, 
  FileText, 
  Activity, 
  Link2, 
  Hash,
  Thermometer,
  Calendar,
  Brain,
  Scale,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AuditPage() {
  const { modelInfo, sources, evaluationScores, auditChain } = mockAuditLog;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const getScoreVariant = (score: number) => {
    if (score <= 15) return "success";
    if (score <= 30) return "warning";
    return "danger";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Audit & Explainability</h1>
        <p className="mt-2 text-muted-foreground">
          Complete audit trail and transparency for AI decisions
        </p>
      </div>

      {/* Model Information */}
      <AuditCard 
        title="Model Information" 
        icon={<Cpu className="h-5 w-5 text-primary" />}
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-secondary/30 p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Brain className="h-4 w-4" />
              <span className="text-sm">Model</span>
            </div>
            <p className="mt-2 font-semibold">{modelInfo.name}</p>
            <p className="text-xs text-muted-foreground">{modelInfo.version}</p>
          </div>
          <div className="rounded-xl bg-secondary/30 p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Thermometer className="h-4 w-4" />
              <span className="text-sm">Temperature</span>
            </div>
            <p className="mt-2 font-semibold">{modelInfo.temperature}</p>
            <p className="text-xs text-muted-foreground">Conservative setting</p>
          </div>
          <div className="rounded-xl bg-secondary/30 p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Timestamp</span>
            </div>
            <p className="mt-2 text-sm font-semibold">{formatDate(modelInfo.timestamp)}</p>
          </div>
        </div>
      </AuditCard>

      {/* Sources Used */}
      <AuditCard 
        title="Sources Used" 
        icon={<FileText className="h-5 w-5 text-primary" />}
      >
        <div className="space-y-3">
          {sources.map((source, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-xl border border-border/50 bg-secondary/20 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <span className="font-medium">{source.name}</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-1.5">
                <Hash className="h-3 w-3 text-muted-foreground" />
                <span className="font-mono text-xs text-muted-foreground">
                  {source.hash.slice(0, 10)}...{source.hash.slice(-8)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </AuditCard>

      {/* Evaluation Scores */}
      <AuditCard 
        title="Evaluation Scores" 
        icon={<Activity className="h-5 w-5 text-primary" />}
      >
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Hallucination</span>
              </div>
              <span className={cn(
                "font-semibold",
                getScoreVariant(evaluationScores.hallucination) === "success" && "text-success",
                getScoreVariant(evaluationScores.hallucination) === "warning" && "text-warning",
                getScoreVariant(evaluationScores.hallucination) === "danger" && "text-danger"
              )}>
                {evaluationScores.hallucination}%
              </span>
            </div>
            <Progress 
              value={evaluationScores.hallucination} 
              className="h-2 bg-secondary"
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Scale className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Bias</span>
              </div>
              <span className={cn(
                "font-semibold",
                getScoreVariant(evaluationScores.bias) === "success" && "text-success",
                getScoreVariant(evaluationScores.bias) === "warning" && "text-warning",
                getScoreVariant(evaluationScores.bias) === "danger" && "text-danger"
              )}>
                {evaluationScores.bias}%
              </span>
            </div>
            <Progress 
              value={evaluationScores.bias} 
              className="h-2 bg-secondary"
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Toxicity</span>
              </div>
              <span className={cn(
                "font-semibold",
                getScoreVariant(evaluationScores.toxicity) === "success" && "text-success",
                getScoreVariant(evaluationScores.toxicity) === "warning" && "text-warning",
                getScoreVariant(evaluationScores.toxicity) === "danger" && "text-danger"
              )}>
                {evaluationScores.toxicity}%
              </span>
            </div>
            <Progress 
              value={evaluationScores.toxicity} 
              className="h-2 bg-secondary"
            />
          </div>
        </div>
      </AuditCard>

      {/* Audit Chain */}
      <AuditCard 
        title="Audit Chain" 
        icon={<Link2 className="h-5 w-5 text-primary" />}
      >
        <div className="relative">
          {/* Chain visualization */}
          <div className="flex items-center gap-4">
            {/* Previous Hash */}
            <div className="flex-1 rounded-xl border border-border/50 bg-secondary/20 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Hash className="h-4 w-4" />
                Previous Hash
              </div>
              <p className="break-all font-mono text-xs text-foreground/80">
                {auditChain.previousHash}
              </p>
            </div>

            {/* Chain Link */}
            <div className="flex flex-col items-center gap-1">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Link2 className="h-4 w-4 text-primary" />
              </div>
              <div className="h-px w-12 bg-gradient-to-r from-primary/50 to-accent/50" />
            </div>

            {/* Current Hash */}
            <div className="flex-1 rounded-xl border border-primary/30 bg-primary/5 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm text-primary">
                <Hash className="h-4 w-4" />
                Current Hash
              </div>
              <p className="break-all font-mono text-xs text-foreground">
                {auditChain.currentHash}
              </p>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="mt-4 flex items-center justify-center">
            <div className="flex items-center gap-2 rounded-full bg-success/10 px-4 py-2 text-success">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">Chain Verified</span>
            </div>
          </div>
        </div>
      </AuditCard>
    </div>
  );
}
