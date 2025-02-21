import { Task } from "./taskService";

interface ConversationContext {
  lastQuery: string;
  lastResponse: string;
  lastTaskId?: string;
}

let context: ConversationContext = {
  lastQuery: "",
  lastResponse: "",
  lastTaskId: undefined
};

export const aiService = {
  async generateResponse(message: string, tasks: Task[]) {
    try {
      const lowercaseMessage = message.toLowerCase();
      context.lastQuery = lowercaseMessage;

      // Handle task detail queries
      const taskNumberMatch = lowercaseMessage.match(/task\s*(\d+)/i);
      if (taskNumberMatch || lowercaseMessage.includes("what") && lowercaseMessage.includes("task")) {
        let taskToShow: Task | undefined;

        if (taskNumberMatch) {
          // Find task by number mentioned
          const taskNumber = parseInt(taskNumberMatch[1]);
          taskToShow = tasks[taskNumber - 1];
        } else if (context.lastTaskId) {
          // Find task from context
          taskToShow = tasks.find(t => t.id === context.lastTaskId);
        }

        if (taskToShow) {
          const response = `Task: "${taskToShow.title}"\nDescription: ${taskToShow.description || 'No description available'}\nPriority: ${taskToShow.priority}\nDue Date: ${new Date(taskToShow.due_date).toLocaleDateString()}`;
          context.lastResponse = response;
          context.lastTaskId = taskToShow.id;
          return response;
        }
      }

      // Handle "show" or "list" requests
      if (lowercaseMessage.includes("show") || lowercaseMessage.includes("list") || lowercaseMessage.includes("yes")) {
        if (context.lastResponse.includes("tasks due today")) {
          const todayTasks = tasks.filter(task => {
            const taskDate = new Date(task.due_date).toDateString();
            const today = new Date().toDateString();
            return taskDate === today;
          });
          
          const response = todayTasks.length === 0 
            ? "You have no tasks due today."
            : `Here are your tasks for today:\n${todayTasks.map((task, index) => 
                `${index + 1}. ${task.title} (${task.priority} priority, due: ${new Date(task.due_date).toLocaleDateString()})`
              ).join('\n')}`;
          
          context.lastResponse = response;
          return response;
        }
        
        if (context.lastResponse.includes("high-priority")) {
          const highPriorityTasks = tasks.filter(task => task.priority === "high");
          const response = highPriorityTasks.length === 0
            ? "You have no high-priority tasks at the moment."
            : `Here are your high-priority tasks:\n${highPriorityTasks.map((task, index) => 
                `${index + 1}. ${task.title} (due: ${new Date(task.due_date).toLocaleDateString()})`
              ).join('\n')}`;
          
          context.lastResponse = response;
          return response;
        }
      }

      // Handle deadline query
      if (lowercaseMessage.includes("deadline")) {
        const upcomingTasks = tasks
          .filter(task => new Date(task.due_date) > new Date())
          .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime());
        
        if (upcomingTasks.length > 0) {
          const nextTask = upcomingTasks[0];
          const response = `Your next deadline is for "${nextTask.title}" on ${new Date(nextTask.due_date).toLocaleDateString()}. Would you like to know more about this task?`;
          context.lastResponse = response;
          context.lastTaskId = nextTask.id;
          return response;
        }
        return "You have no upcoming deadlines.";
      }

      // Handle today's tasks query
      if (lowercaseMessage.includes("today")) {
        const todayTasks = tasks.filter(task => {
          const taskDate = new Date(task.due_date).toDateString();
          const today = new Date().toDateString();
          return taskDate === today;
        });
        const response = `You have ${todayTasks.length} tasks due today. Would you like me to list them?`;
        context.lastResponse = response;
        return response;
      }

      // Handle priority tasks query
      if (lowercaseMessage.includes("priority") || lowercaseMessage.includes("urgent")) {
        const highPriorityTasks = tasks.filter(task => task.priority === "high");
        const response = `You have ${highPriorityTasks.length} high-priority tasks. Would you like me to list them?`;
        context.lastResponse = response;
        return response;
      }

      // Handle greetings
      if (lowercaseMessage.includes("hi") || lowercaseMessage.includes("hello")) {
        const response = "Hello! I can help you manage your tasks. Try asking about:\n- Today's tasks\n- High-priority tasks\n- Upcoming deadlines\n- Specific tasks (e.g., 'What is Task 1?')\nWhat would you like to know?";
        context.lastResponse = response;
        return response;
      }

      // Default response
      const response = "I can help you with:\n- Today's tasks\n- High-priority tasks\n- Upcoming deadlines\n- Task details (try 'What is Task 1?')\nWhat would you like to know?";
      context.lastResponse = response;
      return response;
    } catch (error) {
      console.error("AI Service Error:", error);
      return "I'm having trouble processing your request. Please try asking about specific tasks, deadlines, or priorities.";
    }
  }
}; 