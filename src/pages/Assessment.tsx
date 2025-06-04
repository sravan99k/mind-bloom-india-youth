
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AuthForm from "@/components/AuthForm";
import AssessmentCategorySelection from "@/components/AssessmentCategorySelection";
import AssessmentForm from "@/components/AssessmentForm";
import AssessmentResults from "@/components/AssessmentResults";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Assessment = () => {
  const [currentStep, setCurrentStep] = useState("auth");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [assessmentResults, setAssessmentResults] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

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
    toast({
      title: "Welcome!",
      description: "Please select assessment categories to begin.",
    });
  };

  const handleCategorySelect = (categories: string[]) => {
    if (categories.length === 0) {
      toast({
        title: "Selection Required",
        description: "Please select at least one assessment category.",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedCategories(categories);
    setCurrentStep("assessment");
    
    toast({
      title: "Categories Selected",
      description: `Starting assessment for: ${categories.join(", ")}`,
    });
  };

  const handleAssessmentComplete = (results: any) => {
    setIsProcessing(true);
    
    // Simulate processing time for better UX
    setTimeout(() => {
      setAssessmentResults(results);
      setCurrentStep("results");
      setIsProcessing(false);
      
      toast({
        title: "Assessment Complete!",
        description: "Your results are ready. Review them below.",
      });
    }, 1500);
  };

  const handleTakeAnotherAssessment = () => {
    setSelectedCategories([]);
    setAssessmentResults(null);
    setCurrentStep("categories");
    
    toast({
      title: "New Assessment",
      description: "Select categories for your new assessment.",
    });
  };

  const handleBackToCategories = () => {
    setCurrentStep("categories");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your session...</p>
        </div>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-500 mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Processing Your Assessment</h2>
          <p className="text-gray-600">
            We're analyzing your responses and calculating your results. This will just take a moment...
          </p>
          <div className="mt-4 bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-teal-500 h-full animate-pulse" style={{ width: '70%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === "auth") {
    return <AuthForm onAuthComplete={handleAuthComplete} />;
  }

  if (currentStep === "categories") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Mental Health Assessment</h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Select the areas you'd like to assess. Your responses are confidential and help us understand your wellbeing.
              </p>
            </div>
            <AssessmentCategorySelection onCategorySelect={handleCategorySelect} />
          </div>
        </div>
        <Footer />
      </div>
    );
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
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
              This assessment will help you understand your mental wellbeing. 
              All responses are confidential and only shared with authorized school counselors.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={handleBackToCategories}
                className="text-teal-600 hover:text-teal-700 text-sm font-medium"
              >
                ← Change Categories
              </button>
              <span className="text-gray-400">|</span>
              <span className="text-sm text-gray-600">
                Categories: {selectedCategories.join(", ")}
              </span>
            </div>
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
