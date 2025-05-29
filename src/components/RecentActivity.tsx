
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const RecentActivity = () => {
  const activities = [
    {
      type: "Assessment",
      title: "Stress Assessment Completed",
      date: "2 days ago",
      icon: "📊"
    },
    {
      type: "Resource",
      title: "Deep Breathing Exercise",
      date: "3 days ago",
      icon: "🧘"
    },
    {
      type: "Support",
      title: "Counselor Check-in",
      date: "1 week ago",
      icon: "👥"
    }
  ];

  const upcomingReminders = [
    {
      title: "Monthly Assessment Due",
      date: "In 3 days",
      type: "Assessment"
    },
    {
      title: "Counselor Meeting",
      date: "Next Monday",
      type: "Meeting"
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest interactions with MindfulMe</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl">{activity.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming</CardTitle>
          <CardDescription>Reminders and scheduled activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingReminders.map((reminder, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div>
                  <p className="text-sm font-medium text-gray-900">{reminder.title}</p>
                  <p className="text-xs text-blue-600">{reminder.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Need Support?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-green-700 mb-3">
            If you're feeling overwhelmed or need immediate support, don't hesitate to reach out.
          </p>
          <div className="space-y-2">
            <Button variant="outline" className="w-full text-green-700 border-green-300 hover:bg-green-100">
              Contact School Counselor
            </Button>
            <Button variant="outline" className="w-full text-green-700 border-green-300 hover:bg-green-100">
              Emergency Helpline
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentActivity;
