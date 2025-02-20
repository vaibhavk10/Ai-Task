import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Task, taskService } from "@/services/taskService";
import TaskCard from "./TaskCard";
import TaskCreationDialog from "./TaskCreationDialog";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const tasks = await taskService.getTasks();
      const newColumns = [
        {
          id: "todo",
          title: "To Do",
          tasks: tasks.filter((task) => task.status === "todo"),
        },
        {
          id: "in-progress",
          title: "In Progress",
          tasks: tasks.filter((task) => task.status === "in-progress"),
        },
        {
          id: "completed",
          title: "Completed",
          tasks: tasks.filter((task) => task.status === "completed"),
        },
      ];
      setColumns(newColumns);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load tasks.",
      });
    }
  };

  const handleUpdateTask = async (id: string, updates: Partial<Task>) => {
    try {
      await taskService.updateTask(id, updates);
      await loadTasks(); // Reload tasks after update
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      await loadTasks(); // Reload tasks after deletion
    } catch (error) {
      throw error;
    }
  };

  const handleCreateTask = async (
    task: Omit<Task, "id" | "created_by" | "comments_count">
  ) => {
    try {
      await taskService.createTask(task);
      await loadTasks();
      toast({
        title: "Success",
        description: "Task created successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create task",
      });
    }
  };

  const onDragEnd = async (result: any) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (source.droppableId !== destination.droppableId) {
      // Update task status in database
      await handleUpdateTask(draggableId, { status: destination.droppableId });
      await loadTasks();
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Task Dashboard</h1>
        <Button 
          onClick={() => setIsCreatingTask(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4">
          {columns.map((column) => (
            <div key={column.id} className="w-80">
              <h2 className="font-semibold mb-4">{column.title}</h2>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-4"
                  >
                    {column.tasks.map((task, index) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onUpdate={handleUpdateTask}
                        onDelete={handleDeleteTask}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      <TaskCreationDialog
        open={isCreatingTask}
        onOpenChange={setIsCreatingTask}
        onTaskCreate={handleCreateTask}
      />
    </div>
  );
};

export default KanbanBoard;
