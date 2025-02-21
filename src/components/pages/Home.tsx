import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import { Bot, X, Send, Loader2 } from "lucide-react";
import { aiService } from "@/services/aiService";
import { useTasks } from "@/contexts/TaskContext";

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Home = () => {
  const { user } = useAuth();
  const [isAIOpen, setIsAIOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm your AI assistant. How can I help you with your tasks today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const { tasks } = useTasks();
  const [isAiTyping, setIsAiTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      { text: message, isBot: false, timestamp: new Date() },
    ]);

    setMessage("");
    setIsAiTyping(true);

    try {
      // Get AI response
      const aiResponse = await aiService.generateResponse(message, tasks);
      
      setMessages((prev) => [
        ...prev,
        {
          text: aiResponse,
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("AI Response Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "I apologize, but I'm having trouble processing your request right now.",
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsAiTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="text-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Task Dashboard</h1>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Performance Metrics</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="dark:border-gray-700 dark:text-gray-300">Day</Button>
            <Button variant="outline" size="sm" className="dark:border-gray-700 dark:text-gray-300">Week</Button>
            <Button variant="outline" size="sm" className="dark:border-gray-700 dark:text-gray-300">Month</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Completion Rate</h3>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">85%</p>
              <span className="text-green-500 text-sm">↑ 12% vs last week</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Tasks Completed</h3>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">24</p>
              <span className="text-green-500 text-sm">↑ 8% vs last week</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Avg. Completion Time</h3>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">2.5 days</p>
              <span className="text-red-500 text-sm">↓ 5% vs last week</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Productivity Score</h3>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">92/100</p>
              <span className="text-green-500 text-sm">↑ 15% vs last week</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Task Completion Progress</h2>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">High Priority Tasks</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">80%</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div className="h-2 bg-blue-600 rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Medium Priority Tasks</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">65%</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div className="h-2 bg-blue-600 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Low Priority Tasks</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">90%</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div className="h-2 bg-blue-600 rounded-full" style={{ width: '90%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <KanbanBoard />
      </div>

      {/* AI Assistant */}
      {isAIOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-full max-w-[320px] sm:max-w-[380px]">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-indigo-600 rounded-full p-2 mr-2">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">AI Assistant</h3>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsAIOpen(false)}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="h-[300px] overflow-y-auto mb-4 bg-gray-50 dark:bg-gray-900 rounded p-3 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start ${
                    msg.isBot ? '' : 'flex-row-reverse'
                  }`}
                >
                  {msg.isBot && (
                    <div className="bg-indigo-600 rounded-full p-1 mr-2 flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`px-3 py-2 rounded-lg max-w-[80%] ${
                      msg.isBot
                        ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                        : 'bg-indigo-600 text-white'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isAiTyping && (
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4 text-indigo-600" />
                  <div className="flex items-center space-x-1">
                    <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
                    <span className="text-sm text-gray-500">AI is typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMessage("What are my tasks for today?")}
                className="text-xs"
              >
                Today's Tasks
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMessage("Show me high priority tasks")}
                className="text-xs"
              >
                High Priority
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMessage("When is my next deadline?")}
                className="text-xs"
              >
                Next Deadline
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 p-2 border dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* AI Toggle Button (shown when AI is closed) */}
      {!isAIOpen && (
        <Button
          onClick={() => setIsAIOpen(true)}
          className="fixed bottom-4 right-4 z-50 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-3 shadow-lg"
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default Home; 