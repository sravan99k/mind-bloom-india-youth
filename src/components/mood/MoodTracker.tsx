
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Heart, Smile, Meh, Frown, Zap } from "lucide-react";

const moodOptions = [
  { score: 1, label: "Very Low", emoji: "😔", color: "bg-red-500", icon: Frown },
  { score: 2, label: "Low", emoji: "😕", color: "bg-red-400", icon: Frown },
  { score: 3, label: "Below Average", emoji: "🙁", color: "bg-orange-400", icon: Meh },
  { score: 4, label: "Fair", emoji: "😐", color: "bg-yellow-400", icon: Meh },
  { score: 5, label: "Average", emoji: "😊", color: "bg-yellow-300", icon: Smile },
  { score: 6, label: "Good", emoji: "🙂", color: "bg-green-300", icon: Smile },
  { score: 7, label: "Great", emoji: "😄", color: "bg-green-400", icon: Smile },
  { score: 8, label: "Excellent", emoji: "😆", color: "bg-green-500", icon: Zap },
  { score: 9, label: "Amazing", emoji: "🤩", color: "bg-blue-400", icon: Zap },
  { score: 10, label: "Perfect", emoji: "🥳", color: "bg-purple-500", icon: Heart },
];

export const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentMoods, setRecentMoods] = useState<any[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchRecentMoods();
    }
  }, [user]);

  const fetchRecentMoods = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('mood_entries')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(7);

    if (!error && data) {
      setRecentMoods(data);
    }
  };

  const handleSubmitMood = async () => {
    if (!user || !selectedMood) return;

    setIsSubmitting(true);
    const selectedMoodData = moodOptions.find(m => m.score === selectedMood);

    const { error } = await supabase
      .from('mood_entries')
      .insert({
        user_id: user.id,
        mood_score: selectedMood,
        mood_label: selectedMoodData?.label || '',
        notes: notes.trim() || null
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save mood entry. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Mood Logged!",
        description: "Your mood has been recorded successfully.",
      });
      setSelectedMood(null);
      setNotes("");
      fetchRecentMoods();
    }

    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-500" />
            How are you feeling today?
          </CardTitle>
          <CardDescription>
            Track your daily mood to understand your emotional patterns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-5 gap-3">
            {moodOptions.map((mood) => {
              const Icon = mood.icon;
              return (
                <button
                  key={mood.score}
                  onClick={() => setSelectedMood(mood.score)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                    selectedMood === mood.score
                      ? `${mood.color} border-gray-800 text-white`
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">{mood.emoji}</div>
                    <Icon className="w-4 h-4 mx-auto mb-1" />
                    <div className="text-xs font-medium">{mood.label}</div>
                    <div className="text-xs text-gray-500">{mood.score}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {selectedMood && (
            <div className="space-y-4">
              <Textarea
                placeholder="How was your day? Any specific thoughts or feelings? (optional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-20"
              />
              <Button 
                onClick={handleSubmitMood}
                disabled={isSubmitting}
                className="w-full bg-teal-500 hover:bg-teal-600"
              >
                {isSubmitting ? "Saving..." : "Log My Mood"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {recentMoods.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Recent Mood Trend</CardTitle>
            <CardDescription>Your mood entries from the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {recentMoods.map((entry, index) => {
                const mood = moodOptions.find(m => m.score === entry.mood_score);
                return (
                  <div key={entry.id} className="flex flex-col items-center min-w-16">
                    <div className={`w-12 h-12 rounded-full ${mood?.color} flex items-center justify-center text-white font-bold`}>
                      {entry.mood_score}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(entry.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
