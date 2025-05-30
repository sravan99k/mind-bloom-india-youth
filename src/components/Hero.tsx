
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Star, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-purple-100 via-blue-50 to-teal-50 py-20 relative overflow-hidden">
      {/* Floating animation elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 animate-bounce delay-0">
          <Star className="w-8 h-8 text-yellow-400 fill-current" />
        </div>
        <div className="absolute top-32 right-20 animate-bounce delay-300">
          <Heart className="w-6 h-6 text-pink-400 fill-current" />
        </div>
        <div className="absolute bottom-40 left-20 animate-bounce delay-700">
          <Sparkles className="w-10 h-10 text-purple-400 fill-current" />
        </div>
        <div className="absolute top-40 right-40 animate-pulse">
          <div className="w-4 h-4 bg-blue-300 rounded-full"></div>
        </div>
        <div className="absolute bottom-60 right-10 animate-pulse delay-500">
          <div className="w-6 h-6 bg-green-300 rounded-full"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
                <Heart className="w-6 h-6 text-white fill-current" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                NovoHealth
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Your Mental Health{" "}
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent animate-pulse">
                Journey
              </span>
              <br />
              Starts Here! 🌟
            </h1>
            
            <p className="text-xl text-gray-700 leading-relaxed font-medium">
              A safe, colorful space for students in grades 6-10 to understand, 
              track, and improve their mental wellbeing with fun activities! 🎨
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/assessment">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse"
                >
                  🚀 Start My Assessment
                </Button>
              </Link>
              <Link to="/resources">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  📚 Explore Resources
                </Button>
              </Link>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6 mt-8 transform hover:scale-105 transition-all duration-300">
              <p className="text-blue-800 font-semibold flex items-center">
                <span className="text-2xl mr-3">🔒</span>
                <span>
                  <strong>100% Private & Safe</strong> - Your information is protected and only shared with school counselors to help you better! 
                </span>
              </p>
            </div>
          </div>
          
          <div className="relative animate-scale-in">
            <div className="relative transform hover:scale-105 transition-all duration-500">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Happy students celebrating"
                className="rounded-3xl shadow-2xl border-4 border-white"
              />
              <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-3 animate-bounce">
                <span className="text-2xl">🎉</span>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-pink-400 rounded-full p-3 animate-bounce delay-300">
                <span className="text-2xl">💝</span>
              </div>
            </div>
            
            {/* Floating cards around the image */}
            <div className="absolute -top-8 left-10 bg-white rounded-xl p-3 shadow-lg animate-float">
              <span className="text-sm font-semibold text-purple-600">😊 Happy Mind</span>
            </div>
            <div className="absolute -bottom-8 right-10 bg-white rounded-xl p-3 shadow-lg animate-float delay-500">
              <span className="text-sm font-semibold text-blue-600">🌈 Bright Future</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
