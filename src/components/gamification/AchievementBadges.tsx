
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Award, Star, Heart, Target, Calendar, Zap } from "lucide-react";

const achievementTypes = {
  assessment: { icon: Star, color: "bg-yellow-500", label: "Assessment" },
  mood: { icon: Heart, color: "bg-pink-500", label: "Mood Tracking" },
  journal: { icon: Calendar, color: "bg-blue-500", label: "Journaling" },
  goal: { icon: Target, color: "bg-green-500", label: "Goal Achievement" },
  streak: { icon: Zap, color: "bg-purple-500", label: "Streak" },
  engagement: { icon: Award, color: "bg-orange-500", label: "Engagement" }
};

export const AchievementBadges = () => {
  const [achievements, setAchievements] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchAchievements();
      checkAndAwardAchievements();
    }
  }, [user]);

  const fetchAchievements = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('user_achievements')
      .select('*')
      .eq('user_id', user.id)
      .order('earned_at', { ascending: false });

    if (!error && data) {
      setAchievements(data);
    }
  };

  const checkAndAwardAchievements = async () => {
    if (!user) return;

    // Check for various achievement conditions
    await checkAssessmentAchievements();
    await checkMoodTrackingAchievements();
    await checkJournalingAchievements();
  };

  const awardAchievement = async (type: string, name: string, description: string) => {
    if (!user) return;

    // Check if user already has this achievement
    const { data: existing } = await supabase
      .from('user_achievements')
      .select('id')
      .eq('user_id', user.id)
      .eq('achievement_name', name)
      .single();

    if (existing) return; // Already has this achievement

    const { error } = await supabase
      .from('user_achievements')
      .insert({
        user_id: user.id,
        achievement_type: type,
        achievement_name: name,
        description
      });

    if (!error) {
      fetchAchievements();
    }
  };

  const checkAssessmentAchievements = async () => {
    if (!user) return;

    const { data: assessments } = await supabase
      .from('assessment_responses')
      .select('id')
      .eq('user_id', user.id);

    if (assessments) {
      if (assessments.length >= 1) {
        await awardAchievement('assessment', 'First Steps', 'Completed your first assessment');
      }
      if (assessments.length >= 5) {
        await awardAchievement('assessment', 'Self-Aware', 'Completed 5 assessments');
      }
    }
  };

  const checkMoodTrackingAchievements = async () => {
    if (!user) return;

    const { data: moods } = await supabase
      .from('mood_entries')
      .select('id, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (moods) {
      if (moods.length >= 1) {
        await awardAchievement('mood', 'Mood Pioneer', 'Logged your first mood');
      }
      if (moods.length >= 7) {
        await awardAchievement('mood', 'Emotion Explorer', 'Tracked mood for 7 days');
      }
    }
  };

  const checkJournalingAchievements = async () => {
    if (!user) return;

    const { data: entries } = await supabase
      .from('journal_entries')
      .select('id')
      .eq('user_id', user.id);

    if (entries) {
      if (entries.length >= 1) {
        await awardAchievement('journal', 'Reflection Rookie', 'Written your first journal entry');
      }
      if (entries.length >= 10) {
        await awardAchievement('journal', 'Thoughtful Writer', 'Written 10 journal entries');
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="w-5 h-5 text-orange-500" />
          My Achievements
        </CardTitle>
        <CardDescription>
          Celebrate your wellness journey milestones
        </CardDescription>
      </CardHeader>
      <CardContent>
        {achievements.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Award className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Start your wellness journey to earn achievements!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => {
              const type = achievementTypes[achievement.achievement_type as keyof typeof achievementTypes];
              const Icon = type?.icon || Award;
              
              return (
                <div key={achievement.id} className="flex items-center gap-3 p-3 border rounded-lg bg-gradient-to-r from-gray-50 to-white">
                  <div className={`w-12 h-12 rounded-full ${type?.color || 'bg-gray-500'} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{achievement.achievement_name}</h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {type?.label || achievement.achievement_type}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {new Date(achievement.earned_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
