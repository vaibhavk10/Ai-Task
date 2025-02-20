import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Circle, Clock } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "away" | "offline";
  lastActive?: string;
}

interface Activity {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  task: string;
  timestamp: string;
}

interface TeamPanelProps {
  teamMembers?: TeamMember[];
  recentActivity?: Activity[];
}

const TeamPanel = ({
  teamMembers = [
    {
      id: "1",
      name: "Alice Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
      status: "online",
    },
    {
      id: "2",
      name: "Bob Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
      status: "away",
      lastActive: "5m ago",
    },
    {
      id: "3",
      name: "Carol Williams",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carol",
      status: "offline",
      lastActive: "1h ago",
    },
  ],
  recentActivity = [
    {
      id: "1",
      user: {
        name: "Alice Smith",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
      },
      action: "completed",
      task: "Update dashboard UI",
      timestamp: "2 minutes ago",
    },
    {
      id: "2",
      user: {
        name: "Bob Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
      },
      action: "started",
      task: "API integration",
      timestamp: "15 minutes ago",
    },
    {
      id: "3",
      user: {
        name: "Carol Williams",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carol",
      },
      action: "commented on",
      task: "Bug fix #123",
      timestamp: "1 hour ago",
    },
  ],
}: TeamPanelProps) => {
  const statusColors = {
    online: "bg-green-500",
    away: "bg-yellow-500",
    offline: "bg-gray-500",
  };

  return (
    <Card className="w-[280px] h-full bg-white p-4 flex flex-col">
      <div className="space-y-4">
        {/* Team Members Section */}
        <div>
          <h3 className="text-sm font-semibold mb-3">Team Members</h3>
          <div className="space-y-2">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between py-1"
              >
                <div className="flex items-center space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="relative">
                          <Avatar className="h-8 w-8">
                            <img
                              src={member.avatar}
                              alt={member.name}
                              className="h-full w-full object-cover"
                            />
                          </Avatar>
                          <div
                            className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white ${statusColors[member.status]}`}
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{member.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <span className="text-sm">{member.name}</span>
                </div>
                {member.status !== "online" && (
                  <span className="text-xs text-gray-500">
                    {member.lastActive}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Recent Activity Section */}
        <div className="flex-1">
          <h3 className="text-sm font-semibold mb-3">Recent Activity</h3>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <Avatar className="h-6 w-6">
                      <img
                        src={activity.user.avatar}
                        alt={activity.user.name}
                        className="h-full w-full object-cover"
                      />
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">
                          {activity.user.name}
                        </span>{" "}
                        {activity.action}{" "}
                        <span className="font-medium">{activity.task}</span>
                      </p>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {activity.timestamp}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </Card>
  );
};

export default TeamPanel;
