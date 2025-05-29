
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-teal-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Your Mental Health{" "}
              <span className="text-blue-600">Matters</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              A safe space for students in grades 6-10 to understand, track, 
              and improve their mental wellbeing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/assessment">
                <Button 
                  size="lg" 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium"
                >
                  Take Assessment
                </Button>
              </Link>
              <Link to="/resources">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-lg font-medium"
                >
                  View Resources
                </Button>
              </Link>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <p className="text-sm text-blue-800">
                🔒 <strong>100% Private & Confidential</strong> - Your data is only shared with your school administrators to provide better support.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Students celebrating graduation"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
