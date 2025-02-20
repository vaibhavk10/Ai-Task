import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar } from "@/components/ui/avatar";
import {
  Home,
  ListTodo,
  Calendar,
  Users,
  Settings,
  HelpCircle,
  Sun,
  Moon,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  className?: string;
  user?: {
    name: string;
    email: string;
    avatar: string;
  };
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
}

const Sidebar = ({
  className,
  isDarkMode = false,
  onThemeToggle = () => {},
}: Omit<SidebarProps, 'user'>) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut, user } = useAuth();

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';

  const navigationItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: ListTodo, label: "Tasks", href: "/tasks" },
    { icon: Calendar, label: "Calendar", href: "/calendar" },
    { icon: Users, label: "Team", href: "/team" },
    { icon: Settings, label: "Settings", href: "/settings" },
    { icon: HelpCircle, label: "Help", href: "/help" },
  ];

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className={cn(
      "flex flex-col h-full w-full bg-white dark:bg-gray-900 p-4",
      "text-gray-900 dark:text-gray-100",
      className
    )}>
      {/* User Profile Section */}
      <div className="flex items-center space-x-3 mb-8 p-2">
        <Avatar className="h-10 w-10">
          <img 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`} 
            alt={userName} 
            className="object-cover" 
          />
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-sm text-gray-900 dark:text-white">{userName}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        {navigationItems.map((item) => (
          <TooltipProvider key={item.label}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={location.pathname === item.href ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start text-sm font-medium",
                    location.pathname === item.href 
                      ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white" 
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                  )}
                  onClick={() => handleNavigation(item.href)}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </nav>

      {/* Theme Toggle */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          onClick={onThemeToggle}
        >
          {isDarkMode ? (
            <>
              <Sun className="h-5 w-5 mr-3" />
              Light Mode
            </>
          ) : (
            <>
              <Moon className="h-5 w-5 mr-3" />
              Dark Mode
            </>
          )}
        </Button>
      </div>

      {/* Sign Out Button */}
      <div className="border-t border-gray-200 pt-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={handleSignOut}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Sign out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
