import { useState } from "react";
import { Header } from "@/components/Header";
import { CreatePrediction } from "@/components/CreatePrediction";
import { PredictionCard } from "@/components/PredictionCard";

// Mock data for demonstration
const initialPredictions = [
  {
    id: "1",
    title: "Manchester United will win the Premier League in 2026",
    description: "With their recent signings and improved performance under the new manager, I believe Manchester United has a strong chance of winning the Premier League title in the 2025-26 season.",
    category: "Sports",
    author: "FootballFan2024",
    createdAt: "2 hours ago",
    deadline: "2026-05-25",
    upvotes: 127,
    downvotes: 43,
    comments: 28,
    userVote: null as 'up' | 'down' | null
  },
  {
    id: "2", 
    title: "Apple will release AR glasses by the end of 2025",
    description: "Given Apple's recent investments in AR technology and Tim Cook's statements about augmented reality being the next big thing, I predict Apple will launch consumer AR glasses before 2026.",
    category: "Technology",
    author: "TechInsider",
    createdAt: "5 hours ago", 
    deadline: "2025-12-31",
    upvotes: 89,
    downvotes: 67,
    comments: 15,
    userVote: null as 'up' | 'down' | null
  },
  {
    id: "3",
    title: "Bitcoin will reach $150,000 by 2025",
    description: "With institutional adoption increasing and the upcoming halving event, I believe Bitcoin will reach a new all-time high of $150,000 per coin by the end of 2025.",
    category: "Economics", 
    author: "CryptoAnalyst",
    createdAt: "1 day ago",
    deadline: "2025-12-31",
    upvotes: 234,
    downvotes: 156,
    comments: 67,
    userVote: null as 'up' | 'down' | null
  },
  {
    id: "4",
    title: "AI will discover a cure for Alzheimer's by 2030",
    description: "With the rapid advancement in AI-driven drug discovery and recent breakthroughs in understanding Alzheimer's disease, I predict AI will play a crucial role in finding an effective treatment by 2030.",
    category: "Science",
    author: "BioResearcher", 
    createdAt: "2 days ago",
    deadline: "2030-12-31",
    upvotes: 445,
    downvotes: 78,
    comments: 92,
    userVote: null as 'up' | 'down' | null
  }
];

const Index = () => {
  const [predictions, setPredictions] = useState(initialPredictions);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCreatePrediction = (newPrediction: {
    title: string;
    description: string;
    category: string;
    deadline: string;
  }) => {
    const prediction = {
      id: Date.now().toString(),
      ...newPrediction,
      author: "You",
      createdAt: "Just now",
      upvotes: 1,
      downvotes: 0,
      comments: 0,
      userVote: 'up' as const
    };
    
    setPredictions(prev => [prediction, ...prev]);
  };

  const handleVote = (id: string, vote: 'up' | 'down') => {
    // In a real app, this would update the backend
    console.log(`Voting ${vote} on prediction ${id}`);
  };

  const filteredPredictions = selectedCategory === "All" 
    ? predictions 
    : predictions.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        
        <CreatePrediction onSubmit={handleCreatePrediction} />
        
        <div className="space-y-4">
          {filteredPredictions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No predictions found in this category. Be the first to create one!
              </p>
            </div>
          ) : (
            filteredPredictions.map((prediction) => (
              <PredictionCard
                key={prediction.id}
                prediction={prediction}
                onVote={handleVote}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;