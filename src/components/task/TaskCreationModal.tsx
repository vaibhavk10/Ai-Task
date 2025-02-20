import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskCreationModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: any) => void;
  loading?: boolean;
  aiSuggestions?: {
    deadline: Date;
    subtasks: string[];
  };
}

const TaskCreationModal = ({
  open = true,
  onOpenChange = () => {},
  onSubmit = () => {},
  loading = false,
  aiSuggestions = {
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    subtasks: [
      "Research existing solutions",
      "Create initial draft",
      "Review with team",
    ],
  },
}: TaskCreationModalProps) => {
  const [date, setDate] = React.useState<Date | undefined>(
    aiSuggestions.deadline,
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Create New Task
            <Sparkles className="h-5 w-5 text-blue-500" />
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              placeholder="Enter task title"
              className="col-span-3"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your task..."
              className="col-span-3 h-24"
            />
          </div>

          <div className="grid gap-2">
            <Label>Deadline</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid gap-2">
            <Label>AI-Suggested Subtasks</Label>
            <div className="space-y-2">
              {aiSuggestions.subtasks.map((subtask, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 rounded-md bg-slate-50"
                >
                  <span className="text-sm text-slate-600">{subtask}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={() =>
              onSubmit({
                title: document.getElementById("title").value,
                description: document.getElementById("description").value,
                date,
              })
            }
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskCreationModal;
