import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface UniquenessScoreProps {
  score: number;
  className?: string;
}

export const UniquenessScore = ({ score, className }: UniquenessScoreProps) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const increment = score / 30;
      const interval = setInterval(() => {
        current += increment;
        if (current >= score) {
          setDisplayScore(score);
          clearInterval(interval);
        } else {
          setDisplayScore(Math.floor(current));
        }
      }, 20);
      return () => clearInterval(interval);
    }, 200);
    return () => clearTimeout(timer);
  }, [score]);

  const getScoreColor = () => {
    if (score >= 80) return "text-accent";
    if (score >= 50) return "text-secondary";
    return "text-primary";
  };

  const getScoreLabel = () => {
    if (score >= 80) return "Very Rare";
    if (score >= 60) return "Rare";
    if (score >= 40) return "Uncommon";
    if (score >= 20) return "Common";
    return "Very Common";
  };

  return (
    <div className={cn("text-center p-8 rounded-2xl bg-gradient-to-br from-card to-muted", className)}>
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Uniqueness Score
        </h3>
        <div className={cn("text-7xl font-bold transition-colors duration-300", getScoreColor())}>
          {displayScore}
        </div>
        <div className="text-xl font-semibold text-foreground">
          {getScoreLabel()}
        </div>
      </div>
      <div className="mt-6 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full transition-all duration-1000 ease-out", 
            score >= 80 ? "bg-accent" : score >= 50 ? "bg-secondary" : "bg-primary"
          )}
          style={{ width: `${displayScore}%` }}
        />
      </div>
    </div>
  );
};
