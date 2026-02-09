import { useState } from "react";
import { GlassCard, RiskBadge } from "@/components/dashboard";
import { mockReviewQueue } from "@/data/mockData";
import { 
  Check, 
  X, 
  Eye, 
  Clock, 
  Users,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ReviewPage() {
  const [reviews, setReviews] = useState(mockReviewQueue);

  const handleApprove = (id: string) => {
    setReviews(reviews.filter(r => r.id !== id));
  };

  const handleReject = (id: string) => {
    setReviews(reviews.filter(r => r.id !== id));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Human Review Queue</h1>
          <p className="mt-2 text-muted-foreground">
            AI decisions requiring human oversight and approval
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-warning/10 px-4 py-2 text-warning">
          <AlertCircle className="h-5 w-5" />
          <span className="font-medium">{reviews.length} Pending</span>
        </div>
      </div>

      {/* Review Cards */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <GlassCard key={review.id} className="fade-in">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Query Info */}
              <div className="flex-1 space-y-2">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{review.query}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      <RiskBadge level={review.riskLevel} />
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">{review.confidence}%</span>
                        confidence
                      </span>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {formatDate(review.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Details
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleReject(review.id)}
                  className="text-danger hover:bg-danger/10 hover:text-danger"
                >
                  <X className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleApprove(review.id)}
                  className="bg-success text-success-foreground hover:bg-success/90"
                >
                  <Check className="mr-2 h-4 w-4" />
                  Approve
                </Button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Empty State */}
      {reviews.length === 0 && (
        <GlassCard className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-success/10">
            <Check className="h-8 w-8 text-success" />
          </div>
          <h3 className="text-lg font-semibold">All caught up!</h3>
          <p className="mt-2 max-w-md text-muted-foreground">
            There are no pending reviews at this time. New items requiring human oversight will appear here.
          </p>
        </GlassCard>
      )}
    </div>
  );
}
