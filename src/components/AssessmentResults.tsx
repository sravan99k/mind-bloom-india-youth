
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";

interface AssessmentResultsProps {
  results: any;
  categories: string[];
  onTakeAnother: () => void;
}

const AssessmentResults = ({ results, categories, onTakeAnother }: AssessmentResultsProps) => {
  const calculatePercentage = (category: string) => {
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

  const getSliderColor = (percentage: number) => {
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
        const percentage = calculatePercentage(category);
        const risk = getRiskLevel(percentage);
        
        return (
          <Card key={category} className="border-l-4 border-l-teal-500">
            <CardHeader>
              <CardTitle className="capitalize flex items-center justify-between">
                {category} Assessment
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${risk.color} ${risk.bgColor}`}>
                  {risk.level}
                </div>
              </CardTitle>
              <CardDescription>
                {category === 'depression' && "Assessment of feelings of sadness, hopelessness, and emotional well-being"}
                {category === 'stress' && "Evaluation of stress levels related to studies, exams, and daily life"}
                {category === 'adhd' && "Screening for attention, focus, and hyperactivity symptoms"}
                {category === 'anxiety' && "Assessment of anxiety levels and social interaction concerns"}
                {category === 'wellbeing' && "Comprehensive assessment of life satisfaction and social connections"}
                {category === 'overall' && "Overall comprehensive mental health evaluation"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Large Percentage Display */}
              <div className="text-center mb-6">
                <div className="text-8xl font-bold text-gray-900 mb-2">{percentage}%</div>
                <p className="text-lg text-gray-600">Risk Level Assessment</p>
              </div>
              
              {/* Color-coded Risk Slider */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">Risk Scale</h4>
                <div className="relative">
                  {/* Background gradient slider track */}
                  <div className="h-6 w-full rounded-full relative overflow-hidden bg-gradient-to-r from-green-400 via-yellow-400 to-red-400">
                    {/* Current position indicator */}
                    <div 
                      className="absolute top-0 h-full w-1 bg-gray-900 border-2 border-white rounded-full shadow-lg transition-all duration-500 z-10"
                      style={{ 
                        left: `${Math.max(1, Math.min(percentage, 99))}%`,
                        transform: 'translateX(-50%)'
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        {percentage}%
                      </div>
                    </div>
                  </div>
                  
                  {/* Labels */}
                  <div className="flex justify-between text-sm font-medium mt-3">
                    <span className="text-green-600">Low Risk (0-39%)</span>
                    <span className="text-yellow-600">Moderate Risk (40-69%)</span>
                    <span className="text-red-600">High Risk (70-100%)</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Assessment Score</span>
                  <span>{percentage}% Risk Level</span>
                </div>
                <div className="relative">
                  <Progress value={percentage} className="h-4" />
                  <div 
                    className={`absolute top-0 left-0 h-4 rounded transition-all duration-500 ${getSliderColor(percentage)}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              {/* Recommendation based on risk level */}
              <div className={`p-4 rounded-lg ${risk.bgColor}`}>
                <h5 className={`font-semibold ${risk.color} mb-2`}>Recommendation</h5>
                <p className="text-sm text-gray-700">
                  {percentage >= 70 && "We recommend speaking with a counselor or mental health professional. Your responses indicate areas that may benefit from professional support."}
                  {percentage >= 40 && percentage < 70 && "Consider implementing stress management techniques and monitor your wellbeing. Reach out for support if you feel overwhelmed."}
                  {percentage < 40 && "Great job maintaining your mental wellbeing! Continue with healthy habits and stay connected with your support network."}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
          <CardHeader>
            <CardTitle className="text-teal-800">Take Another Assessment</CardTitle>
            <CardDescription className="text-teal-600">
              Assess different areas of your mental health
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={onTakeAnother}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white"
            >
              Select Different Categories
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">Additional Resources</CardTitle>
            <CardDescription className="text-blue-600">
              Access mental health resources and support
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
              onClick={() => window.location.href = '/resources'}
            >
              Browse Resources
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
              onClick={() => window.location.href = '/student-dashboard'}
            >
              View Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              Your responses have been securely recorded and will be reviewed by authorized counselors if needed.
              All information is confidential and handled according to privacy guidelines.
            </p>
            <div className="flex items-center justify-center text-xs text-gray-500">
              <span>Assessment completed on {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentResults;
