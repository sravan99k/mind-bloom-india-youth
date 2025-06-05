import React from "react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Heart, BookOpen, BarChart3, Users, User, Settings, LogOut, Home, Brain } from "lucide-react";

const Navigation = () => {
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

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a href="/assessment" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    <Brain className="h-4 w-4 mr-2" />
                    Assessment
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a href="/wellness-dashboard" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    <Heart className="h-4 w-4 mr-2" />
                    Wellness
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a href="/resources" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Resources
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a href="/progress-tracking" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Progress
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-white">
                  <Users className="h-4 w-4 mr-2" />
                  Dashboard
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[200px] p-2">
                    <NavigationMenuLink asChild>
                      <a href="/student-dashboard" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900">
                        Student Dashboard
                      </a>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <a href="/school-dashboard" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900">
                        School Dashboard
                      </a>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Side - Auth & Profile */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <a href="/auth">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </a>
            </Button>
            <Button size="sm" asChild>
              <a href="/auth?action=signup">Sign Up</a>
            </Button>
          </div>

          {/* Mobile menu button - would need state and toggle functionality */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              Menu
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
