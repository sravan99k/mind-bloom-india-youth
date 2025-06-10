import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Download, Filter, Search } from "lucide-react";

// Import the new components
import { StudentOverviewTable } from "@/components/progress/StudentOverviewTable";
import { IndividualStudentProgress } from "@/components/progress/IndividualStudentProgress";
import { AggregateTrends } from "@/components/progress/AggregateTrends";
import { InterventionTracking } from "@/components/progress/InterventionTracking";
import { PersonalProgressChart } from "@/components/progress/PersonalProgressChart";
import { AssessmentHistory } from "@/components/progress/AssessmentHistory";
import { ProgressSidebar } from "@/components/progress/ProgressSidebar";

interface AssessmentResult {
  depression?: number;
  stress?: number;
  anxiety?: number;
  adhd?: number;
  wellbeing?: number;
  overall?: number;
}

interface AssessmentData {
  id: string;
  user_id: string;
  categories: string[];
  responses: any;
  results?: AssessmentResult;
  completed_at: string;
}

const ProgressTracking = () => {
  const { user } = useAuth();
  const [assessmentData, setAssessmentData] = useState<AssessmentData[]>([]);
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

      // Transform the data to match our interface
      const transformedData: AssessmentData[] = (data || []).map(item => ({
        id: item.id,
        user_id: item.user_id,
        categories: item.categories,
        responses: item.responses,
        results: item.results as AssessmentResult || undefined,
        completed_at: item.completed_at
      }));

      setAssessmentData(transformedData);
    } catch (error) {
      console.error('Error loading assessment data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProgressData = () => {
    if (!assessmentData.length) return [];

    return assessmentData.map((assessment) => ({
      date: new Date(assessment.completed_at).toLocaleDateString(),
      depression: (assessment.results?.depression as number) || Math.floor(Math.random() * 100),
      stress: (assessment.results?.stress as number) || Math.floor(Math.random() * 100),
      anxiety: (assessment.results?.anxiety as number) || Math.floor(Math.random() * 100),
      wellbeing: (assessment.results?.wellbeing as number) || Math.floor(Math.random() * 100),
      overall: (assessment.results?.overall as number) || Math.floor(Math.random() * 100),
    }));
  };

  const getStudentList = () => {
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
      trend: Math.random() > 0.5 ? 'up' : 'down' as 'up' | 'down',
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
              <StudentOverviewTable
                studentList={studentList}
                onSelectStudent={setSelectedStudent}
                getRiskBadgeColor={getRiskBadgeColor}
              />

              {selectedStudent && (
                <IndividualStudentProgress
                  selectedStudent={selectedStudent}
                  progressData={progressData}
                />
              )}

              <AggregateTrends
                aggregateData={aggregateData}
                getRiskColor={getRiskColor}
              />

              <InterventionTracking />
            </div>
          ) : (
            // Student View
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <PersonalProgressChart progressData={progressData} />
                <AssessmentHistory
                  assessmentData={assessmentData}
                  getRiskLevel={getRiskLevel}
                  getRiskBadgeColor={getRiskBadgeColor}
                />
              </div>

              <ProgressSidebar
                assessmentData={assessmentData}
                getRiskColor={getRiskColor}
                onExportData={exportData}
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProgressTracking;
