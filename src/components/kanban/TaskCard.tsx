import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Clock, Trash2, Edit, MessageSquare } from "lucide-react";
import { Task } from "@/services/taskService";
import { format } from "date-fns";
import { cn, getPriorityColor } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onUpdate: (id: string, updates: Partial<Task>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const TaskCard = ({ task, onUpdate, onDelete }: TaskCardProps) => {
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedTask, setEditedTask] = React.useState(task);
  const { toast } = useToast();

  const handleUpdate = async () => {
    try {
      await onUpdate(task.id, editedTask);
      setIsEditing(false);
      toast({
        title: "Task updated",
        description: "The task has been updated successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update task.",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(task.id);
      setIsDeleteOpen(false);
      setIsDetailsOpen(false);
      toast({
        title: "Task deleted",
        description: "The task has been deleted successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete task.",
      });
    }
  };

  return (
    <>
      <Card
        className="p-4 cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => setIsDetailsOpen(true)}
      >
        <div className="space-y-2">
          <h3 className="font-medium">{task.title}</h3>
          <p className="text-sm text-gray-500 line-clamp-2">{task.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-xs text-gray-500">
                {format(new Date(task.due_date), "MMM d")}
              </span>
            </div>
            <span className={cn(
              "px-2 py-1 rounded-full text-xs font-medium",
              getPriorityColor(task.priority)
            )}>
              {task.priority}
            </span>
          </div>
        </div>
      </Card>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Task" : task.title}
            </DialogTitle>
          </DialogHeader>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editedTask.title}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editedTask.description}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, description: e.target.value })
                  }
                />
              </div>
              {/* Add more fields as needed */}
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600">{task.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{format(new Date(task.due_date), "PPP")}</span>
                </div>
                <span className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium",
                  getPriorityColor(task.priority)
                )}>
                  {task.priority}
                </span>
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-between">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit className="h-4 w-4 mr-1" />
                {isEditing ? "Cancel" : "Edit"}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setIsDeleteOpen(true)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
            {isEditing && (
              <Button onClick={handleUpdate}>Save Changes</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TaskCard;
