import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import KanbanBoard from "@/components/kanban/KanbanBoard";

const Tasks = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tasks</h1>
        
      </div>
      <KanbanBoard />
    </div>
  );
};

export default Tasks; 