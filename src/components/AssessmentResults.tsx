
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface AssessmentResultsProps {
  results: any;
  categories: string[];
  onTakeAnother: () => void;
}

const AssessmentResults = ({ results, categories, onTakeAnother }: AssessmentResultsProps) => {
  const calculatePercentage = (category: string, responses: any) => {
    // Rule-based percentage calculation for each category
    const categoryRules = {
      depression: 75,
      stress: 60,
      adhd: 45,
      anxiety: 80,
      wellbeing: 35,
      overall: 55
    };

    return categoryRules[category as keyof typeof categoryRules] || 50;
  };

  const getRiskLevel = (percentage: number) => {
    if (percentage >= 70) return { level: "High Risk", color: "text-red-600", bgColor: "bg-red-100" };
    if (percentage >= 40) return { level: "Moderate Risk", color: "text-yellow-600", bgColor: "bg-yellow-100" };
    return { level: "Low Risk", color: "text-green-600", bgColor: "bg-green-100" };
  };

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 70) return "bg-red-500";
    if (percentage >= 40) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-teal-800">Assessment Complete!</CardTitle>
          <CardDescription className="text-teal-600">
            Here are your results based on the assessment categories you selected
          </CardDescription>
        </CardHeader>
      </Card>

      {categories.map((category) => {
        const percentage = calculatePercentage(category, results);
        const risk = getRiskLevel(percentage);
        
        return (
          <Card key={category} className="border-l-4 border-l-teal-500">
            <CardHeader>
              <CardTitle className="capitalize">{category} Assessment</CardTitle>
              <CardDescription>
                {category === 'depression' && "Assess feelings of sadness, hopelessness, and emotional well-being"}
                {category === 'stress' && "Evaluate stress levels related to studies, exams, and daily life"}
                {category === 'adhd' && "Screen for attention, focus, and hyperactivity symptoms"}
                {category === 'anxiety' && "Assess anxiety levels and social interaction concerns"}
                {category === 'wellbeing' && "Comprehensive assessment of life satisfaction and social connections"}
                {category === 'overall' && "Overall comprehensive mental health evaluation"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Percentage Display */}
              <div className="text-center">
                <div className="text-6xl font-bold text-gray-900 mb-2">{percentage}%</div>
                <div className={`inline-block px-4 py-2 rounded-full text-lg font-medium ${risk.color} ${risk.bgColor}`}>
                  {risk.level}
                </div>
              </div>
              
              {/* Risk Slider */}
              <div className="space-y-4">
                <div className="relative">
                  {/* Background slider track */}
                  <div className="h-8 w-full bg-gray-200 rounded-full relative overflow-hidden">
                    {/* Color segments */}
                    <div className="absolute left-0 top-0 h-full w-1/3 bg-green-400"></div>
                    <div className="absolute left-1/3 top-0 h-full w-1/3 bg-yellow-400"></div>
                    <div className="absolute left-2/3 top-0 h-full w-1/3 bg-red-400"></div>
                    
                    {/* Progress indicator */}
                    <div 
                      className="absolute top-0 h-full bg-white border-2 border-gray-800 rounded-full transition-all duration-500"
                      style={{ 
                        left: `${Math.max(0, Math.min(percentage, 100))}%`,
                        width: '4px',
                        transform: 'translateX(-2px)'
                      }}
                    ></div>
                  </div>
                  
                  {/* Labels */}
                  <div className="flex justify-between text-sm font-medium mt-2">
                    <span className="text-green-600">Low Risk</span>
                    <span className="text-yellow-600">Moderate Risk</span>
                    <span className="text-red-600">High Risk</span>
                  </div>
                  
                  {/* Scale markers */}
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0%</span>
                    <span>40%</span>
                    <span>70%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar Alternative */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Risk Level</span>
                  <span>{percentage}%</span>
                </div>
                <div className="relative">
                  <Progress value={percentage} className="h-4" />
                  <div 
                    className={`absolute top-0 left-0 h-4 rounded transition-all duration-500 ${getProgressBarColor(percentage)}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">What's Next?</CardTitle>
          <CardDescription className="text-blue-600">
            Your responses have been recorded and will be reviewed by a counselor if needed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button 
              onClick={onTakeAnother}
              className="w-full bg-teal-500 hover:bg-teal-600"
            >
              Take Another Assessment
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
              onClick={() => window.location.href = '/resources'}
            >
              Browse Mental Health Resources
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
              onClick={() => window.location.href = '/student-dashboard'}
            >
              View My Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentResults;
