
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Loader2, TrendingUp, Calendar, Award } from "lucide-react";
import { AssessmentData } from "@/types/assessment";

const ProgressTracking = () => {
  const { user, loading: authLoading } = useAuth();
  const [assessments, setAssessments] = useState<AssessmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [progressData, setProgressData] = useState({
    currentStreak: 0,
    totalProgress: 0,
    improvementRate: 0,
    nextMilestone: 5
  });

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user?.id) return;

      try {
        const { data, error } = await supabase
          .from('assessment_responses')
          .select('*')
          .eq('user_id', user.id)
          .order('completed_at', { ascending: false });

        if (error) {
          console.error('Error fetching progress:', error);
          return;
        }

        // Transform the data to match our expected format
        const transformedData: AssessmentData[] = data.map(item => ({
          id: item.id,
          user_id: item.user_id,
          categories: item.categories,
          responses: item.responses,
          results: item.results ? (typeof item.results === 'string' ? JSON.parse(item.results) : item.results) : null,
          completed_at: item.completed_at
        }));

        setAssessments(transformedData);

        // Calculate progress metrics
        const totalAssessments = transformedData.length;
        let totalScore = 0;
        let validScores = 0;

        transformedData.forEach(assessment => {
          if (assessment.results && typeof assessment.results === 'object' && 'overallScore' in assessment.results) {
            totalScore += assessment.results.overallScore;
            validScores++;
          }
        });

        const averageScore = validScores > 0 ? totalScore / validScores : 0;
        const improvementRate = validScores > 1 ? 
          Math.max(0, Math.min(100, (averageScore - 50) * 2)) : 0;

        setProgressData({
          currentStreak: Math.min(totalAssessments, 7), // Max 7 day streak for demo
          totalProgress: Math.round(averageScore),
          improvementRate: Math.round(improvementRate),
          nextMilestone: Math.ceil(totalAssessments / 5) * 5 + 5
        });
      } catch (error) {
        console.error('Error processing progress:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user && !authLoading) {
      fetchProgress();
    }
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p>Please log in to track your progress.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Progress Tracking</h1>
          <p className="mt-2 text-gray-600">Monitor your wellness journey and achievements</p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Current Streak</h3>
                <Calendar className="h-6 w-6 text-blue-500" />
              </div>
              <p className="text-3xl font-bold text-blue-600">{progressData.currentStreak} days</p>
              <p className="text-sm text-gray-600 mt-2">Keep going! You're doing great.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Overall Progress</h3>
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-medium">{progressData.totalProgress}%</span>
                </div>
                <Progress value={progressData.totalProgress} className="w-full" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Next Milestone</h3>
                <Award className="h-6 w-6 text-yellow-500" />
              </div>
              <p className="text-3xl font-bold text-yellow-600">{progressData.nextMilestone}</p>
              <p className="text-sm text-gray-600 mt-2">assessments to unlock next achievement</p>
            </CardContent>
          </Card>
        </div>

        {/* Assessment History */}
        <Card>
          <CardHeader>
            <CardTitle>Assessment History</CardTitle>
            <CardDescription>Track your wellness assessment journey over time</CardDescription>
          </CardHeader>
          <CardContent>
            {assessments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No assessments completed yet.</p>
                <p className="text-sm text-gray-400 mt-2">Complete your first assessment to start tracking progress.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {assessments.map((assessment, index) => (
                  <div key={assessment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">Assessment #{assessments.length - index}</Badge>
                        {assessment.categories.map((category) => (
                          <Badge key={category} variant="secondary">
                            {category}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">
                        Completed on {new Date(assessment.completed_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      {assessment.results && typeof assessment.results === 'object' && 'overallScore' in assessment.results && (
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <p className="text-lg font-semibold text-gray-900">
                              {assessment.results.overallScore}%
                            </p>
                            {index < assessments.length - 1 && assessment.results && 
                             assessments[index + 1].results && 
                             typeof assessments[index + 1].results === 'object' && 
                             'overallScore' in assessments[index + 1].results! && (
                              <p className={`text-sm ${
                                assessment.results.overallScore > assessments[index + 1].results!.overallScore 
                                  ? 'text-green-600' 
                                  : assessment.results.overallScore < assessments[index + 1].results!.overallScore 
                                    ? 'text-red-600' 
                                    : 'text-gray-600'
                              }`}>
                                {assessment.results.overallScore > assessments[index + 1].results!.overallScore ? '+' : ''}
                                {assessment.results.overallScore - assessments[index + 1].results!.overallScore}%
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressTracking;
