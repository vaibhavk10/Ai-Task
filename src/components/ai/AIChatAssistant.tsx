import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bot, Send, X, Minimize2, Maximize2 } from "lucide-react";

interface Message {
  id: number;
  type: "user" | "ai";
  content: string;
  timestamp: string;
}

interface AIChatAssistantProps {
  isOpen?: boolean;
  onClose?: () => void;
  userName?: string;
  userAvatar?: string;
}

const AIChatAssistant = ({
  isOpen = true,
  onClose = () => {},
  userName = "User",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
}: AIChatAssistantProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "ai",
      content:
        "Hello! I'm your AI assistant. How can I help you with your tasks today?",
      timestamp: new Date().toISOString(),
    },
  ]);

  const handleSend = () => {
    if (input.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        type: "user",
        content: input,
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, newMessage]);
      setInput("");

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: messages.length + 2,
          type: "ai",
          content:
            "I'll help you analyze and prioritize that task. Give me a moment...",
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, aiResponse]);
      }, 1000);
    }
  };

  if (!isOpen) return null;

  return (
    <Card className="fixed bottom-4 right-4 w-[400px] bg-white shadow-lg flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between bg-indigo-600 text-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5" />
          <span className="font-medium">AI Assistant</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:text-white hover:bg-indigo-700"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? (
              <Maximize2 className="h-4 w-4" />
            ) : (
              <Minimize2 className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:text-white hover:bg-indigo-700"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Area */}
          <ScrollArea className="flex-1 h-[400px] p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex items-start space-x-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                  >
                    <Avatar className="h-8 w-8">
                      <img
                        src={
                          message.type === "user"
                            ? userAvatar
                            : "https://api.dicebear.com/7.x/avataaars/svg?seed=ai"
                        }
                        alt={message.type === "user" ? userName : "AI"}
                      />
                    </Avatar>
                    <div
                      className={`p-3 rounded-lg ${message.type === "user" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-900"}`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <Separator />

          {/* Input Area */}
          <div className="p-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
              />
              <Button onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default AIChatAssistant;
