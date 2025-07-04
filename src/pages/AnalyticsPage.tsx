
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, TrendingUp, Users, Calendar, Target } from "lucide-react";
import { AssessmentData } from "@/types/assessment";

const AnalyticsPage = () => {
  const { user, loading: authLoading } = useAuth();
  const [assessments, setAssessments] = useState<AssessmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAssessments: 0,
    averageScore: 0,
    completionRate: 0,
    lastAssessment: null as string | null
  });

  useEffect(() => {
    const fetchAssessments = async () => {
      if (!user?.id) return;

      try {
        const { data, error } = await supabase
          .from('assessment_responses')
          .select('*')
          .eq('user_id', user.id)
          .order('completed_at', { ascending: false });

        if (error) {
          console.error('Error fetching assessments:', error);
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

        // Calculate stats
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
        const lastAssessment = transformedData.length > 0 ? transformedData[0].completed_at : null;

        setStats({
          totalAssessments,
          averageScore: Math.round(averageScore),
          completionRate: 100, // Since we only fetch completed assessments
          lastAssessment
        });
      } catch (error) {
        console.error('Error processing assessments:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user && !authLoading) {
      fetchAssessments();
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
            <p>Please log in to view your analytics.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="mt-2 text-gray-600">Track your wellness assessment progress and insights</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Target className="h-8 w-8 text-blue-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Assessments</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalAssessments}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.averageScore}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-purple-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completionRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Calendar className="h-8 w-8 text-yellow-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Last Assessment</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.lastAssessment 
                      ? new Date(stats.lastAssessment).toLocaleDateString()
                      : 'None'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Assessments */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Assessments</CardTitle>
            <CardDescription>Your latest wellness assessment results</CardDescription>
          </CardHeader>
          <CardContent>
            {assessments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No assessments completed yet.</p>
                <p className="text-sm text-gray-400 mt-2">Take your first assessment to see analytics here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {assessments.slice(0, 5).map((assessment) => (
                  <div key={assessment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {assessment.categories.map((category) => (
                          <Badge key={category} variant="outline">
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
                        <p className="text-lg font-semibold text-gray-900">
                          {assessment.results.overallScore}%
                        </p>
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

export default AnalyticsPage;
