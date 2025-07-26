import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreatePredictionProps {
  onSubmit: (prediction: {
    title: string;
    description: string;
    category: string;
    deadline: string;
  }) => void;
}

const categories = [
  "Sports",
  "Politics", 
  "Technology",
  "Entertainment",
  "Economics",
  "Science",
  "Weather",
  "Other"
];

export const CreatePrediction = ({ onSubmit }: CreatePredictionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !category || !deadline) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to create your prediction.",
        variant: "destructive"
      });
      return;
    }

    onSubmit({
      title,
      description,
      category,
      deadline
    });

    // Reset form
    setTitle("");
    setDescription("");
    setCategory("");
    setDeadline("");
    setIsOpen(false);
    
    toast({
      title: "Prediction created!",
      description: "Your prediction has been added to the feed."
    });
  };

  if (!isOpen) {
    return (
      <Card className="mb-6 border-dashed border-2 border-border hover:border-primary/30 transition-colors">
        <CardContent className="flex items-center justify-center py-8">
          <Button 
            onClick={() => setIsOpen(true)}
            className="bg-[var(--gradient-primary)] hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Prediction
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6 border-primary/20 shadow-[var(--shadow-soft)]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Create New Prediction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Prediction Title</Label>
            <Input
              id="title"
              placeholder="e.g., Manchester United will win the Premier League in 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-border focus:border-primary"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Provide more details about your prediction..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-border focus:border-primary min-h-[100px]"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="border-border focus:border-primary">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <div className="relative">
                <Input
                  id="deadline"
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="border-border focus:border-primary"
                  min={new Date().toISOString().split('T')[0]}
                />
                <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 pt-2">
            <Button 
              type="submit"
              className="bg-[var(--gradient-primary)] hover:opacity-90 transition-opacity"
            >
              Create Prediction
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};