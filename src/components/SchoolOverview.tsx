
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const SchoolOverview = () => {
  const classData = [
    { grade: "Grade 6", total: 120, assessed: 98, atRisk: 15, percentage: 82 },
    { grade: "Grade 7", total: 115, assessed: 103, atRisk: 18, percentage: 90 },
    { grade: "Grade 8", total: 108, assessed: 91, atRisk: 22, percentage: 84 },
    { grade: "Grade 9", total: 125, assessed: 106, atRisk: 28, percentage: 85 },
    { grade: "Grade 10", total: 132, assessed: 114, atRisk: 31, percentage: 86 }
  ];

  const totalStudents = classData.reduce((sum, grade) => sum + grade.total, 0);
  const totalAssessed = classData.reduce((sum, grade) => sum + grade.assessed, 0);
  const totalAtRisk = classData.reduce((sum, grade) => sum + grade.atRisk, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{totalStudents}</div>
            <p className="text-sm text-gray-500">Grades 6-10</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Assessments Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{totalAssessed}</div>
            <p className="text-sm text-gray-500">{Math.round((totalAssessed/totalStudents)*100)}% participation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Students Requiring Support</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{totalAtRisk}</div>
            <p className="text-sm text-gray-500">{Math.round((totalAtRisk/totalAssessed)*100)}% of assessed</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assessment Progress by Grade</CardTitle>
          <CardDescription>Student participation in mental health assessments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {classData.map((grade, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{grade.grade}</span>
                  <div className="text-sm text-gray-500">
                    {grade.assessed}/{grade.total} students ({grade.percentage}%)
                  </div>
                </div>
                <Progress value={grade.percentage} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Students at risk: {grade.atRisk}</span>
                  <span>{Math.round((grade.atRisk/grade.assessed)*100)}% need support</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-red-50 border-red-200">
        <CardHeader>
          <CardTitle className="text-red-800">Priority Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-red-700">
            <li>• Grade 9 and 10 show highest stress levels - consider intervention programs</li>
            <li>• 14 students flagged for immediate counselor follow-up</li>
            <li>• Implement stress management workshops for high-risk students</li>
            <li>• Schedule parent-teacher conferences for students with eating disorder concerns</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchoolOverview;
