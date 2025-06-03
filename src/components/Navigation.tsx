
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, ClipboardList, School, BookOpen, User, LogOut, Settings, Bell, Users, BarChart3, FileText } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Navigation = () => {
  const location = useLocation();
  const { user, loading } = useAuth();
  const { toast } = useToast();

  // Mock user type detection - in real app, this would come from user profile/role
  const isSchoolAdmin = user?.email?.includes('school') || user?.email?.includes('admin');

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Assessment", path: "/assessment", icon: ClipboardList },
    { name: "School Dashboard", path: "/school-dashboard", icon: School },
    { name: "Resources", path: "/resources", icon: BookOpen },
  ];

  const studentMenuItems = [
    { name: "My Dashboard", path: "/student-dashboard", icon: BarChart3 },
    { name: "My Assessments", path: "/assessment", icon: ClipboardList },
    { name: "Profile Settings", path: "/profile", icon: Settings },
    { name: "Help & Support", path: "/help", icon: User },
  ];

  const schoolMenuItems = [
    { name: "School Dashboard", path: "/school-dashboard", icon: School },
    { name: "Student Management", path: "/students", icon: Users },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
    { name: "Reports", path: "/reports", icon: FileText },
    { name: "Alerts & Notifications", path: "/alerts", icon: Bell },
    { name: "School Settings", path: "/school-settings", icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getUserInitials = () => {
    if (!user?.email) return "U";
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">NovoHealth</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`flex items-center space-x-2 ${
                      isActive 
                        ? "bg-teal-500 text-white hover:bg-teal-600" 
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-2">
            {!loading && (
              <>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="" alt="Profile" />
                          <AvatarFallback className="bg-teal-500 text-white">
                            {getUserInitials()}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64 bg-white border shadow-lg z-50" align="end" forceMount>
                      <div className="flex items-center justify-start gap-2 p-2">
                        <div className="flex flex-col space-y-1 leading-none">
                          <p className="font-medium text-sm">{user.email}</p>
                          <p className="text-xs text-muted-foreground">
                            {isSchoolAdmin ? "School Administrator" : "Student"}
                          </p>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      
                      {isSchoolAdmin ? (
                        <>
                          {schoolMenuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                              <DropdownMenuItem key={item.path} asChild>
                                <Link to={item.path} className="flex items-center space-x-2 w-full">
                                  <Icon className="w-4 h-4" />
                                  <span>{item.name}</span>
                                </Link>
                              </DropdownMenuItem>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          {studentMenuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                              <DropdownMenuItem key={item.path} asChild>
                                <Link to={item.path} className="flex items-center space-x-2 w-full">
                                  <Icon className="w-4 h-4" />
                                  <span>{item.name}</span>
                                </Link>
                              </DropdownMenuItem>
                            );
                          })}
                        </>
                      )}
                      
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                        <LogOut className="w-4 h-4 mr-2" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link to="/auth">
                    <Button size="sm" className="bg-teal-500 hover:bg-teal-600">
                      <User className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
