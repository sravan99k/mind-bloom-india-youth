
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AuthForm from "@/components/AuthForm";
import DemographicsForm from "@/components/DemographicsForm";
import AssessmentCategorySelection from "@/components/AssessmentCategorySelection";
import AssessmentForm from "@/components/AssessmentForm";
import { useAuth } from "@/hooks/useAuth";

const Assessment = () => {
  const [currentStep, setCurrentStep] = useState("auth");
  const [demographicsData, setDemographicsData] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user && currentStep === "auth") {
        setCurrentStep("demographics");
      } else if (!user && currentStep !== "auth") {
        setCurrentStep("auth");
      }
    }
  }, [user, loading, currentStep]);

  const handleAuthComplete = () => {
    setCurrentStep("demographics");
  };

  const handleDemographicsComplete = (data: any) => {
    setDemographicsData(data);
    setCurrentStep("categories");
  };

  const handleCategorySelect = (categories: string[]) => {
    setSelectedCategories(categories);
    setCurrentStep("assessment");
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

  if (currentStep === "demographics") {
    return <DemographicsForm onComplete={handleDemographicsComplete} />;
  }

  if (currentStep === "categories") {
    return <AssessmentCategorySelection onCategorySelect={handleCategorySelect} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Mental Health Assessment
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              This assessment will help you understand your mental wellbeing across different areas. 
              All responses are confidential and only shared with authorized school counselors.
            </p>
          </div>
          <AssessmentForm selectedCategories={selectedCategories} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Assessment;
