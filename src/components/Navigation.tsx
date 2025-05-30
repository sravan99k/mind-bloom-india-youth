
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ClipboardList, School, BookOpen, Heart } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Assessment", path: "/assessment", icon: ClipboardList },
    { name: "School Dashboard", path: "/school-dashboard", icon: School },
    { name: "Resources", path: "/resources", icon: BookOpen },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg border-b-2 border-purple-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          <div className="flex items-center space-x-3 animate-fade-in">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 animate-pulse">
              <Heart className="text-white font-bold text-lg w-6 h-6 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                NovoHealth
              </span>
              <span className="text-xs text-gray-500 font-medium">Your Mental Wellness Friend</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                      isActive 
                        ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:from-purple-600 hover:to-blue-600" 
                        : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          <div className="md:hidden">
            <Link to="/student-dashboard">
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Dashboard ✨
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
