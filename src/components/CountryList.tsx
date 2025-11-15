import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Country {
  name: string;
  percentage: number;
  flag: string;
}

interface CountryListProps {
  countries: Country[];
}

export const CountryList = ({ countries }: CountryListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Countries</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {countries.map((country, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{country.flag}</span>
                <span className="font-medium">{country.name}</span>
              </div>
              <span className="text-sm font-semibold text-muted-foreground">
                {country.percentage}%
              </span>
            </div>
            <Progress value={country.percentage} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
