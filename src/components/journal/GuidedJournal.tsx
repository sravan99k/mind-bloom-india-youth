
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Calendar, Lock } from "lucide-react";

const journalPrompts = [
  "What are three things you're grateful for today?",
  "Describe a moment today when you felt proud of yourself.",
  "What's one challenge you faced today and how did you handle it?",
  "Write about someone who made you smile today.",
  "What's one thing you learned about yourself this week?",
  "If you could give advice to someone having a tough day, what would you say?",
  "Describe your ideal way to spend a weekend.",
  "What's a goal you're working towards and why is it important to you?",
  "Write about a time when you helped someone else.",
  "What does 'being kind to yourself' mean to you?",
];

export const GuidedJournal = () => {
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [entry, setEntry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentEntries, setRecentEntries] = useState<any[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      generateDailyPrompt();
      fetchRecentEntries();
    }
  }, [user]);

  const generateDailyPrompt = () => {
    const today = new Date().toDateString();
    const promptIndex = new Date().getDate() % journalPrompts.length;
    setCurrentPrompt(journalPrompts[promptIndex]);
  };

  const fetchRecentEntries = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5);

    if (!error && data) {
      setRecentEntries(data);
    }
  };

  const handleSubmitEntry = async () => {
    if (!user || !entry.trim()) return;

    setIsSubmitting(true);

    const { error } = await supabase
      .from('journal_entries')
      .insert({
        user_id: user.id,
        prompt: currentPrompt,
        content: entry.trim(),
        is_private: true
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save journal entry. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Entry Saved!",
        description: "Your journal entry has been saved securely.",
      });
      setEntry("");
      fetchRecentEntries();
    }

    setIsSubmitting(false);
  };

  const getNewPrompt = () => {
    const randomIndex = Math.floor(Math.random() * journalPrompts.length);
    setCurrentPrompt(journalPrompts[randomIndex]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            Daily Journal
          </CardTitle>
          <CardDescription>
            Reflect on your thoughts and feelings with guided prompts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-blue-900">Today's Prompt</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={getNewPrompt}
                className="text-blue-700 border-blue-300"
              >
                New Prompt
              </Button>
            </div>
            <p className="text-blue-800 text-lg italic">"{currentPrompt}"</p>
          </div>

          <Textarea
            placeholder="Start writing your thoughts here..."
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            className="min-h-32"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Lock className="w-4 h-4" />
              Your entries are private and secure
            </div>
            <Button 
              onClick={handleSubmitEntry}
              disabled={isSubmitting || !entry.trim()}
              className="bg-blue-500 hover:bg-blue-600"
            >
              {isSubmitting ? "Saving..." : "Save Entry"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {recentEntries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Recent Entries
            </CardTitle>
            <CardDescription>Your previous journal reflections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEntries.map((entry) => (
                <div key={entry.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">
                      {new Date(entry.created_at).toLocaleDateString()}
                    </Badge>
                    <Lock className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-sm text-blue-700 italic mb-2">"{entry.prompt}"</p>
                  <p className="text-gray-700 text-sm line-clamp-3">{entry.content}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
