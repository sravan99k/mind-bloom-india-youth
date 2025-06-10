
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SchoolOverview from "@/components/SchoolOverview";
import StudentMetrics from "@/components/StudentMetrics";
import HighRiskStudentsAlert from "@/components/HighRiskStudentsAlert";
import SchoolAnalyticsDashboard from "@/components/SchoolAnalyticsDashboard";
import EarlyRiskDetection from "@/components/ai/EarlyRiskDetection";
import { fetchStudentData, StudentData } from "@/services/studentDataService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";
import { AlertTriangle, ClipboardList, Brain, BarChart3, Users } from "lucide-react";
import { Navigate } from "react-router-dom";

const SchoolDashboard = () => {
  const { user, loading } = useAuth();
  const [students, setStudents] = useState<StudentData[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const loadStudentData = async () => {
      try {
        const data = await fetchStudentData();
        setStudents(data);
      } catch (error) {
        console.error('Error loading student data:', error);
      } finally {
        setDataLoading(false);
      }
    };

    if (user?.role === 'management') {
      loadStudentData();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (user.role !== 'management') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Alert className="border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                School Dashboard access is restricted to management users only. 
                Students can access assessments and their personal dashboard.
              </AlertDescription>
            </Alert>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Access Denied</CardTitle>
                <CardDescription>
                  You need management privileges to access the school dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-teal-500 hover:bg-teal-600"
                    onClick={() => window.location.href = '/assessment'}
                  >
                    <ClipboardList className="w-4 h-4 mr-2" />
                    Take Assessment
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.location.href = '/student-dashboard'}
                  >
                    Go to Student Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              School Mental Health Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Monitor and support student mental health with AI-powered insights and early intervention.
            </p>
          </div>
          
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">
                <Users className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="analytics">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="ai-detection">
                <Brain className="h-4 w-4 mr-2" />
                AI Detection
              </TabsTrigger>
              <TabsTrigger value="alerts">
                <AlertTriangle className="h-4 w-4 mr-2" />
                High-Risk Alerts
              </TabsTrigger>
              <TabsTrigger value="progress">
                <BarChart3 className="h-4 w-4 mr-2" />
                Progress Tracking
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <SchoolOverview />
                </div>
                <div>
                  <StudentMetrics />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <SchoolAnalyticsDashboard students={students} />
            </TabsContent>

            <TabsContent value="ai-detection" className="space-y-6">
              <EarlyRiskDetection />
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              <HighRiskStudentsAlert students={students} />
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Progress Tracking</CardTitle>
                  <CardDescription>
                    View detailed progress tracking for all students in your school
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="bg-teal-500 hover:bg-teal-600"
                    onClick={() => window.location.href = '/progress-tracking'}
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Go to Progress Tracking
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SchoolDashboard;
