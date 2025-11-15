import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface GenderDistributionProps {
  male: number;
  female: number;
  neutral: number;
}

export const GenderDistribution = ({ male, female, neutral }: GenderDistributionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gender Distribution</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium">Female</span>
            <span className="text-sm font-semibold text-muted-foreground">{female}%</span>
          </div>
          <Progress value={female} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium">Male</span>
            <span className="text-sm font-semibold text-muted-foreground">{male}%</span>
          </div>
          <Progress value={male} className="h-2" />
        </div>

        {neutral > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Gender Neutral</span>
              <span className="text-sm font-semibold text-muted-foreground">{neutral}%</span>
            </div>
            <Progress value={neutral} className="h-2" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
