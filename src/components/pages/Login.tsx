import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Bot, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error, data } = await signUp(email, password);
        if (error) throw error;
        
        const { error: updateError } = await supabase.auth.updateUser({
          data: { full_name: name }
        });

        if (updateError) throw updateError;
        
        setEmail("");
        setPassword("");
        setName("");
        setIsSignUp(false);
        setIsVerificationSent(true);
        
        toast({
          title: "Account created successfully!",
          description: "Please verify your email to login.",
          duration: 5000,
        });
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
        
        toast({
          title: "Welcome back!",
          description: "Successfully signed in.",
        });
        navigate("/");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.message || "An error occurred during authentication",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setIsSignUp(!isSignUp);
    setIsVerificationSent(false);
  };

  const VerificationView = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 via-white to-indigo-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <Bot className="h-12 w-12 text-indigo-600 mx-auto" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Check Your Email
        </h2>
        <p className="text-gray-600 mb-6">
          We've sent a verification link to your email address. 
          Please check your inbox and click the link to verify your account.
        </p>
        <p className="text-sm text-gray-500 mb-8">
          Once verified, you can log in to your account.
        </p>
        <Button
          onClick={() => {
            setIsVerificationSent(false);
            setIsSignUp(false);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white w-full"
        >
          Return to Login
        </Button>
      </div>
    </div>
  );

  if (isVerificationSent) {
    return <VerificationView />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 via-white to-indigo-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Bot className="h-12 w-12 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AI Task Manager
          </h1>
          <p className="text-gray-500">
            Intelligent task management powered by AI
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h2>
            <Sparkles className="h-5 w-5 text-indigo-600" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (  
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11 rounded-lg"
                  placeholder="Enter your full name"
                  required={isSignUp}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 rounded-lg"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 rounded-lg"
                placeholder="Enter your password"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Sparkles className="h-4 w-4 mr-2" />
              )}
              {isLoading
                ? "Processing..."
                : isSignUp
                ? "Create Account"
                : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={resetForm}
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-center text-sm text-gray-500">
              By continuing, you agree to our{" "}
              <a href="#" className="text-indigo-600 hover:text-indigo-700">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-indigo-600 hover:text-indigo-700">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </motion.div>

      {/* AI Features Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-md"
        >
          <div className="text-indigo-600 mb-4">
            <Bot className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Smart Task Analysis</h3>
          <p className="text-gray-500 text-sm">
            AI-powered insights to optimize your task management
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-md"
        >
          <div className="text-indigo-600 mb-4">
            <Sparkles className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Intelligent Prioritization</h3>
          <p className="text-gray-500 text-sm">
            Let AI help you prioritize tasks effectively
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-md"
        >
          <div className="text-indigo-600 mb-4">
            <Bot className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Automated Workflows</h3>
          <p className="text-gray-500 text-sm">
            Streamline your processes with AI automation
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login; 