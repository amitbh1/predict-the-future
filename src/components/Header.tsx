import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Filter } from "lucide-react";

interface HeaderProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  "All",
  "Sports", 
  "Politics",
  "Technology",
  "Entertainment",
  "Economics",
  "Science",
  "Weather"
];

export const Header = ({ selectedCategory, onCategoryChange }: HeaderProps) => {
  return (
    <div className="mb-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <TrendingUp className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent">
            PredictHub
          </h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Share your predictions about future events and see what the community thinks. 
          Vote on predictions to help surface the most credible forecasts.
        </p>
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">Categories:</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category)}
            className={selectedCategory === category 
              ? "bg-[var(--gradient-primary)] hover:opacity-90" 
              : "hover:bg-primary/10 hover:border-primary/30"
            }
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};