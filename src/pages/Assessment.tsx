
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AuthForm from "@/components/AuthForm";
import AssessmentCategorySelection from "@/components/AssessmentCategorySelection";
import AssessmentForm from "@/components/AssessmentForm";
import AssessmentResults from "@/components/AssessmentResults";
import { useAuth } from "@/hooks/useAuth";

const Assessment = () => {
  const [currentStep, setCurrentStep] = useState("auth");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [assessmentResults, setAssessmentResults] = useState<any>(null);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (user) {
        setCurrentStep("categories");
      } else {
        setCurrentStep("auth");
      }
    }
  }, [user, loading]);

  const handleAuthComplete = () => {
    setCurrentStep("categories");
  };

  const handleCategorySelect = (categories: string[]) => {
    setSelectedCategories(categories);
    setCurrentStep("assessment");
  };

  const handleAssessmentComplete = (results: any) => {
    setAssessmentResults(results);
    setCurrentStep("results");
  };

  const handleTakeAnotherAssessment = () => {
    setSelectedCategories([]);
    setAssessmentResults(null);
    setCurrentStep("categories");
  };

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

  if (currentStep === "auth") {
    return <AuthForm onAuthComplete={handleAuthComplete} />;
  }

  if (currentStep === "categories") {
    return <AssessmentCategorySelection onCategorySelect={handleCategorySelect} />;
  }

  if (currentStep === "results") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AssessmentResults 
              results={assessmentResults} 
              categories={selectedCategories}
              onTakeAnother={handleTakeAnotherAssessment}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {selectedCategories.length === 1 ? 
                `${selectedCategories[0].charAt(0).toUpperCase() + selectedCategories[0].slice(1)} Assessment` :
                "Mental Health Assessment"
              }
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              This assessment will help you understand your mental wellbeing. 
              All responses are confidential and only shared with authorized school counselors.
            </p>
          </div>
          <AssessmentForm 
            selectedCategories={selectedCategories} 
            onComplete={handleAssessmentComplete}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Assessment;
