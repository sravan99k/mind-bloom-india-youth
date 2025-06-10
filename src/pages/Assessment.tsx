
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AssessmentCategorySelection from "@/components/AssessmentCategorySelection";
import AssessmentForm from "@/components/AssessmentForm";
import AssessmentResults from "@/components/AssessmentResults";
import { useAuth } from "@/hooks/useAuth";

const Assessment = () => {
  const { user, loading } = useAuth();
  const [currentStep, setCurrentStep] = useState<'selection' | 'form' | 'results'>('selection');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [assessmentResults, setAssessmentResults] = useState<any>(null);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to auth page if user is not authenticated
  if (!user && !loading) {
    return <Navigate to="/auth" replace />;
  }

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
