import { useState } from "react";
import axios from "axios";
import { NameSearch } from "@/components/NameSearch";
import { UniquenessScore } from "@/components/UniquenessScore";
import { CultureCard } from "@/components/CultureCard";
import { CountryList } from "@/components/CountryList";
import { GenderDistribution } from "@/components/GenderDistribution";
import { useToast } from "@/hooks/use-toast";
import heroGlobe from "@/assets/hero-globe.jpg";

// Mock data - will be replaced with real API later
const mockData: Record<string, any> = {
  aria: {
    uniquenessScore: 72,
    cultures: [
      { region: "Persian", meaning: "Noble, honorable one", popularity: "high" as const },
      { region: "Italian", meaning: "Air, melody", popularity: "high" as const },
      { region: "Hebrew", meaning: "Lioness", popularity: "medium" as const },
      { region: "Albanian", meaning: "Golden", popularity: "low" as const },
    ],
    countries: [
      { name: "United States", percentage: 35, flag: "🇺🇸" },
      { name: "United Kingdom", percentage: 22, flag: "🇬🇧" },
      { name: "Italy", percentage: 18, flag: "🇮🇹" },
      { name: "Australia", percentage: 15, flag: "🇦🇺" },
      { name: "Canada", percentage: 10, flag: "🇨🇦" },
    ],
    gender: { male: 5, female: 90, neutral: 5 },
  },
  kwame: {
    uniquenessScore: 88,
    cultures: [
      { region: "Akan (Ghana)", meaning: "Born on Saturday", popularity: "high" as const },
      { region: "West African", meaning: "One born on Saturday", popularity: "high" as const },
    ],
    countries: [
      { name: "Ghana", percentage: 65, flag: "🇬🇭" },
      { name: "United States", percentage: 15, flag: "🇺🇸" },
      { name: "United Kingdom", percentage: 10, flag: "🇬🇧" },
      { name: "Nigeria", percentage: 7, flag: "🇳🇬" },
      { name: "Canada", percentage: 3, flag: "🇨🇦" },
    ],
    gender: { male: 95, female: 5, neutral: 0 },
  },
  sofia: {
    uniquenessScore: 45,
    cultures: [
      { region: "Greek", meaning: "Wisdom", popularity: "high" as const },
      { region: "Spanish", meaning: "Wise one", popularity: "high" as const },
      { region: "Italian", meaning: "Wisdom", popularity: "high" as const },
      { region: "Russian", meaning: "Wisdom", popularity: "medium" as const },
    ],
    countries: [
      { name: "Spain", percentage: 28, flag: "🇪🇸" },
      { name: "Italy", percentage: 25, flag: "🇮🇹" },
      { name: "United States", percentage: 20, flag: "🇺🇸" },
      { name: "Argentina", percentage: 15, flag: "🇦🇷" },
      { name: "Mexico", percentage: 12, flag: "🇲🇽" },
    ],
    gender: { male: 2, female: 98, neutral: 0 },
  },
};

const Index = () => {
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedName, setSearchedName] = useState("");
  const { toast } = useToast();

  const handleSearch = async (name: string) => {
    setIsLoading(true);
    setSearchedName(name);
    
    try {
      // Send webhook request
      const websiteUrl = window.location.href;
      await axios.post(
        "https://vinmkn8n3.app.n8n.cloud/webhook-test/Website_name_for_name_meaning",
        { website: websiteUrl, name: name }
      );

      // Simulate API call for now (this will be replaced with actual AI response)
      setTimeout(() => {
        const result = mockData[name.toLowerCase()] || {
          uniquenessScore: Math.floor(Math.random() * 40) + 30,
          cultures: [
            { region: "Various", meaning: "Meanings vary by region", popularity: "medium" as const },
          ],
          countries: [
            { name: "Global", percentage: 100, flag: "🌍" },
          ],
          gender: { male: 50, female: 50, neutral: 0 },
        };
        setSearchResult(result);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error sending webhook:", error);
      toast({
        title: "Error",
        description: "Failed to process your request. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroGlobe})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background/50 to-background" />
        
        <div className="relative container mx-auto px-4 pt-20 pb-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground">
                Discover Your Name's
                <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Unique Story
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                Explore the origin, meaning, and global uniqueness of any name
              </p>
            </div>
            
            <div className="pt-8">
              <NameSearch onSearch={handleSearch} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {searchResult && (
        <section className="container mx-auto px-4 pb-20">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Name Title */}
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold capitalize text-foreground">
                {searchedName}
              </h2>
            </div>

            {/* Uniqueness Score */}
            <UniquenessScore score={searchResult.uniquenessScore} />

            {/* Cultural Origins */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">Cultural Origins & Meanings</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {searchResult.cultures.map((culture: any, index: number) => (
                  <CultureCard
                    key={index}
                    region={culture.region}
                    meaning={culture.meaning}
                    popularity={culture.popularity}
                  />
                ))}
              </div>
            </div>

            {/* Statistics Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              <CountryList countries={searchResult.countries} />
              <GenderDistribution
                male={searchResult.gender.male}
                female={searchResult.gender.female}
                neutral={searchResult.gender.neutral}
              />
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {!searchResult && !isLoading && (
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h3 className="text-2xl font-semibold text-muted-foreground">
              Start exploring by entering a name above
            </h3>
            <p className="text-muted-foreground">
              Try popular names like Aria, Kwame, or Sofia to see detailed insights
            </p>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;
