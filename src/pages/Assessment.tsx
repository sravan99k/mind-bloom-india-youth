import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const [assessmentResponses, setAssessmentResponses] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user, loading, error, retry, timedOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading) {
      if (user) {
        if (user.role === 'management') {
          // Redirect management users to dashboard with a message
          navigate('/school-dashboard');
          toast({
            title: 'Access Restricted',
            description: 'School management users cannot take assessments.',
            variant: 'destructive',
          });
        } else {
          setCurrentStep("categories");
        }
      } else {
        setCurrentStep("auth");
      }
    }
  }, [user, loading, navigate, toast]);

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

  const handleAssessmentComplete = (data: any) => {
    setIsProcessing(true);
    setTimeout(() => {
      setAssessmentResults(data.results);
      setAssessmentResponses(data.responses);
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

  if (error || timedOut) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-2xl mb-4">{error || 'Something went wrong.'}</div>
          <button
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full font-semibold shadow transition-all"
            onClick={retry}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
                <div className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Mental Health Assessment</h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Select the areas you'd like to assess. Your responses are confidential and help us understand your wellbeing.
              </p>
            </div>
            {/* Motivational Illustration and Quote */}
            <div className="flex flex-col items-center justify-center mb-8">
              {/* Simple SVG illustration for mental wellness */}
              <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="60" cy="40" rx="55" ry="30" fill="#E0F7FA" />
                <circle cx="60" cy="40" r="22" fill="#80DEEA" />
                <path d="M60 25 Q65 35 60 55 Q55 35 60 25" stroke="#00838F" strokeWidth="2" fill="none" />
                <circle cx="54" cy="38" r="2" fill="#00838F" />
                <circle cx="66" cy="38" r="2" fill="#00838F" />
                <path d="M56 48 Q60 52 64 48" stroke="#00838F" strokeWidth="2" fill="none" />
              </svg>
              <div className="mt-2 text-teal-700 text-base italic max-w-md text-center">
                "Taking care of your mind is the first step to unlocking your true potential."
              </div>
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
                <div className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AssessmentResults 
              userResponses={assessmentResponses} 
              categories={selectedCategories}
              results={assessmentResults}
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
