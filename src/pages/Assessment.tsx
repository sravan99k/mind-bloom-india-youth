
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AssessmentForm from "@/components/AssessmentForm";

const Assessment = () => {
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
          <AssessmentForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Assessment;
