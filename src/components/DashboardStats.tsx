
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { TrendingUp, Calendar, Heart, Target } from "lucide-react";

const DashboardStats = () => {
  const stats = [
    {
      title: "Overall Wellbeing",
      value: "Good",
      description: "Based on your recent assessments",
      progress: 75,
      icon: Heart,
      color: "text-green-600"
    },
    {
      title: "Weekly Progress",
      value: "3/5",
      description: "Mindfulness sessions completed",
      progress: 60,
      icon: Target,
      color: "text-blue-600"
    },
    {
      title: "Streak",
      value: "7 days",
      description: "Consistent daily check-ins",
      progress: 100,
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "Next Assessment",
      value: "2 days",
      description: "Monthly wellbeing check",
      progress: 33,
      icon: Calendar,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Dashboard</h2>
        <p className="text-gray-600">Here's how you're doing with your mental health journey</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">{stat.value}</div>
                <p className="text-xs text-muted-foreground mb-3">{stat.description}</p>
                <Progress value={stat.progress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">{stat.progress}% complete</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
        <CardHeader>
          <CardTitle className="text-teal-800">Quick Actions</CardTitle>
          <CardDescription className="text-teal-600">
            Take care of your mental health today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-teal-500 hover:bg-teal-600 text-white">
              Take Assessment
            </Button>
            <Button variant="outline" className="border-teal-300 text-teal-700 hover:bg-teal-50">
              Browse Resources
            </Button>
            <Button variant="outline" className="border-teal-300 text-teal-700 hover:bg-teal-50">
              Contact Counselor
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
