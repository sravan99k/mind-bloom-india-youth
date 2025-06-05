
import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AssessmentCategorySelection from "@/components/AssessmentCategorySelection";
import AssessmentForm from "@/components/AssessmentForm";
import AssessmentResults from "@/components/AssessmentResults";

const Assessment = () => {
  const [currentStep, setCurrentStep] = useState<'selection' | 'form' | 'results'>('selection');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [assessmentResults, setAssessmentResults] = useState<any>(null);

  const handleCategorySelect = (categories: string[]) => {
    setSelectedCategories(categories);
    setCurrentStep('form');
  };

  const handleAssessmentComplete = (results: any) => {
    console.log("Assessment completed with results:", results);
    setAssessmentResults(results);
    setCurrentStep('results');
  };

  const handleTakeAnother = () => {
    setCurrentStep('selection');
    setSelectedCategories([]);
    setAssessmentResults(null);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'selection':
        return <AssessmentCategorySelection onCategorySelect={handleCategorySelect} />;
      case 'form':
        return (
          <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <AssessmentForm 
                selectedCategories={selectedCategories} 
                onComplete={handleAssessmentComplete}
              />
            </div>
          </div>
        );
      case 'results':
        return (
          <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <AssessmentResults 
                results={assessmentResults}
                categories={selectedCategories}
                onTakeAnother={handleTakeAnother}
              />
            </div>
          </div>
        );
      default:
        return <AssessmentCategorySelection onCategorySelect={handleCategorySelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {renderCurrentStep()}
      <Footer />
    </div>
  );
};

export default Assessment;
