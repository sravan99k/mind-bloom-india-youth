
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SchoolOverview from "@/components/SchoolOverview";
import StudentMetrics from "@/components/StudentMetrics";

const SchoolDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              School Mental Health Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Monitor and support student mental health across your institution.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <SchoolOverview />
            </div>
            <div>
              <StudentMetrics />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SchoolDashboard;
