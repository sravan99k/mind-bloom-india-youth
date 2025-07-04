import React from "react";

import { useEffect, useState, useMemo, useCallback } from 'react';

import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SearchBar from "@/components/SearchBar";
import { 
  Home, 
  ClipboardList, 
  School, 
  BookOpen, 
  User, 
  LogOut, 
  Settings, 
  Bell, 
  Users, 
  BarChart3, 
  FileText, 
  TrendingUp, 
  Heart, 
  ShieldCheck, 
  Brain, 
  Gamepad2,
  ChevronDown, 
  ChevronRight, 
  ChevronUp, 
  AlertTriangle, 
  MessageSquareWarning, 
  MessageSquare, 
  BellRing 
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface MenuItemProps {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  subItems?: { name: string; path: string; icon?: React.ComponentType<{ className?: string }> }[];
}

const NavItem = ({ 
  item, 
  isActive, 
  isMobile = false,
  onNavigate 
}: { 
  item: MenuItemProps; 
  isActive: boolean; 
  isMobile?: boolean;
  onNavigate?: (e: React.MouseEvent) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const Icon = item.icon;

  const content = (
    <div className={cn(
      "flex items-center justify-between w-full px-4 py-2 text-sm font-medium rounded-md group",
      isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground",
      isMobile ? "py-3" : "py-2"
    )}>
      <div className="flex items-center">
        <Icon className={cn("w-5 h-5 mr-3", isActive ? "text-primary" : "")} />
        <span>{item.name}</span>
      </div>
      
      {item.badge && item.badge > 0 && (
        <Badge variant="destructive" className="ml-2">
          {item.badge}
        </Badge>
      )}
      
      {hasSubItems && (
        <ChevronDown className={cn(
          "w-4 h-4 ml-2 transition-transform duration-200",
          isOpen ? "transform rotate-180" : ""
        )} />
      )}
    </div>
  );

  const handleClick = (e: React.MouseEvent) => {
    if (onNavigate) {
      onNavigate(e);
    }
    
    // Close the mobile menu if open
    const mobileMenu = document.querySelector('[data-state="open"]');
    if (mobileMenu && isMobile) {
      (mobileMenu as HTMLElement).click();
    }
  };

  if (hasSubItems) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild className="w-full">
          <div>
            {content}
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-4 mt-1 space-y-1">
          {item.subItems?.map((subItem) => (
            <Link
              key={subItem.path}
              to={subItem.path}
              className={cn(
                "flex items-center px-4 py-2 text-sm rounded-md",
                isActive ? "bg-accent/50" : "text-muted-foreground hover:bg-accent/30"
              )}
              onClick={handleClick}
            >
              {subItem.icon && (
                <subItem.icon className="w-4 h-4 mr-2" />
              )}
              {subItem.name}
            </Link>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Link 
      to={item.path} 
      className="block" 
      onClick={(e) => {
        if (onNavigate) {
          onNavigate(e);
        }
        
        // Close the mobile menu if open
        const mobileMenu = document.querySelector('[data-state="open"]');
        if (mobileMenu && isMobile) {
          (mobileMenu as HTMLElement).click();
        }
      }}
    >
      {content}
    </Link>
  );
};

const Navigation = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Get user role from auth
  const userRole = user?.role || 'student'; // Default to student view if no role
  
  // Memoize role checks
  const { isManagement, isStudent } = useMemo(() => ({
    isManagement: userRole === 'management',
    isStudent: userRole === 'student' || !userRole
  }), [userRole]);
  
  // Handle navigation with proper role checking
  const handleNavigation = (e: React.MouseEvent, path: string) => {
    // For protected routes, ensure user has the right role
    if (path.startsWith('/school-dashboard') && userRole !== 'management') {
      e.preventDefault();
      toast({
        title: 'Access Denied',
        description: 'You do not have permission to access this page.',
        variant: 'destructive',
      });
      return;
    }
    
    // Don't prevent default for normal navigation
    // This allows the Link component to handle the navigation
  };

  // Memoize nav items to prevent unnecessary re-renders
  const navItems = useMemo(() => {
    const items = [
      { name: "Home", path: "/", icon: Home },
    ];
    
    // Add role-specific items
    if (userRole === 'student' || !userRole) {
      items.push(
        { name: "Wellness", path: "/wellness", icon: Heart },
        { name: "Cognitive Tasks", path: "/cognitive-tasks", icon: Gamepad2 }
      );
    }
    
    if (userRole === 'management') {
      items.push(
        { name: "Dashboard", path: "/school-dashboard", icon: School }
      );
    }
    
    items.push({ name: "Resources", path: "/resources", icon: BookOpen });
    
    return items;
  }, [userRole]);

  // Function to check if a nav item is active
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const studentMenuItems = [
    { name: "My Dashboard", path: "/student-dashboard", icon: BarChart3 },
    { name: "Progress Tracking", path: "/progress-tracking", icon: TrendingUp },
    { name: "My Assessments", path: "/my-assessments", icon: ClipboardList },
    { name: "BuddySafe", path: "/buddysafe", icon: ShieldCheck },
    { name: "Profile Settings", path: "/profile-settings", icon: Settings },
  ];

  const managementMenuItems = [
    { name: "School Dashboard", path: "/school-dashboard", icon: School },
    { name: "Reports", path: "/reports", icon: FileText },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
    { 
      name: "Alerts & Notifications", 
      path: "/alerts", 
      icon: Bell,
      badge: 3, // Example count of unread alerts
      subItems: [
        { 
          name: "High Risk Alerts", 
          path: "/alerts/high-risk",
          icon: AlertTriangle
        },
        { 
          name: "Intervention Updates", 
          path: "/alerts/interventions",
          icon: MessageSquareWarning
        },
        { 
          name: "System Notifications", 
          path: "/alerts/system",
          icon: BellRing
        },
      ]
    },
    { name: "School Settings", path: "/school-settings", icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  // Memoize user data to prevent unnecessary re-renders
  const userInitials = useMemo(() => {
    if (user?.user_metadata?.name) {
      return user.user_metadata.name.charAt(0).toUpperCase();
    }
    if (!user?.email) return "U";
    return user.email.charAt(0).toUpperCase();
  }, [user?.user_metadata?.name, user?.email]);

  const userName = useMemo(() => {
    return user?.user_metadata?.name || user?.email || "User";
  }, [user?.user_metadata?.name, user?.email]);

  // Skip rendering navigation on auth page
  if (location.pathname === '/auth') {
    return null;
  }

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Link to="/">
              <img src="/logo.png" alt="NovoHealth Logo" className="h-28 w-auto object-contain mr-10 cursor-pointer" />
            </Link>
          </div>
          {/* Mobile menu */}
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={(e) => handleNavigation(e, item.path)}
                    className={`flex items-center px-4 py-3 text-base font-medium rounded-md mx-2 ${
                      active 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`h-5 w-5 mr-3 ${active ? 'text-blue-600' : ''}`} />
                    <span className={active ? 'font-semibold' : ''}>{item.name}</span>
                    {active && <span className="ml-auto h-2 w-2 rounded-full bg-blue-600"></span>}
                  </Link>
                );
              })}
              
              {!isManagement && (
                <div className="border-t border-gray-200 my-2 pt-2">
                  <Link
                    to="/assessment"
                    className={`flex items-center px-4 py-3 text-base font-medium rounded-md mx-2 ${
                      isActive('/assessment')
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <ClipboardList className={`h-5 w-5 mr-3 ${isActive('/assessment') ? 'text-blue-600' : ''}`} />
                    <span className={isActive('/assessment') ? 'font-semibold' : ''}>Assessment</span>
                    {isActive('/assessment') && <span className="ml-auto h-2 w-2 rounded-full bg-blue-600"></span>}
                  </Link>
                  
                  <Link
                    to="/cognitive-tasks"
                    className={`flex items-center px-4 py-3 text-base font-medium rounded-md mx-2 ${
                      isActive('/cognitive-tasks')
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Brain className={`h-5 w-5 mr-3 ${isActive('/cognitive-tasks') ? 'text-blue-600' : ''}`} />
                    <span className={isActive('/cognitive-tasks') ? 'font-semibold' : ''}>Cognitive Training</span>
                    {isActive('/cognitive-tasks') && <span className="ml-auto h-2 w-2 rounded-full bg-blue-600"></span>}
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={(e) => handleNavigation(e, item.path)}
                  className={`flex items-center px-4 py-2 text-base font-medium rounded-md ${
                    active 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`h-5 w-5 mr-3 ${active ? 'text-blue-600' : ''}`} />
                  <span className={active ? 'font-semibold' : ''}>{item.name}</span>
                  {active && <span className="ml-auto h-2 w-2 rounded-full bg-blue-600"></span>}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-2">
            <SearchBar />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="relative h-8 w-8 rounded-full cursor-pointer p-0"
                    aria-label="User menu"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" alt="Profile" />
                      <AvatarFallback 
                        className="bg-teal-500 text-white cursor-pointer select-none"
                        suppressHydrationWarning
                      >
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 bg-white border shadow-lg z-50 [&>*]:cursor-pointer" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium text-sm">{userName}</p>
                      <p className="text-xs text-muted-foreground">
                        {isManagement ? "School Management" : isStudent ? "Student" : "User"}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  
                  {isManagement ? (
                    <>
                      {managementMenuItems.map((item) => {
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
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/auth">
                  <Button 
                    variant="outline"
                    size="sm" 
                    className="border-teal-500 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/auth?mode=signup">
                  <Button 
                    size="sm" 
                    className="bg-teal-500 hover:bg-teal-600"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
