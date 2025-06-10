
import React from "react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Heart, BookOpen, BarChart3, Users, User, Settings, LogOut, Home, Brain } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Navigation = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      window.location.href = "/";
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getUserName = () => {
    return user?.user_metadata?.name || user?.demographics?.name || "User";
  };

  const getInitials = () => {
    const name = getUserName();
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const isManagement = user?.role === 'management';

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-teal-500" />
              <span className="text-xl font-bold text-gray-900">NovoHealth</span>
            </div>
          </div>

          {/* Navigation Menu */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a href="/" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    <Home className="h-4 w-4 mr-2" />
                    Home
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {user && (
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <a href="/assessment" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                      <Brain className="h-4 w-4 mr-2" />
                      Assessment
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}

              {user && !isManagement && (
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <a href="/wellness-dashboard" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                      <Heart className="h-4 w-4 mr-2" />
                      Wellness
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a href="/resources" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Resources
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {user && (
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <a href="/progress-tracking" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Progress
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}

              {user && (
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-white">
                    <Users className="h-4 w-4 mr-2" />
                    Dashboard
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[200px] p-2">
                      {!isManagement && (
                        <NavigationMenuLink asChild>
                          <a href="/student-dashboard" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900">
                            Student Dashboard
                          </a>
                        </NavigationMenuLink>
                      )}
                      {isManagement && (
                        <NavigationMenuLink asChild>
                          <a href="/school-dashboard" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900">
                            School Dashboard
                          </a>
                        </NavigationMenuLink>
                      )}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Side - Auth & Profile */}
          <div className="flex items-center space-x-4">
            {user ? (
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-white">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {getInitials()}
                        </div>
                        <span className="text-sm font-medium">{getUserName()}</span>
                      </div>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[200px] p-2">
                        <div className="px-3 py-2 text-sm text-gray-600 border-b">
                          {isManagement ? 'School Management' : 'Student'}
                        </div>
                        <NavigationMenuLink asChild>
                          <a href="/profile-settings" className="flex items-center gap-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900">
                            <Settings className="w-4 h-4" />
                            Personal Settings
                          </a>
                        </NavigationMenuLink>
                        {!isManagement && (
                          <NavigationMenuLink asChild>
                            <a href="/progress-tracking" className="flex items-center gap-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900">
                              <BarChart3 className="w-4 h-4" />
                              Progress Tracking
                            </a>
                          </NavigationMenuLink>
                        )}
                        <button 
                          onClick={handleSignOut}
                          className="flex items-center gap-2 w-full text-left select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 text-red-600"
                        >
                          <LogOut className="w-4 h-4" />
                          Log out
                        </button>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <a href="/auth">
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </a>
                </Button>
                <Button size="sm" asChild>
                  <a href="/auth?action=signup">Sign Up</a>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
