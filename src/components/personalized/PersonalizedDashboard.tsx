
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Sparkles, TrendingUp, Heart, BookOpen, Target } from "lucide-react";

const wellnessArticles = [
  {
    title: "5-Minute Breathing Exercises for Stress Relief",
    category: "stress",
    type: "article",
    content: "Learn simple breathing techniques that can help reduce stress and anxiety in just 5 minutes.",
    difficulty: "beginner"
  },
  {
    title: "Building Positive Self-Talk Habits",
    category: "depression",
    type: "article", 
    content: "Discover how to challenge negative thoughts and develop a more positive inner voice.",
    difficulty: "intermediate"
  },
  {
    title: "Mindful Study Techniques for Better Focus",
    category: "adhd",
    type: "activity",
    content: "Practical strategies to improve concentration and manage distractions while studying.",
    difficulty: "beginner"
  },
  {
    title: "Social Anxiety: Small Steps to Big Changes",
    category: "anxiety",
    type: "guide",
    content: "Gentle approaches to managing social anxiety and building confidence in social situations.",
    difficulty: "beginner"
  },
  {
    title: "Creating Healthy Sleep Routines",
    category: "wellbeing",
    type: "guide",
    content: "Establish better sleep habits for improved mental and physical wellbeing.",
    difficulty: "beginner"
  }
];

export const PersonalizedDashboard = () => {
  const [personalizedContent, setPersonalizedContent] = useState<any[]>([]);
  const [recentAssessment, setRecentAssessment] = useState<any>(null);
  const [moodTrend, setMoodTrend] = useState<string>("");
  const [activeGoals, setActiveGoals] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchPersonalizedData();
    }
  }, [user]);

  const fetchPersonalizedData = async () => {
    if (!user) return;

    // Fetch recent assessment
    const { data: assessments } = await supabase
      .from('assessment_responses')
      .select('*')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false })
      .limit(1);

    if (assessments && assessments.length > 0) {
      setRecentAssessment(assessments[0]);
      generatePersonalizedContent(assessments[0].categories);
    }

    // Fetch recent mood entries
    const { data: moods } = await supabase
      .from('mood_entries')
      .select('mood_score, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(7);

    if (moods && moods.length >= 2) {
      const recent = moods.slice(0, 3).reduce((sum, m) => sum + m.mood_score, 0) / 3;
      const older = moods.slice(3, 6).reduce((sum, m) => sum + m.mood_score, 0) / Math.max(moods.slice(3, 6).length, 1);
      
      if (recent > older) {
        setMoodTrend("improving");
      } else if (recent < older) {
        setMoodTrend("declining");
      } else {
        setMoodTrend("stable");
      }
    }

    // Fetch active goals
    const { data: goals } = await supabase
      .from('wellness_goals')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_completed', false)
      .order('created_at', { ascending: false })
      .limit(3);

    if (goals) {
      setActiveGoals(goals);
    }
  };

  const generatePersonalizedContent = (categories: string[]) => {
    // Filter articles based on assessment categories
    const relevantArticles = wellnessArticles.filter(article => 
      categories.some(category => category.toLowerCase().includes(article.category))
    );
    
    // Add some general wellbeing content if specific matches are limited
    const generalContent = wellnessArticles.filter(article => 
      article.category === 'wellbeing' || article.difficulty === 'beginner'
    );

    const combinedContent = [...relevantArticles, ...generalContent]
      .slice(0, 4)
      .map(article => ({
        ...article,
        id: Math.random().toString(36).substr(2, 9),
        isPersonalized: categories.some(cat => cat.toLowerCase().includes(article.category))
      }));

    setPersonalizedContent(combinedContent);
  };

  const getInsightMessage = () => {
    if (!recentAssessment) {
      return "Take your first assessment to get personalized recommendations!";
    }

    if (moodTrend === "improving") {
      return "Great news! Your mood has been trending upward lately. Keep up the positive momentum!";
    } else if (moodTrend === "declining") {
      return "I notice your mood has been lower recently. Consider trying some of the recommended activities below.";
    } else {
      return "Your mood has been stable. Explore new wellness activities to continue growing!";
    }
  };

  const getTrendIcon = () => {
    if (moodTrend === "improving") return <TrendingUp className="w-5 h-5 text-green-500" />;
    if (moodTrend === "declining") return <TrendingUp className="w-5 h-5 text-red-500 rotate-180" />;
    return <Heart className="w-5 h-5 text-blue-500" />;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-500" />
            My Daily Dose of Positivity
          </CardTitle>
          <CardDescription>
            Personalized recommendations based on your wellness journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 mb-4">
            {getTrendIcon()}
            <p className="text-gray-700">{getInsightMessage()}</p>
          </div>
          
          {activeGoals.length > 0 && (
            <div className="bg-white rounded-lg p-4 mb-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-green-500" />
                Today's Goals
              </h3>
              <div className="space-y-2">
                {activeGoals.map(goal => (
                  <div key={goal.id} className="flex items-center justify-between">
                    <span className="text-sm">{goal.title}</span>
                    <Badge variant="outline" className="text-xs capitalize">
                      {goal.target_frequency}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {personalizedContent.map((content) => (
          <Card key={content.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge 
                  variant={content.isPersonalized ? "default" : "secondary"}
                  className={content.isPersonalized ? "bg-purple-500" : ""}
                >
                  {content.isPersonalized ? "Recommended for You" : "General Wellness"}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {content.type}
                </Badge>
              </div>
              <CardTitle className="text-lg">{content.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{content.content}</CardDescription>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs capitalize">
                  {content.difficulty}
                </Badge>
                <Button variant="outline" size="sm">
                  <BookOpen className="w-4 h-4 mr-1" />
                  Read More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {personalizedContent.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 mb-4">
              Take an assessment to get personalized wellness recommendations!
            </p>
            <Button 
              className="bg-purple-500 hover:bg-purple-600"
              onClick={() => window.location.href = '/assessment'}
            >
              Take Assessment
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
