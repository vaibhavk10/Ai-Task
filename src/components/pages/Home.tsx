import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import { Bot, X, Send } from "lucide-react";

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

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      { text: message, isBot: false, timestamp: new Date() },
    ]);

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "I'm here to help! Let me know what you need assistance with.",
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    }, 1000);

    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Task Dashboard</h1>
        
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Performance Metrics</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">Day</Button>
            <Button variant="outline" size="sm">Week</Button>
            <Button variant="outline" size="sm">Month</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm text-gray-500 mb-2">Completion Rate</h3>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">85%</p>
              <span className="text-green-500 text-sm">↑ 12% vs last week</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm text-gray-500 mb-2">Tasks Completed</h3>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">24</p>
              <span className="text-green-500 text-sm">↑ 8% vs last week</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm text-gray-500 mb-2">Avg. Completion Time</h3>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">2.5 days</p>
              <span className="text-red-500 text-sm">↓ 5% vs last week</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm text-gray-500 mb-2">Productivity Score</h3>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">92/100</p>
              <span className="text-green-500 text-sm">↑ 15% vs last week</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Task Completion Progress</h2>
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">High Priority Tasks</span>
              <span className="text-sm text-gray-500">80%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-blue-600 rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Medium Priority Tasks</span>
              <span className="text-sm text-gray-500">65%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-blue-600 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Low Priority Tasks</span>
              <span className="text-sm text-gray-500">90%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
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
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-indigo-600 rounded-full p-2 mr-2">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-medium">AI Assistant</h3>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsAIOpen(false)}
                className="hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="h-[300px] overflow-y-auto mb-4 bg-gray-50 rounded p-3 space-y-4">
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
                        ? 'bg-white shadow-sm'
                        : 'bg-indigo-600 text-white'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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