import React from "react";
import { Avatar } from "@/components/ui/avatar";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  status: "online" | "offline";
  lastActive?: string;
}

const Team = () => {
  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Alice Smith",
      email: "alice@example.com",
      status: "online"
    },
    {
      id: "2",
      name: "Bob Johnson",
      email: "bob@example.com",
      status: "offline",
      lastActive: "5m ago"
    },
    {
      id: "3",
      name: "Carol Williams",
      email: "carol@example.com",
      status: "offline",
      lastActive: "1h ago"
    }
  ];

  return (
    <div className="text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Team</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Team Members</h2>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div 
                key={member.id}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="h-10 w-10">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.email}`}
                      alt={member.name}
                      className="object-cover"
                    />
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{member.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className={`inline-block h-2 w-2 rounded-full mr-2 ${
                    member.status === "online" ? "bg-green-500" : "bg-gray-400"
                  }`} />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {member.status === "online" ? "Online" : member.lastActive}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
