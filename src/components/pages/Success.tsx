import React from "react";
import { Link } from "react-router-dom";
import { Bot } from "lucide-react";

const Success = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 via-white to-indigo-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <Bot className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Account Created Successfully!
        </h2>
        <p className="text-gray-600 mb-6">
          Please verify your email to log in.
        </p>
        <Link to="/login" className="text-indigo-600 hover:text-indigo-700">
          Return to Login
        </Link>
      </div>
    </div>
  );
};

export default Success; 