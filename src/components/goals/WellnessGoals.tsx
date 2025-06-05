
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Target, CheckCircle, Plus, Calendar, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const WellnessGoals = () => {
  const [goals, setGoals] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    target_frequency: "daily"
  });
  const [goalProgress, setGoalProgress] = useState<{[key: string]: any[]}>({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: goalsData, error: goalsError } = await supabase
          .from('wellness_goals')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (goalsError) throw goalsError;
        setGoals(goalsData || []);

        // Fetch progress for each goal
        const { data: progressData, error: progressError } = await supabase
          .from('goal_progress')
          .select('*')
          .eq('user_id', user.id)
          .order('completed_date', { ascending: false });

        if (progressError) throw progressError;

        // Group progress by goal_id
        const progressByGoal = (progressData || []).reduce((acc, progress) => {
          if (!acc[progress.goal_id]) acc[progress.goal_id] = [];
          acc[progress.goal_id].push(progress);
          return acc;
        }, {});

        setGoalProgress(progressByGoal);
      }
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const createGoal = async () => {
    if (!newGoal.title.trim()) {
      toast({
        title: "Please enter a goal title",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Please log in",
          description: "You need to be logged in to create goals",
          variant: "destructive"
        });
        return;
      }

      const { error } = await supabase
        .from('wellness_goals')
        .insert({
          user_id: user.id,
          title: newGoal.title,
          description: newGoal.description,
          target_frequency: newGoal.target_frequency
        });

      if (error) throw error;

      toast({
        title: "Goal created!",
        description: "Your wellness goal has been added successfully"
      });

      setNewGoal({ title: "", description: "", target_frequency: "daily" });
      setShowAddForm(false);
      fetchGoals();

    } catch (error) {
      console.error('Error creating goal:', error);
      toast({
        title: "Error",
        description: "Failed to create goal",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const markGoalProgress = async (goalId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('goal_progress')
        .insert({
          goal_id: goalId,
          user_id: user.id,
          completed_date: new Date().toISOString().split('T')[0]
        });

      if (error) throw error;

      toast({
        title: "Progress recorded!",
        description: "Great job on working towards your goal"
      });

      fetchGoals();

    } catch (error) {
      console.error('Error marking progress:', error);
      toast({
        title: "Error",
        description: "Failed to record progress",
        variant: "destructive"
      });
    }
  };

  const deleteGoal = async (goalId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('wellness_goals')
        .delete()
        .eq('id', goalId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Goal deleted",
        description: "Your goal has been removed"
      });

      fetchGoals();

    } catch (error) {
      console.error('Error deleting goal:', error);
      toast({
        title: "Error",
        description: "Failed to delete goal",
        variant: "destructive"
      });
    }
  };

  const getGoalStreak = (goalId: string) => {
    const progress = goalProgress[goalId] || [];
    if (progress.length === 0) return 0;

    let streak = 0;
    const today = new Date();
    const sortedProgress = progress.sort((a, b) => 
      new Date(b.completed_date).getTime() - new Date(a.completed_date).getTime()
    );

    for (let i = 0; i < sortedProgress.length; i++) {
      const progressDate = new Date(sortedProgress[i].completed_date);
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);

      if (progressDate.toDateString() === expectedDate.toDateString()) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const hasProgressToday = (goalId: string) => {
    const progress = goalProgress[goalId] || [];
    const today = new Date().toISOString().split('T')[0];
    return progress.some(p => p.completed_date === today);
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Goal Button */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-500" />
                My Wellness Goals
              </CardTitle>
              <CardDescription>
                Set and track personal mental wellness goals to build healthy habits
              </CardDescription>
            </div>
            <Button onClick={() => setShowAddForm(!showAddForm)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Goal
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Add Goal Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Wellness Goal</CardTitle>
            <CardDescription>
              Set a specific, achievable goal for your mental wellness journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Goal Title *
              </label>
              <Input
                placeholder="e.g., Practice mindfulness daily, Get 8 hours of sleep"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <Textarea
                placeholder="Describe your goal and why it's important to you..."
                value={newGoal.description}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Frequency
              </label>
              <Select 
                value={newGoal.target_frequency} 
                onValueChange={(value) => setNewGoal({ ...newGoal, target_frequency: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={createGoal} disabled={loading}>
                {loading ? "Creating..." : "Create Goal"}
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Goals List */}
      <div className="space-y-4">
        {goals.length > 0 ? (
          goals.map((goal) => {
            const streak = getGoalStreak(goal.id);
            const todayComplete = hasProgressToday(goal.id);
            const totalProgress = goalProgress[goal.id]?.length || 0;

            return (
              <Card key={goal.id} className={`border-l-4 ${goal.is_completed ? 'border-l-green-500' : 'border-l-blue-500'}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">
                        {goal.title}
                      </h3>
                      {goal.description && (
                        <p className="text-gray-600 mb-3">{goal.description}</p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">
                          <Calendar className="h-3 w-3 mr-1" />
                          {goal.target_frequency}
                        </Badge>
                        <Badge variant={streak > 0 ? "default" : "secondary"}>
                          🔥 {streak} day streak
                        </Badge>
                        <Badge variant="outline">
                          {totalProgress} times completed
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant={todayComplete ? "secondary" : "default"}
                        onClick={() => markGoalProgress(goal.id)}
                        disabled={todayComplete}
                      >
                        {todayComplete ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Done Today
                          </>
                        ) : (
                          "Mark Complete"
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteGoal(goal.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Recent Progress */}
                  {goalProgress[goal.id] && goalProgress[goal.id].length > 0 && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Progress:</h4>
                      <div className="flex flex-wrap gap-1">
                        {goalProgress[goal.id].slice(0, 10).map((progress, index) => (
                          <div
                            key={progress.id}
                            className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded"
                          >
                            {new Date(progress.completed_date).toLocaleDateString()}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No wellness goals yet</h3>
              <p className="text-gray-600 mb-4">
                Start your wellness journey by setting your first goal
              </p>
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Goal
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Goal Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle>Goal Suggestions</CardTitle>
          <CardDescription>
            Popular wellness goals among students
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">Practice Mindfulness</h4>
              <p className="text-sm text-blue-800 mb-3">
                Spend 5-10 minutes daily on mindfulness or meditation
              </p>
              <Button size="sm" variant="outline" onClick={() => {
                setNewGoal({
                  title: "Practice mindfulness daily",
                  description: "Spend 5-10 minutes on mindfulness or meditation to reduce stress and improve focus",
                  target_frequency: "daily"
                });
                setShowAddForm(true);
              }}>
                Use This Goal
              </Button>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-2">Improve Sleep Quality</h4>
              <p className="text-sm text-green-800 mb-3">
                Get 7-9 hours of quality sleep each night
              </p>
              <Button size="sm" variant="outline" onClick={() => {
                setNewGoal({
                  title: "Get 8 hours of sleep nightly",
                  description: "Maintain a consistent sleep schedule to improve mental clarity and emotional wellbeing",
                  target_frequency: "daily"
                });
                setShowAddForm(true);
              }}>
                Use This Goal
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WellnessGoals;
