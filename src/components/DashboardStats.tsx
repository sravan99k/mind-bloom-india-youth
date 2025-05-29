
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const DashboardStats = () => {
  const stats = [
    { label: "Overall Mental Health Status", value: 48, status: "Moderate Risk", color: "bg-yellow-500" },
    { label: "Stress", value: 62, status: "High", color: "bg-red-500" },
    { label: "Depression", value: 38, status: "Moderate", color: "bg-orange-500" },
    { label: "Eating Disorder", value: 45, status: "Moderate", color: "bg-orange-500" },
    { label: "Behavioral Issues", value: 47, status: "Moderate", color: "bg-orange-500" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Overall Mental Health Status</CardTitle>
          <CardDescription>
            Based on your responses across all assessment areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">48%</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                Moderate Risk
              </span>
            </div>
            <Progress value={48} className="h-3" />
            <div className="flex justify-between text-sm text-gray-500">
              <span>Low</span>
              <span>Moderate</span>
              <span>High</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.slice(1).map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">{stat.value}%</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    stat.status === "High" ? "bg-red-100 text-red-800" : "bg-orange-100 text-orange-800"
                  }`}>
                    {stat.status}
                  </span>
                </div>
                <Progress value={stat.value} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>💡</span>
            <span>Personalized Guidance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-700 mb-4">
            <li>• High stress detected. Try relaxation techniques like deep breathing, yoga, or regular physical activity.</li>
            <li>• Consider implementing a balanced eating routine and healthy relationship with food.</li>
            <li>• Connect with school counselors for additional support and guidance.</li>
          </ul>
          <Link to="/resources">
            <Button className="w-full bg-blue-500 hover:bg-blue-600">
              Explore Recommended Resources
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
