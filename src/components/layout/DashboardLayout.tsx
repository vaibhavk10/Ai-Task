import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useTheme } from "@/contexts/ThemeContext";

const DashboardLayout = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-[280px] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
        <Sidebar 
          isDarkMode={theme === 'dark'} 
          onThemeToggle={toggleTheme} 
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[280px]">
        <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout; 