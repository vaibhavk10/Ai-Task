import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "./components/layout/DashboardLayout";
import Home from "./components/pages/Home";
import Tasks from "./components/pages/Tasks";
import Calendar from "./components/pages/Calendar";
import Team from "./components/pages/Team";
import Settings from "./components/pages/Settings";
import Help from "./components/pages/Help";
import Login from "./components/pages/Login";
import AuthCallback from "./components/pages/AuthCallback";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          
          {/* Protected Routes with Layout */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/team" element={<Team />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
