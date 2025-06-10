
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, FileText, TrendingUp } from "lucide-react";
import { Navigate } from "react-router-dom";

interface AssessmentResponse {
  id: string;
  categories: string[];
  completed_at: string;
  responses: any;
  results: any;
}

const MyAssessments = () => {
  const { user, loading } = useAuth();
  const [assessments, setAssessments] = useState<AssessmentResponse[]>([]);
  const [assessmentLoading, setAssessmentLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadAssessments();
    }
  }, [user]);

  const loadAssessments = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('assessment_responses')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false });

      if (error) throw error;
      setAssessments(data || []);
    } catch (error) {
      console.error('Error loading assessments:', error);
    } finally {
      setAssessmentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading assessments...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const getRiskBadgeColor = (level: string) => {
    switch (level) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskLevel = (percentage: number) => {
    if (percentage >= 70) return "High Risk";
    if (percentage >= 40) return "Moderate Risk";
    return "Low Risk";
  };

  const formatAnswerValue = (value: unknown): string => {
    if (value === null || value === undefined) return 'No answer';
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return value.toString();
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (Array.isArray(value)) return value.join(', ');
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Assessments</h1>
            <p className="text-lg text-gray-600">
              View your assessment history and track your mental health journey
            </p>
          </div>

          {assessmentLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your assessments...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{assessments.length}</div>
                    <p className="text-xs text-muted-foreground">
                      Completed assessments
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Latest Assessment</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {assessments.length > 0 
                        ? new Date(assessments[0].completed_at).toLocaleDateString()
                        : 'No assessments'
                      }
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Most recent completion
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Categories Assessed</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {[...new Set(assessments.flatMap(a => a.categories))].length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Different categories
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Assessment History */}
              <Card>
                <CardHeader>
                  <CardTitle>Assessment History</CardTitle>
                  <CardDescription>
                    Your complete assessment history with questions, answers, and results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {assessments.length > 0 ? (
                    <div className="space-y-6">
                      {assessments.map((assessment, index) => (
                        <div key={assessment.id} className="border rounded-lg p-6 space-y-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg">
                                Assessment #{assessments.length - index}
                              </h3>
                              <p className="text-sm text-gray-500">
                                Completed on {new Date(assessment.completed_at).toLocaleDateString()} at{' '}
                                {new Date(assessment.completed_at).toLocaleTimeString()}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {assessment.categories.map((category: string) => (
                                <Badge key={category} variant="outline" className="capitalize">
                                  {category}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Results */}
                          {assessment.results && (
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-medium mb-3">Results</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {Object.entries(assessment.results).map(([category, score]) => (
                                  <div key={category} className="flex items-center justify-between">
                                    <span className="capitalize font-medium">{category}:</span>
                                    <div className="flex items-center gap-2">
                                      <span className="font-bold">{score}%</span>
                                      <Badge className={getRiskBadgeColor(getRiskLevel(score as number).split(' ')[0])}>
                                        {getRiskLevel(score as number)}
                                      </Badge>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Questions and Answers */}
                          {assessment.responses && (
                            <div className="space-y-3">
                              <h4 className="font-medium">Questions & Answers</h4>
                              <div className="max-h-60 overflow-y-auto space-y-3">
                                {Object.entries(assessment.responses).map(([question, answer], qIndex) => (
                                  <div key={qIndex} className="bg-white p-3 border rounded">
                                    <p className="font-medium text-sm mb-2">Q{qIndex + 1}: {question}</p>
                                    <p className="text-sm text-gray-700">Answer: {formatAnswerValue(answer)}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No assessments yet</h3>
                      <p className="text-gray-500 mb-4">
                        You haven't completed any assessments yet. Take your first assessment to start tracking your mental health.
                      </p>
                      <Button 
                        className="bg-teal-500 hover:bg-teal-600"
                        onClick={() => window.location.href = '/assessment'}
                      >
                        Take Your First Assessment
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyAssessments;
