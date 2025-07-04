import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ProfanityFilteredInput } from "@/components/ui/profanity-filtered-input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AssessmentFormProps {
  selectedCategories: string[];
  onComplete?: (results: any) => void;
}

const AssessmentForm = ({ selectedCategories, onComplete }: AssessmentFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const assessmentQuestions = {
    depression: [
      { question: "I often feel lonely or sad", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I feel like no one understands me", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I have felt hopeless or helpless recently", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I feel like giving up or hiding away from everyone", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I have thoughts that worry me or make me feel unsafe", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I find it difficult to share my feelings with others", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I feel overwhelmed by my emotions", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I enjoy doing things I used to enjoy", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I find it hard to smile or feel cheerful", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I sleep too much or too little", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I feel tired or have low energy most days", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I feel that I am not good at anything or that I am a burden", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I sometimes have thoughts that make me feel scared or unsafe", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] }
    ],
    stress: [
      { question: "I feel pressure from family to do well in school", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I find it hard to balance school and home responsibilities", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I feel like I can’t control important things in my life", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I get upset about things I can't control", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I find myself eating too much or skipping meals due to stress", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I worry about disappointing others", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I skip school work intentionally", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I feel calm even when things go wrong", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I feel supported by my family during difficult times", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "My parents/caregivers listen when I share feelings", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I can ask for help without feeling ashamed", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] }
    ],
    anxiety: [
      { question: "I feel nervous or anxious without a clear reason", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I worry a lot about making mistakes", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I hesitate to speak or ask questions in class", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I avoid social events or eating in public due to nervousness", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I worry too much about how I look", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I feel like something bad might happen, even when things seem fine", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I have trouble relaxing even during breaks", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "My body reacts when I feel nervous (sweating, heartbeat, stomach ache)", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I compare my looks or body with others often", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I feel anxious about food, weight, or eating in public", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] }
    ],
    adhd: [
      { question: "I find it hard to concentrate in class or while studying", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I lose things like notebooks or ID cards often", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I get distracted easily, even in quiet places", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I start tasks but don’t finish them", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I forget instructions or assignments", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I talk or move a lot, even when I’m not supposed to", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I interrupt or talk over others", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I act before thinking about the consequences", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I feel restless or find it hard to sit still", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I struggle to organize my time and tasks", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] }
    ],
    wellbeing: [
      { question: "I feel cheerful and in good spirits", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I feel calm and relaxed", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I feel active and full of energy", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I feel that my life has meaning and purpose", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I wake up feeling fresh and rested", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I am confident in myself", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I can adapt when things change", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I understand and respect others' feelings", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I feel like I belong in school", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I feel respected by classmates and teachers", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I am satisfied with my academic performance", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I get along well with classmates", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I believe I can solve difficult tasks with effort", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I can manage my time and submit work on time", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I feel safe at home", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I am happy with my body image", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I skip meals on purpose", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I overeat when stressed or emotional", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I feel guilty after eating", type: "radio", options: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
      { question: "I have tried smoking or alcohol out of curiosity or peer pressure", type: "radio", options: ["Yes", "No"] },
      { question: "I have taken part in bullying (online or offline)", type: "radio", options: ["Yes", "No"] },
      { question: "I have shared or seen hurtful messages online", type: "radio", options: ["Yes", "No"] },
      { question: "I have stayed silent when I saw something wrong", type: "radio", options: ["Yes", "No"] }
    ]
  } as const;

  // Move these helper constants and functions to the top-level of the component, before calculateResults
  const reverse_scored_items = [
    "I enjoy doing things I used to enjoy",
    "I feel calm even when things go wrong",
    "I feel supported by my family during difficult times",
    "My parents/caregivers listen when I share feelings",
    "I can ask for help without feeling ashamed",
    "I feel cheerful and in good spirits",
    "I feel calm and relaxed",
    "I feel active and full of energy",
    "I feel that my life has meaning and purpose",
    "I wake up feeling fresh and rested",
    "I am confident in myself",
    "I can adapt when things change",
    "I understand and respect others' feelings",
    "I feel like I belong in school",
    "I feel respected by classmates and teachers",
    "I am satisfied with my academic performance",
    "I get along well with classmates",
    "I believe I can solve difficult tasks with effort",
    "I can manage my time and submit work on time",
    "I feel safe at home",
    "I am happy with my body image"
  ];

  const optionScores: Record<string, number> = {
    'Always': 4,
    'Often': 3,
    'Sometimes': 2,
    'Rarely': 1,
    'Never': 0,
    'Yes': 4,
    'No': 0
  };

  const reverseScore = (score: number) => 4 - score;

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

    // Removed the extra textarea question as requested
    return allQuestions;
  };

  const questions = buildQuestionsList();

  const calculateResults = () => {
    const categoryPercentages: Record<string, number> = {};
    selectedCategories.forEach(category => {
      let catQuestions: any[] = [];
      if (category === "overall") {
        Object.values(assessmentQuestions).forEach(qs => {
          catQuestions = [...catQuestions, ...qs];
        });
      } else if (assessmentQuestions[category as keyof typeof assessmentQuestions]) {
        catQuestions = [...(assessmentQuestions[category as keyof typeof assessmentQuestions] as unknown as any[])];
      }
      let total = 0;
      let count = 0;
      catQuestions.forEach((q) => {
        // Find the index of this question in the global questions array
        const globalIdx = questions.findIndex(qq => qq.question === q.question);
        if (globalIdx === -1) return; // skip if not found
        const answer = responses[globalIdx];
        // Fix: Only score if answer is a string and a valid option
        if (typeof answer !== 'string' || !(answer in optionScores)) return;
        let score = optionScores[answer];
        if (reverse_scored_items.includes(q.question)) {
          score = reverseScore(score);
        }
        total += score;
        count++;
      });
      categoryPercentages[category] = count === 0 ? 0 : Math.round((total / (count * 4)) * 100);
    });
    return categoryPercentages;
  };

  const saveAssessmentToDatabase = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
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
        throw error;
      }

      console.log("Assessment saved successfully:", results);
      return results;
    } catch (error) {
      console.error("Error saving assessment:", error);
      toast({
        title: "Save Error",
        description: "Failed to save assessment. Results will still be displayed.",
        variant: "destructive",
      });
      // Return calculated results even if save fails
      return calculateResults();
    }
  };

  const handleNext = async () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setLoading(true);
      
      try {
        const results = await saveAssessmentToDatabase();
        
        toast({
          title: "Assessment Complete!",
          description: "Your responses have been recorded successfully.",
        });
        
        if (onComplete) {
          onComplete({ responses, results });
        }
      } catch (error) {
        console.error("Error completing assessment:", error);
        toast({
          title: "Completion Error",
          description: "There was an issue completing your assessment. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
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
      return true; // Optional question
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
            <div className="w-full">
              <ProfanityFilteredInput
                as="textarea"
                value={responses[currentStep] || ""}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
                  handleResponse(e.target.value)
                }
                placeholder="Please share your thoughts..."
                className="min-h-[120px] w-full"
              />
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0 || loading}
        >
          ← Back
        </Button>
        <Button
          onClick={handleNext}
          className="bg-teal-500 hover:bg-teal-600"
          disabled={loading || (currentQuestion.type !== "textarea" && !isCurrentQuestionAnswered())}
        >
          {loading ? (
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
