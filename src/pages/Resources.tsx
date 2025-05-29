
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ResourceGrid from "@/components/ResourceGrid";

const Resources = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Mental Health Resources
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our collection of age-appropriate resources designed to help students understand and 
              improve their mental wellbeing.
            </p>
          </div>
          <ResourceGrid />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Resources;
