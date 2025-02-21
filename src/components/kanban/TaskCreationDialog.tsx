import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Task } from "@/services/taskService";
import { useAuth } from "@/contexts/AuthContext";
import { cn, getPriorityColor } from "@/lib/utils";
import { taskSuggestionService } from "@/services/taskSuggestionService";
import { useTasks } from "@/contexts/TaskContext";
import { Plus } from "lucide-react";

interface TaskCreationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTaskCreate: (task: Omit<Task, "id" | "created_by" | "comments_count">) => Promise<void>;
}

interface TaskSuggestion {
  title: string;
  description: string;
}

const TaskCreationDialog = ({
  open,
  onOpenChange,
  onTaskCreate,
}: TaskCreationDialogProps) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    due_date: new Date().toISOString(),
    assignee_id: "",
  });
  const [suggestions, setSuggestions] = useState<TaskSuggestion[]>([]);
  const { tasks } = useTasks();

  useEffect(() => {
    if (open) {
      loadSuggestions();
    }
  }, [open]);

  const loadSuggestions = async () => {
    const newSuggestions = await taskSuggestionService.getSuggestions(tasks, formData.title);
    setSuggestions(newSuggestions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onTaskCreate({
        ...formData,
        assignee_id: user?.id || "",
      });
      onOpenChange(false);
      setFormData({
        title: "",
        description: "",
        status: "todo",
        priority: "medium",
        due_date: new Date().toISOString(),
        assignee_id: "",
      });
    } catch (error) {
      console.error("Failed to create task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
            
            {/* AI Suggestions */}
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                AI Suggested Tasks:
              </h4>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant="outline"
                    className="w-full justify-start text-left"
                    onClick={(e) => {
                      e.preventDefault();
                      setFormData({
                        ...formData,
                        title: suggestion.title,
                        description: suggestion.description
                      });
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {suggestion.title}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) =>
                  setFormData({ ...formData, priority: value })
                }
              >
                <SelectTrigger>
                  <SelectValue>
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      getPriorityColor(formData.priority)
                    )}>
                      {formData.priority}
                    </span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      getPriorityColor("low")
                    )}>
                      Low
                    </span>
                  </SelectItem>
                  <SelectItem value="medium">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      getPriorityColor("medium")
                    )}>
                      Medium
                    </span>
                  </SelectItem>
                  <SelectItem value="high">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      getPriorityColor("high")
                    )}>
                      High
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.due_date.split('T')[0]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  due_date: new Date(e.target.value).toISOString(),
                })
              }
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskCreationDialog; 