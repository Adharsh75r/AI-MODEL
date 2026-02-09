import { useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QueryInputProps {
  onSubmit: (query: string) => void;
  isLoading?: boolean;
  className?: string;
}

export function QueryInput({ onSubmit, isLoading = false, className }: QueryInputProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSubmit(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative", className)}>
      <div className="gradient-border rounded-2xl">
        <div className="relative flex items-center gap-3 rounded-2xl bg-card p-2">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a governed AI question..."
            className="input-glow flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
            disabled={isLoading}
          />
          
          <Button
            type="submit"
            disabled={!query.trim() || isLoading}
            className={cn(
              "gradient-animated h-12 rounded-xl px-6 font-semibold text-primary-foreground transition-all",
              "hover:scale-105 hover:shadow-lg hover:shadow-primary/25",
              "disabled:opacity-50 disabled:hover:scale-100"
            )}
          >
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span className="ml-2">Submit</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
