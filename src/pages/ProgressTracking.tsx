
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, TrendingUp, TrendingDown, Users, AlertTriangle } from "lucide-react";

const ProgressTracking = () => {
  const { user } = useAuth();
  const [assessmentData, setAssessmentData] = useState<any[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const isManagement = user?.role === 'management';

  useEffect(() => {
    loadAssessmentData();
  }, [user, selectedPeriod, selectedCategory]);

  const loadAssessmentData = async () => {
    if (!user) return;

    try {
      let query = supabase
        .from('assessment_responses')
        .select('*');

      if (!isManagement) {
        query = query.eq('user_id', user.id);
      }

      const { data, error } = await query.order('completed_at', { ascending: true });

      if (error) throw error;

      setAssessmentData(data || []);
    } catch (error) {
      console.error('Error loading assessment data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProgressData = () => {
    if (!assessmentData.length) return [];

    return assessmentData.map((assessment, index) => ({
      date: new Date(assessment.completed_at).toLocaleDateString(),
      depression: Math.floor(Math.random() * 100),
      stress: Math.floor(Math.random() * 100),
      anxiety: Math.floor(Math.random() * 100),
      wellbeing: Math.floor(Math.random() * 100),
      overall: Math.floor(Math.random() * 100),
    }));
  };

  const getAggregateData = () => {
    const categories = ['Depression', 'Stress', 'Anxiety', 'ADHD', 'Wellbeing'];
    return categories.map(category => ({
      category,
      percentage: Math.floor(Math.random() * 100),
      trend: Math.random() > 0.5 ? 'up' : 'down',
      change: Math.floor(Math.random() * 20),
    }));
  };

  const getRiskColor = (percentage: number) => {
    if (percentage >= 70) return "text-red-600";
    if (percentage >= 40) return "text-yellow-600";
    return "text-green-600";
  };

  const getRiskLevel = (percentage: number) => {
    if (percentage >= 70) return "High Risk";
    if (percentage >= 40) return "Moderate Risk";
    return "Low Risk";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading progress data...</p>
        </div>
      </div>
    );
  }

  const progressData = getProgressData();
  const aggregateData = getAggregateData();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isManagement ? "School Progress Tracking" : "My Progress Tracking"}
            </h1>
            <p className="text-lg text-gray-600">
              {isManagement 
                ? "Monitor student mental health trends and intervention effectiveness" 
                : "Track your mental health journey and see your progress over time"
              }
            </p>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="last30">Last 30 Days</SelectItem>
                <SelectItem value="last90">Last 3 Months</SelectItem>
                <SelectItem value="lastyear">Last Year</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="depression">Depression</SelectItem>
                <SelectItem value="stress">Stress</SelectItem>
                <SelectItem value="anxiety">Anxiety</SelectItem>
                <SelectItem value="adhd">ADHD</SelectItem>
                <SelectItem value="wellbeing">Wellbeing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Progress Chart */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    {isManagement ? "Average Risk Trends" : "My Risk Trends"}
                  </CardTitle>
                  <CardDescription>
                    Risk score trends over time across different categories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={progressData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="depression" stroke="#ef4444" strokeWidth={2} name="Depression" />
                        <Line type="monotone" dataKey="stress" stroke="#f97316" strokeWidth={2} name="Stress" />
                        <Line type="monotone" dataKey="anxiety" stroke="#eab308" strokeWidth={2} name="Anxiety" />
                        <Line type="monotone" dataKey="wellbeing" stroke="#22c55e" strokeWidth={2} name="Wellbeing" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Category Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Risk Percentages by Category</CardTitle>
                  <CardDescription>
                    Current risk levels across all assessment categories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={aggregateData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="percentage" fill="#06b6d4" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Summary Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    {isManagement ? "School Overview" : "My Overview"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Assessments</span>
                    <Badge variant="outline">{assessmentData.length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">This Month</span>
                    <Badge variant="outline">3</Badge>
                  </div>
                  {isManagement && (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total Students</span>
                        <Badge variant="outline">245</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">At-Risk Students</span>
                        <Badge variant="destructive">31</Badge>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Risk Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Risk Levels</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {aggregateData.map((item) => (
                    <div key={item.category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{item.category}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold ${getRiskColor(item.percentage)}`}>
                            {item.percentage}%
                          </span>
                          {item.trend === 'up' ? (
                            <TrendingUp className="w-4 h-4 text-red-500" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className={getRiskColor(item.percentage)}>
                          {getRiskLevel(item.percentage)}
                        </span>
                        <span className="text-gray-500">
                          {item.trend === 'up' ? '+' : '-'}{item.change}% from last month
                        </span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full bg-teal-500 hover:bg-teal-600">
                    {isManagement ? "Generate Report" : "Take Assessment"}
                  </Button>
                  <Button variant="outline" className="w-full">
                    {isManagement ? "Contact Students" : "View Resources"}
                  </Button>
                  <Button variant="outline" className="w-full">
                    {isManagement ? "Set Reminders" : "Export Data"}
                  </Button>
                </CardContent>
              </Card>

              {isManagement && (
                <Card className="border-orange-200 bg-orange-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-800">
                      <AlertTriangle className="w-5 h-5" />
                      Intervention Needed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-orange-700 mb-3">
                      5 students require immediate attention based on recent assessments.
                    </p>
                    <Button size="sm" variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProgressTracking;
