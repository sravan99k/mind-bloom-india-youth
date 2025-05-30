
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface AssessmentFormProps {
  selectedCategories: string[];
}

const AssessmentForm = ({ selectedCategories }: AssessmentFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const { toast } = useToast();

  const assessmentQuestions = {
    depression: [
      {
        question: "I often feel lonely or tearful",
        type: "radio",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      },
      {
        question: "I feel overwhelmed by my emotions",
        type: "radio",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      },
      {
        question: "I have felt hopeless or helpless recently",
        type: "radio",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      },
      {
        question: "I feel like life is not worth living",
        type: "radio",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      },
      {
        question: "I have thoughts of hurting myself",
        type: "radio",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      },
      {
        question: "When feeling low, I prefer:",
        type: "radio",
        options: ["Talking to friends", "Talking to parents", "Talking to teachers", "Solving on my own", "Ignoring the feelings", "Waiting for things to improve"]
      },
      {
        question: "I usually cope with stress by:",
        type: "radio",
        options: ["Yoga or meditation", "Changing the way I think", "Writing a diary", "Watching TV", "Helping others"]
      },
      {
        question: "I have people I can talk to about my feelings",
        type: "radio",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      }
    ],
    stress: [
      {
        question: "I feel anxious due to:",
        type: "checkbox",
        options: ["Studies", "Exams", "Results", "College admissions", "Career"]
      },
      {
        question: "I often feel anxious",
        type: "radio",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      },
      {
        question: "I feel hopeful during stressful situations",
        type: "radio",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      },
      {
        question: "I usually cope with stress by:",
        type: "radio",
        options: ["Yoga or meditation", "Changing the way I think", "Writing a diary", "Watching TV", "Helping others"]
      },
      {
        question: "I eat even when I'm not hungry due to stress or emotions",
        type: "radio",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      },
      {
        question: "I overeat when stressed",
        type: "radio",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      }
    ],
    adhd: [
      {
        question: "I often find it difficult to stay focused during class",
        type: "radio",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      },
      {
        question: "I have trouble finishing assignments or tasks on time",
        type: "radio",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      },
      {
        question: "I frequently forget things like assignments, books, or my personal items",
        type: "radio",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      },
      {
        question: "I get distracted easily, even by things that aren't part of the task at hand",
        type: "radio",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      },
      {
        question: "I often find myself daydreaming or thinking about unrelated things when I should be focusing",
        type: "radio",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      },
      {
        question: "I have trouble sitting still or staying in one place for a long time",
        type: "radio",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      },
      {
        question: "I talk or move around excessively, even when it's not appropriate",
        type: "radio",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      },
      {
        question: "I tend to act impulsively, without thinking about the consequences",
        type: "radio",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      },
      {
        question: "I often interrupt others or have trouble waiting for my turn during conversations",
        type: "radio",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      },
      {
        question: "I struggle with organizing tasks or managing my time effectively",
        type: "radio",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      },
      {
        question: "I often feel restless or find it hard to relax, even when I should be resting",
        type: "radio",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      },
      {
        question: "When I'm asked to complete a task, I often start it but don't finish it",
        type: "radio",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      },
      {
        question: "Do you often lose things necessary for tasks (e.g., books, pencils, assignments)?",
        type: "radio",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      }
    ],
    wellbeing: [
      {
        question: "I am able to quickly adapt to changes in life",
        type: "radio",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      },
      {
        question: "I trust others easily",
        type: "radio",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      },
      {
        question: "I feel satisfied with my personal life",
        type: "radio",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      },
      {
        question: "I feel satisfied with my school life",
        type: "radio",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      },
      {
        question: "I feel responsible for doing well in my life",
        type: "radio",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      },
      {
        question: "I feel confident about my body image",
        type: "radio",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      },
      {
        question: "I can understand and respect others' viewpoints",
        type: "radio",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      },
      {
        question: "I hesitate to ask questions in class",
        type: "radio",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      },
      {
        question: "I find it difficult to initiate conversations",
        type: "radio",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      },
      {
        question: "People in my life see me as a happy person",
        type: "radio",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
      }
    ]
  };

  // Build questions array based on selected categories
  const buildQuestionsList = () => {
    let allQuestions: any[] = [];
    
    selectedCategories.forEach(category => {
      if (category === "overall") {
        // Include all questions for overall test
        Object.values(assessmentQuestions).forEach(categoryQuestions => {
          allQuestions = [...allQuestions, ...categoryQuestions];
        });
      } else if (assessmentQuestions[category as keyof typeof assessmentQuestions]) {
        allQuestions = [...allQuestions, ...assessmentQuestions[category as keyof typeof assessmentQuestions]];
      }
    });

    // Add final open-ended question
    allQuestions.push({
      question: "If you want to say something or express your fear, or anything that is harming you, please mention here",
      type: "textarea",
      options: []
    });

    return allQuestions;
  };

  const questions = buildQuestionsList();

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      toast({
        title: "Assessment Complete!",
        description: "Your responses have been recorded. A counselor will review your assessment.",
      });
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

  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentQuestion = questions[currentStep];

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Mental Health Assessment</h2>
          <span className="text-sm text-gray-500">
            Question {currentStep + 1} of {questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg">{currentQuestion.question}</CardTitle>
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
          disabled={currentStep === 0}
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          className="bg-teal-500 hover:bg-teal-600"
        >
          {currentStep === questions.length - 1 ? "Complete Assessment" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default AssessmentForm;
