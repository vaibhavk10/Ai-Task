import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-[280px] bg-white border-r border-gray-200">
        <Sidebar 
          isDarkMode={isDarkMode} 
          onThemeToggle={() => setIsDarkMode(!isDarkMode)} 
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[280px]">
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout; 