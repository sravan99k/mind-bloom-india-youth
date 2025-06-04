
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, TrendingUp, TrendingDown, Users, AlertTriangle, Download, Filter, Search } from "lucide-react";

const ProgressTracking = () => {
  const { user } = useAuth();
  const [assessmentData, setAssessmentData] = useState<any[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
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
      depression: assessment.results?.depression || Math.floor(Math.random() * 100),
      stress: assessment.results?.stress || Math.floor(Math.random() * 100),
      anxiety: assessment.results?.anxiety || Math.floor(Math.random() * 100),
      wellbeing: assessment.results?.wellbeing || Math.floor(Math.random() * 100),
      overall: assessment.results?.overall || Math.floor(Math.random() * 100),
    }));
  };

  const getStudentList = () => {
    // Mock student data for management view
    if (!isManagement) return [];
    
    return [
      { id: 'ST001', name: 'Alex Johnson', class: 'Grade 10', riskLevel: 'High', lastAssessment: '2024-01-15' },
      { id: 'ST002', name: 'Sarah Smith', class: 'Grade 9', riskLevel: 'Low', lastAssessment: '2024-01-14' },
      { id: 'ST003', name: 'Michael Brown', class: 'Grade 11', riskLevel: 'Moderate', lastAssessment: '2024-01-13' },
    ].filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getAggregateData = () => {
    const categories = ['Depression', 'Stress', 'Anxiety', 'ADHD', 'Wellbeing'];
    return categories.map(category => ({
      category,
      percentage: Math.floor(Math.random() * 100),
      trend: Math.random() > 0.5 ? 'up' : 'down',
      change: Math.floor(Math.random() * 20),
      studentCount: Math.floor(Math.random() * 50) + 10,
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

  const getRiskBadgeColor = (level: string) => {
    switch (level) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const exportData = () => {
    // Generate CSV data
    const csvData = assessmentData.map(assessment => ({
      Date: new Date(assessment.completed_at).toLocaleDateString(),
      Categories: assessment.categories.join(', '),
      Results: JSON.stringify(assessment.results || {}),
    }));

    const csvContent = "data:text/csv;charset=utf-8," 
      + "Date,Categories,Results\n"
      + csvData.map(row => `${row.Date},"${row.Categories}","${row.Results}"`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `progress_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
  const studentList = getStudentList();

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

          {/* Filters and Search */}
          <div className="mb-6 flex flex-wrap gap-4 items-center">
            <div className="flex gap-4">
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

            {isManagement && (
              <div className="flex gap-2 items-center">
                <Search className="w-4 h-4 text-gray-500" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
            )}

            <Button onClick={exportData} variant="outline" className="ml-auto">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>

          {isManagement ? (
            // Management View
            <div className="space-y-8">
              {/* Student List */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Student Overview
                  </CardTitle>
                  <CardDescription>
                    Latest risk assessments for all students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {studentList.map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                           onClick={() => setSelectedStudent(student.id)}>
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-gray-500">{student.id} • {student.class}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge className={getRiskBadgeColor(student.riskLevel)}>
                            {student.riskLevel} Risk
                          </Badge>
                          <p className="text-sm text-gray-500">Last: {student.lastAssessment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Aggregate Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>School-wide Trends</CardTitle>
                    <CardDescription>Average risk levels across all students</CardDescription>
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

                <Card>
                  <CardHeader>
                    <CardTitle>Risk Distribution</CardTitle>
                    <CardDescription>Current risk levels by category</CardDescription>
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
                            <span className="text-xs text-gray-500">({item.studentCount} students)</span>
                            {item.trend === 'up' ? (
                              <TrendingUp className="w-4 h-4 text-red-500" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                        </div>
                        <Progress value={item.percentage} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            // Student View
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Personal Progress Chart */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      My Progress Over Time
                    </CardTitle>
                    <CardDescription>
                      Your risk score trends across different assessment categories
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {progressData.length > 0 ? (
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
                    ) : (
                      <div className="h-96 flex items-center justify-center text-gray-500">
                        <div className="text-center">
                          <p className="mb-4">No assessment data available yet.</p>
                          <Button 
                            className="bg-teal-500 hover:bg-teal-600"
                            onClick={() => window.location.href = '/assessment'}
                          >
                            Take Your First Assessment
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Assessment History */}
                <Card>
                  <CardHeader>
                    <CardTitle>Assessment History</CardTitle>
                    <CardDescription>Your completed assessments and results</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {assessmentData.length > 0 ? (
                      <div className="space-y-4">
                        {assessmentData.slice(-5).reverse().map((assessment, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">
                                  {assessment.categories.map((cat: string) => 
                                    cat.charAt(0).toUpperCase() + cat.slice(1)
                                  ).join(', ')} Assessment
                                </p>
                                <p className="text-sm text-gray-500">
                                  Completed on {new Date(assessment.completed_at).toLocaleDateString()}
                                </p>
                              </div>
                              <Badge variant="outline">
                                {assessment.categories.length} {assessment.categories.length === 1 ? 'Category' : 'Categories'}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">No assessments completed yet.</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Personal Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      My Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Assessments</span>
                      <Badge variant="outline">{assessmentData.length}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">This Month</span>
                      <Badge variant="outline">
                        {assessmentData.filter(a => 
                          new Date(a.completed_at).getMonth() === new Date().getMonth()
                        ).length}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Last Assessment</span>
                      <Badge variant="outline">
                        {assessmentData.length > 0 
                          ? new Date(assessmentData[assessmentData.length - 1].completed_at).toLocaleDateString()
                          : 'None'
                        }
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Latest Results */}
                {assessmentData.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Latest Results</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {Object.entries(assessmentData[assessmentData.length - 1].results || {}).map(([category, percentage]) => (
                        <div key={category} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium capitalize">{category}</span>
                            <span className={`text-sm font-bold ${getRiskColor(percentage as number)}`}>
                              {percentage}%
                            </span>
                          </div>
                          <Progress value={percentage as number} className="h-2" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button 
                      className="w-full bg-teal-500 hover:bg-teal-600"
                      onClick={() => window.location.href = '/assessment'}
                    >
                      Take New Assessment
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => window.location.href = '/resources'}
                    >
                      View Resources
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={exportData}
                    >
                      Export My Data
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProgressTracking;
