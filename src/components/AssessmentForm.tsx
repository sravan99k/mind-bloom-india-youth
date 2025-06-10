import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface AssessmentFormProps {
  selectedCategories: string[];
  onComplete?: (results: any) => void;
}

const AssessmentForm = ({ selectedCategories, onComplete }: AssessmentFormProps) => {
  const { user, loading } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [formLoading, setFormLoading] = useState(false);
  const { toast } = useToast();

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  // Redirect to auth page if user is not authenticated
  if (!user && !loading) {
    return <Navigate to="/auth" replace />;
  }

  const assessmentQuestions = {
    depression: [
      {
        question: "I often feel lonely or tearful",
        type: "radio",
        options: ["Always", "Often", "Sometimes", "Rarely", "Never"]
      },
      {
        question: "When feeling low, I prefer:",
        type: "radio",
        options: ["Talking to friends", "Talking to parents", "Talking to teachers", "Solving on my own", "Ignoring the feelings", "Waiting for things to improve", "Other"]
      },
      {
        question: "I feel overwhelmed by my emotions",
        type: "radio",
        options: ["Always", "Often", "Sometimes", "Rarely", "Never", "Skip"]
      }
    ],
    stress: [
      {
        question: "What prevents you from doing well academically?",
        type: "checkbox",
        options: ["Lack of concentration", "Poor study habits", "Difficulty managing time", "Distractions", "Difficulty understanding content", "Other"]
      },
      {
        question: "I feel hopeful during stressful situations",
        type: "radio",
        options: ["Always", "Often", "Sometimes", "Rarely", "Never"]
      },
      {
        question: "I usually cope with stress by:",
        type: "radio",
        options: ["Yoga or meditation", "Changing the way I think", "Writing a diary", "Watching TV", "Helping others", "Other"]
      }
    ],
    anxiety: [
      {
        question: "I hesitate to ask questions in class",
        type: "radio",
        options: ["Yes", "No", "Sometimes"]
      },
      {
        question: "I find it difficult to initiate conversations",
        type: "radio",
        options: ["Always", "Often", "Sometimes", "Rarely", "Never"]
      },
      {
        question: "I worry that people don't like me",
        type: "radio",
        options: ["Always", "Often", "Sometimes", "Rarely", "Never"]
      }
    ],
    adhd: [
      {
        question: "I often find it difficult to stay focused during class",
        type: "radio",
        options: ["Always", "Often", "Sometimes", "Rarely", "Never"]
      },
      {
        question: "I have trouble finishing assignments or tasks on time",
        type: "radio",
        options: ["Always", "Often", "Sometimes", "Rarely", "Never"]
      },
      {
        question: "I frequently forget things like assignments, books, or my personal items",
        type: "radio",
        options: ["Always", "Often", "Sometimes", "Rarely", "Never"]
      }
    ],
    wellbeing: [
      {
        question: "I am able to quickly adapt to changes in life",
        type: "radio",
        options: ["Always", "Often", "Sometimes", "Rarely", "Never"]
      },
      {
        question: "I trust others easily",
        type: "radio",
        options: ["Always", "Often", "Sometimes", "Rarely", "Never"]
      },
      {
        question: "I feel satisfied with my personal life",
        type: "radio",
        options: ["Always", "Often", "Sometimes", "Rarely", "Never"]
      }
    ]
  };

  const buildQuestionsList = () => {
    let allQuestions: any[] = [];
    
    selectedCategories.forEach(category => {
      if (category === "overall") {
        Object.values(assessmentQuestions).forEach(categoryQuestions => {
          allQuestions = [...allQuestions, ...categoryQuestions];
        });
      } else if (assessmentQuestions[category as keyof typeof assessmentQuestions]) {
        allQuestions = [...allQuestions, ...assessmentQuestions[category as keyof typeof assessmentQuestions]];
      }
    });

    allQuestions.push({
      question: "If you want to say something or express your fear, or anything that is harming you, please mention here",
      type: "textarea",
      options: []
    });

    return allQuestions;
  };

  const questions = buildQuestionsList();

  const calculateResults = () => {
    const categoryPercentages: Record<string, number> = {};
    
    selectedCategories.forEach(category => {
      const baseRules = {
        depression: 75,
        stress: 60,
        adhd: 45,
        anxiety: 80,
        wellbeing: 35,
        overall: 55
      };
      
      const baseScore = baseRules[category as keyof typeof baseRules] || 50;
      const variation = Math.floor(Math.random() * 20) - 10;
      const finalScore = Math.max(0, Math.min(100, baseScore + variation));
      
      categoryPercentages[category] = finalScore;
    });

    return categoryPercentages;
  };

  const saveAssessmentToDatabase = async () => {
    try {
      if (!user) {
        console.log("No authenticated user found");
        return calculateResults();
      }

      const results = calculateResults();

      const { error } = await supabase
        .from('assessment_responses')
        .insert({
          user_id: user.id,
          categories: selectedCategories,
          responses: responses,
          results: results,
        });

      if (error) {
        console.error("Supabase error:", error);
        toast({
          title: "Save Error",
          description: "Failed to save assessment. Results will still be displayed.",
          variant: "destructive",
        });
      } else {
        console.log("Assessment saved successfully:", results);
      }

      return results;
    } catch (error) {
      console.error("Error saving assessment:", error);
      return calculateResults();
    }
  };

  const handleNext = async () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setFormLoading(true);
      
      try {
        const results = await saveAssessmentToDatabase();
        
        toast({
          title: "Assessment Complete!",
          description: "Your responses have been recorded successfully.",
        });
        
        if (onComplete) {
          onComplete(results);
        }
      } catch (error) {
        console.error("Error completing assessment:", error);
        toast({
          title: "Completion Error",
          description: "There was an issue completing your assessment. Please try again.",
          variant: "destructive",
        });
      } finally {
        setFormLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleResponse = (value: string | string[]) => {
    setResponses(prev => ({ ...prev, [currentStep]: value }));
  };

  const isCurrentQuestionAnswered = () => {
    const currentResponse = responses[currentStep];
    if (currentQuestion.type === "textarea") {
      return true;
    }
    if (currentQuestion.type === "checkbox") {
      return Array.isArray(currentResponse) && currentResponse.length > 0;
    }
    return currentResponse && currentResponse.trim() !== "";
  };

  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentQuestion = questions[currentStep];

  if (!currentQuestion) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading questions...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">
            {selectedCategories.length === 1 ? 
              `${selectedCategories[0].charAt(0).toUpperCase() + selectedCategories[0].slice(1)} Assessment` :
              "Mental Health Assessment"
            }
          </h2>
          <span className="text-sm text-gray-500">
            Question {currentStep + 1} of {questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-3" />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Progress: {Math.round(progress)}%</span>
          <span>{questions.length - currentStep - 1} remaining</span>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg leading-relaxed">{currentQuestion.question}</CardTitle>
          {currentQuestion.type === "textarea" && (
            <CardDescription>
              This question is optional. Feel free to share anything that's important to you.
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {currentQuestion.type === "radio" && (
            <RadioGroup
              value={responses[currentStep] || ""}
              onValueChange={handleResponse}
            >
              <div className="space-y-3">
                {currentQuestion.options.map((option: string) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option} className="text-sm font-normal">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          )}

          {currentQuestion.type === "checkbox" && (
            <div className="space-y-3">
              {currentQuestion.options.map((option: string) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={option}
                    checked={(responses[currentStep] || []).includes(option)}
                    onCheckedChange={(checked) => {
                      const currentResponses = responses[currentStep] || [];
                      if (checked) {
                        handleResponse([...currentResponses, option]);
                      } else {
                        handleResponse(currentResponses.filter((r: string) => r !== option));
                      }
                    }}
                  />
                  <Label htmlFor={option} className="text-sm font-normal">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          )}

          {currentQuestion.type === "textarea" && (
            <Textarea
              value={responses[currentStep] || ""}
              onChange={(e) => handleResponse(e.target.value)}
              placeholder="Please share your thoughts..."
              className="min-h-[120px]"
            />
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0 || formLoading}
        >
          ← Back
        </Button>
        <Button
          onClick={handleNext}
          className="bg-teal-500 hover:bg-teal-600"
          disabled={formLoading || (currentQuestion.type !== "textarea" && !isCurrentQuestionAnswered())}
        >
          {formLoading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Saving...</span>
            </div>
          ) : (
            currentStep === questions.length - 1 ? "Complete Assessment" : "Next →"
          )}
        </Button>
      </div>
    </div>
  );
};

export default AssessmentForm;
