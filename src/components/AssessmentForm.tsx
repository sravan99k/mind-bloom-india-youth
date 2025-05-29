
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const AssessmentForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const assessmentAreas = [
    {
      title: "What to Expect",
      type: "info",
      content: {
        areas: ["Stress levels", "Depression symptoms", "Eating behaviors and body image", "Behavioral patterns"],
        timeRequired: "The assessment takes approximately 5-10 minutes to complete."
      }
    },
    {
      title: "Privacy Information",
      type: "info",
      content: {
        privacy: [
          "Shared only with authorized school counselors",
          "Used to provide personalized support and resources",
          "Stored securely with restricted access",
          "Never shared with other students or unauthorized personnel"
        ]
      }
    },
    {
      title: "Stress Assessment",
      type: "questions",
      questions: [
        "I feel overwhelmed by my emotions",
        "I often feel anxious",
        "I often feel lonely or tearful"
      ]
    }
  ];

  const options = ["Never", "Rarely", "Sometimes", "Often", "Always"];

  const handleNext = () => {
    if (currentStep < assessmentAreas.length - 1) {
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

  const progress = ((currentStep + 1) / assessmentAreas.length) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">
            {assessmentAreas[currentStep].title}
          </h2>
          <span className="text-sm text-gray-500">
            Step {currentStep + 1} of {assessmentAreas.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{assessmentAreas[currentStep].title}</CardTitle>
        </CardHeader>
        <CardContent>
          {assessmentAreas[currentStep].type === "info" ? (
            <div className="space-y-6">
              {assessmentAreas[currentStep].content.areas && (
                <div>
                  <h4 className="font-medium mb-3">Assessment Areas</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    {assessmentAreas[currentStep].content.areas.map((area, index) => (
                      <li key={index}>{area}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {assessmentAreas[currentStep].content.timeRequired && (
                <div>
                  <h4 className="font-medium mb-3">Time Required</h4>
                  <p className="text-gray-600">{assessmentAreas[currentStep].content.timeRequired}</p>
                </div>
              )}

              {assessmentAreas[currentStep].content.privacy && (
                <div>
                  <h4 className="font-medium mb-3">Your responses are confidential and will be handled with care. The assessment results are:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    {assessmentAreas[currentStep].content.privacy.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {assessmentAreas[currentStep].questions?.map((question, qIndex) => (
                <div key={qIndex} className="space-y-4">
                  <h4 className="font-medium text-gray-900">{question}</h4>
                  <RadioGroup
                    value={responses[`${currentStep}-${qIndex}`] || ""}
                    onValueChange={(value) => 
                      setResponses(prev => ({ ...prev, [`${currentStep}-${qIndex}`]: value }))
                    }
                  >
                    <div className="flex flex-wrap gap-4">
                      {options.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`${currentStep}-${qIndex}-${option}`} />
                          <Label htmlFor={`${currentStep}-${qIndex}-${option}`} className="text-sm">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              ))}
            </div>
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
          className="bg-blue-500 hover:bg-blue-600"
        >
          {currentStep === assessmentAreas.length - 1 ? "Complete Assessment" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default AssessmentForm;
