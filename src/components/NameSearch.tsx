import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface NameSearchProps {
  onSearch: (name: string) => void;
  isLoading?: boolean;
}

export const NameSearch = ({ onSearch, isLoading }: NameSearchProps) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSearch(name.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Enter a name (e.g., Aria, Kwame, Sofia)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="pl-12 h-14 text-lg bg-card border-2 border-border focus-visible:border-primary transition-colors"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          disabled={isLoading || !name.trim()}
        >
          {isLoading ? "Analyzing..." : "Explore"}
        </Button>
      </div>
    </form>
  );
};
