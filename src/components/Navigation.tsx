
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Menu, X, Heart, User, LogOut, Settings, BarChart3, BookOpen, MessageCircle, Sparkles } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      window.location.href = "/";
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (loading) {
    return (
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-teal-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">NovoHealth</span>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <Heart className="h-8 w-8 text-teal-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">NovoHealth</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <a
                  href="/wellness-dashboard"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  Wellness Hub
                </a>
                <a
                  href="/assessment"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <BarChart3 className="w-4 h-4 mr-1" />
                  Assessment
                </a>
                <a
                  href="/resources"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <BookOpen className="w-4 h-4 mr-1" />
                  Resources
                </a>
                {user.role === 'student' ? (
                  <a
                    href="/student-dashboard"
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <User className="w-4 h-4 mr-1" />
                    Dashboard
                  </a>
                ) : (
                  <a
                    href="/school-dashboard"
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <BarChart3 className="w-4 h-4 mr-1" />
                    School Dashboard
                  </a>
                )}
                <div className="flex items-center space-x-2 border-l pl-4">
                  <a
                    href="/profile-settings"
                    className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-50 rounded-full transition-colors"
                  >
                    <Settings className="w-5 h-5" />
                  </a>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-50 rounded-full"
                  >
                    <LogOut className="w-5 h-5" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <a
                  href="/assessment"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors"
                >
                  Assessment
                </a>
                <a
                  href="/resources"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors"
                >
                  Resources
                </a>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.location.href = "/auth"}
                  className="border-teal-300 text-teal-700 hover:bg-teal-50"
                >
                  Sign In
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-1">
              {user ? (
                <>
                  <a
                    href="/wellness-dashboard"
                    className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Wellness Hub
                  </a>
                  <a
                    href="/assessment"
                    className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Assessment
                  </a>
                  <a
                    href="/resources"
                    className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Resources
                  </a>
                  {user.role === 'student' ? (
                    <a
                      href="/student-dashboard"
                      className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-5 h-5 mr-2" />
                      Dashboard
                    </a>
                  ) : (
                    <a
                      href="/school-dashboard"
                      className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <BarChart3 className="w-5 h-5 mr-2" />
                      School Dashboard
                    </a>
                  )}
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <a
                      href="/profile-settings"
                      className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings className="w-5 h-5 mr-2" />
                      Settings
                    </a>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                    >
                      <LogOut className="w-5 h-5 mr-2" />
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <a
                    href="/assessment"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Assessment
                  </a>
                  <a
                    href="/resources"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Resources
                  </a>
                  <div className="pt-4">
                    <Button
                      variant="outline"
                      className="w-full border-teal-300 text-teal-700 hover:bg-teal-50"
                      onClick={() => {
                        window.location.href = "/auth";
                        setIsMenuOpen(false);
                      }}
                    >
                      Sign In
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
