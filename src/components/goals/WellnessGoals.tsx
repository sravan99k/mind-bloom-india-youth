
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Target, Plus, CheckCircle, Calendar } from "lucide-react";

export const WellnessGoals = () => {
  const [goals, setGoals] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    target_frequency: "daily"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchGoals();
    }
  }, [user]);

  const fetchGoals = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('wellness_goals')
      .select(`
        *,
        goal_progress (*)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setGoals(data);
    }
  };

  const handleCreateGoal = async () => {
    if (!user || !newGoal.title.trim()) return;

    setIsSubmitting(true);

    const { error } = await supabase
      .from('wellness_goals')
      .insert({
        user_id: user.id,
        title: newGoal.title.trim(),
        description: newGoal.description.trim() || null,
        target_frequency: newGoal.target_frequency
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create goal. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Goal Created!",
        description: "Your wellness goal has been added successfully.",
      });
      setNewGoal({ title: "", description: "", target_frequency: "daily" });
      setShowAddForm(false);
      fetchGoals();
    }

    setIsSubmitting(false);
  };

  const handleCompleteGoal = async (goalId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('goal_progress')
      .insert({
        goal_id: goalId,
        user_id: user.id,
        completed_date: new Date().toISOString().split('T')[0],
        notes: null
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to mark goal as complete.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Great job!",
        description: "Goal progress recorded successfully.",
      });
      fetchGoals();
    }
  };

  const getGoalProgress = (goal: any) => {
    const today = new Date().toISOString().split('T')[0];
    const thisWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const thisMonth = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    let completions = 0;
    let total = 1;

    if (goal.target_frequency === 'daily') {
      completions = goal.goal_progress.filter((p: any) => p.completed_date === today).length;
      total = 1;
    } else if (goal.target_frequency === 'weekly') {
      completions = goal.goal_progress.filter((p: any) => p.completed_date >= thisWeek).length;
      total = 7;
    } else if (goal.target_frequency === 'monthly') {
      completions = goal.goal_progress.filter((p: any) => p.completed_date >= thisMonth).length;
      total = 30;
    }

    return Math.min((completions / total) * 100, 100);
  };

  const isGoalCompletedToday = (goal: any) => {
    const today = new Date().toISOString().split('T')[0];
    return goal.goal_progress.some((p: any) => p.completed_date === today);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-500" />
                My Wellness Goals
              </CardTitle>
              <CardDescription>
                Set and track personal mental wellness goals
              </CardDescription>
            </div>
            <Button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-green-500 hover:bg-green-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Goal
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showAddForm && (
            <div className="mb-6 p-4 border rounded-lg bg-green-50 border-green-200">
              <h3 className="font-semibold mb-4 text-green-800">Create New Goal</h3>
              <div className="space-y-4">
                <Input
                  placeholder="Goal title (e.g., Practice mindfulness)"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                />
                <Textarea
                  placeholder="Description (optional)"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                />
                <Select
                  value={newGoal.target_frequency}
                  onValueChange={(value) => setNewGoal({...newGoal, target_frequency: value})}
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
                <div className="flex gap-2">
                  <Button 
                    onClick={handleCreateGoal}
                    disabled={isSubmitting || !newGoal.title.trim()}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    {isSubmitting ? "Creating..." : "Create Goal"}
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {goals.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Target className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No goals set yet. Create your first wellness goal!</p>
              </div>
            ) : (
              goals.map((goal) => {
                const progress = getGoalProgress(goal);
                const completedToday = isGoalCompletedToday(goal);
                
                return (
                  <div key={goal.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{goal.title}</h3>
                        {goal.description && (
                          <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="capitalize">
                          {goal.target_frequency}
                        </Badge>
                        {!completedToday && (
                          <Button
                            size="sm"
                            onClick={() => handleCompleteGoal(goal.id)}
                            className="bg-green-500 hover:bg-green-600"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Complete
                          </Button>
                        )}
                        {completedToday && (
                          <Badge className="bg-green-500">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Done Today
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Progress</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
