
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, TrendingUp, Target, BookOpen, Award, Users, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import PersonalizedRecommendations from "@/components/ai/PersonalizedRecommendations";

const PersonalizedDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [recentMoods, setRecentMoods] = useState<any[]>([]);
  const [activeGoals, setActiveGoals] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        // Fetch recent mood entries
        const { data: moods } = await supabase
          .from('mood_entries')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(7);
        
        setRecentMoods(moods || []);

        // Fetch active goals
        const { data: goals } = await supabase
          .from('wellness_goals')
          .select('*')
          .eq('user_id', user.id)
          .eq('is_completed', false)
          .order('created_at', { ascending: false })
          .limit(3);
        
        setActiveGoals(goals || []);

        // Fetch recent achievements
        const { data: userAchievements } = await supabase
          .from('user_achievements')
          .select('*')
          .eq('user_id', user.id)
          .order('earned_at', { ascending: false })
          .limit(5);
        
        setAchievements(userAchievements || []);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const averageMoodScore = recentMoods.length > 0 
    ? recentMoods.reduce((sum, mood) => sum + mood.mood_score, 0) / recentMoods.length 
    : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
        <CardHeader>
          <CardTitle className="text-2xl text-teal-800">
            Welcome back! 👋
          </CardTitle>
          <CardDescription className="text-teal-600">
            Here's your personalized wellness overview for today
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Mood</p>
                <p className="text-2xl font-bold text-gray-900">
                  {averageMoodScore.toFixed(1)}/10
                </p>
              </div>
              <Heart className="h-8 w-8 text-pink-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Goals</p>
                <p className="text-2xl font-bold text-gray-900">{activeGoals.length}</p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Badges Earned</p>
                <p className="text-2xl font-bold text-gray-900">{achievements.length}</p>
              </div>
              <Award className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Check-ins</p>
                <p className="text-2xl font-bold text-gray-900">{recentMoods.length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI-Powered Personalized Recommendations */}
      <PersonalizedRecommendations />

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Goals */}
        <Card>
          <CardHeader>
            <CardTitle>Current Goals</CardTitle>
            <CardDescription>Your active wellness goals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeGoals.length > 0 ? (
              activeGoals.map((goal) => (
                <div key={goal.id} className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900">{goal.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                  <div className="mt-2">
                    <Badge variant="outline">{goal.target_frequency}</Badge>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                No active goals. Set your first wellness goal!
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Achievements</CardTitle>
            <CardDescription>Your latest badges and milestones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {achievements.length > 0 ? (
              achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Award className="h-8 w-8 text-yellow-500" />
                  <div>
                    <h4 className="font-medium text-gray-900">{achievement.achievement_name}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                No achievements yet. Keep engaging to earn your first badge!
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Jump into your wellness activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => window.location.href = '/wellness-dashboard?tab=mood'}
            >
              <Heart className="h-6 w-6" />
              Track Mood
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => window.location.href = '/wellness-dashboard?tab=journal'}
            >
              <BookOpen className="h-6 w-6" />
              Write Journal
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => window.location.href = '/assessment'}
            >
              <TrendingUp className="h-6 w-6" />
              Take Assessment
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => window.location.href = '/wellness-dashboard?tab=chatbot'}
            >
              <Sparkles className="h-6 w-6" />
              AI Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalizedDashboard;
