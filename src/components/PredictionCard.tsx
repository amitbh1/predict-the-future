import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, MessageSquare, Calendar } from "lucide-react";
import { useState } from "react";

interface Prediction {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  createdAt: string;
  deadline: string;
  upvotes: number;
  downvotes: number;
  userVote?: 'up' | 'down' | null;
  comments: number;
}

interface PredictionCardProps {
  prediction: Prediction;
  onVote: (id: string, vote: 'up' | 'down') => void;
}

export const PredictionCard = ({ prediction, onVote }: PredictionCardProps) => {
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(prediction.userVote || null);
  const [upvotes, setUpvotes] = useState(prediction.upvotes);
  const [downvotes, setDownvotes] = useState(prediction.downvotes);

  const handleVote = (vote: 'up' | 'down') => {
    if (userVote === vote) {
      // Remove vote
      setUserVote(null);
      if (vote === 'up') {
        setUpvotes(prev => prev - 1);
      } else {
        setDownvotes(prev => prev - 1);
      }
    } else {
      // Add or change vote
      if (userVote) {
        // Change vote
        if (userVote === 'up') {
          setUpvotes(prev => prev - 1);
          setDownvotes(prev => prev + 1);
        } else {
          setDownvotes(prev => prev - 1);
          setUpvotes(prev => prev + 1);
        }
      } else {
        // New vote
        if (vote === 'up') {
          setUpvotes(prev => prev + 1);
        } else {
          setDownvotes(prev => prev + 1);
        }
      }
      setUserVote(vote);
    }
    onVote(prediction.id, vote);
  };

  const voteScore = upvotes - downvotes;
  
  return (
    <Card className="transition-all duration-200 hover:shadow-[var(--shadow-prediction)] border-border/60">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-semibold text-lg leading-tight mb-2 text-foreground">
              {prediction.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
              {prediction.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>by {prediction.author}</span>
              <span>•</span>
              <span>{prediction.createdAt}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>Deadline: {prediction.deadline}</span>
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="shrink-0">
            {prediction.category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-muted rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 w-8 p-0 hover:bg-upvote/10 ${
                  userVote === 'up' 
                    ? 'bg-upvote text-upvote-foreground hover:bg-upvote' 
                    : 'text-muted-foreground hover:text-upvote'
                }`}
                onClick={() => handleVote('up')}
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
              
              <span className={`px-2 text-sm font-medium min-w-[2rem] text-center ${
                voteScore > 0 ? 'text-upvote' : voteScore < 0 ? 'text-downvote' : 'text-muted-foreground'
              }`}>
                {voteScore > 0 ? '+' : ''}{voteScore}
              </span>
              
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 w-8 p-0 hover:bg-downvote/10 ${
                  userVote === 'down' 
                    ? 'bg-downvote text-downvote-foreground hover:bg-downvote' 
                    : 'text-muted-foreground hover:text-downvote'
                }`}
                onClick={() => handleVote('down')}
              >
                <ArrowDown className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <MessageSquare className="w-4 h-4 mr-1" />
            {prediction.comments}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};