import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CultureCardProps {
  region: string;
  meaning: string;
  popularity: "high" | "medium" | "low";
}

export const CultureCard = ({ region, meaning, popularity }: CultureCardProps) => {
  const popularityColors = {
    high: "bg-accent text-accent-foreground",
    medium: "bg-secondary text-secondary-foreground",
    low: "bg-muted text-muted-foreground",
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg font-semibold">{region}</CardTitle>
          <Badge className={popularityColors[popularity]}>
            {popularity === "high" ? "Popular" : popularity === "medium" ? "Moderate" : "Rare"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">{meaning}</p>
      </CardContent>
    </Card>
  );
};
