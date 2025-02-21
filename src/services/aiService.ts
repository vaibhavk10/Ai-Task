import { Task } from "./taskService";

interface ConversationContext {
  lastQuery: string;
  lastResponse: string;
}

let context: ConversationContext = {
  lastQuery: "",
  lastResponse: ""
};

export const aiService = {
  async generateResponse(message: string, tasks: Task[]) {
    try {
      const lowercaseMessage = message.toLowerCase();
      context.lastQuery = lowercaseMessage;

      // Handle queries about previous/completed tasks
      if (lowercaseMessage.includes("previous") || lowercaseMessage.includes("completed") || lowercaseMessage.includes("were")) {
        const completedTasks = tasks
          .filter(task => task.status === "completed")
          .sort((a, b) => new Date(b.due_date).getTime() - new Date(a.due_date).getTime())
          .slice(0, 5);

        if (completedTasks.length === 0) {
          return "You don't have any completed tasks yet.";
        }

        return `Here are your recently completed tasks:\n${completedTasks.map((task, index) => 
          `${index + 1}. "${task.title}" (completed on ${new Date(task.due_date).toLocaleDateString()})`
        ).join('\n')}`;
      }

      // Handle "why" questions with a more helpful response
      if (lowercaseMessage.includes("why") || lowercaseMessage.includes("not understand")) {
        return `I apologize if I wasn't clear. I can understand questions about:
1. Upcoming tasks ("what's coming up?", "show upcoming tasks")
2. Today's tasks ("what's due today?", "today's tasks")
3. Previous/completed tasks ("what were my previous tasks?", "show completed tasks")
4. High priority tasks ("show urgent tasks", "high priority items")
5. Specific task details ("tell me about task 1")

How can I help you with these?`;
      }

      // Handle upcoming tasks query with better context
      if (lowercaseMessage.includes("upcoming") || lowercaseMessage.includes("next")) {
        const upcomingTasks = tasks
          .filter(task => new Date(task.due_date) > new Date())
          .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime())
          .slice(0, 5);

        if (upcomingTasks.length === 0) {
          return "You don't have any upcoming tasks scheduled. Would you like to see your completed tasks instead?";
        }

        return `Here are your upcoming tasks:\n${upcomingTasks.map((task, index) => 
          `${index + 1}. "${task.title}" (${task.priority} priority) - Due: ${new Date(task.due_date).toLocaleDateString()}`
        ).join('\n')}\n\nWould you like to know more about any of these tasks?`;
      }

      // Handle today's tasks
      if (lowercaseMessage.includes("today")) {
        const todayTasks = tasks.filter(task => {
          const taskDate = new Date(task.due_date).toDateString();
          const today = new Date().toDateString();
          return taskDate === today;
        });

        if (todayTasks.length === 0) {
          return "You don't have any tasks due today.";
        }

        const response = `Tasks due today:\n${todayTasks.map((task, index) => 
          `${index + 1}. "${task.title}" (${task.priority} priority)`
        ).join('\n')}`;

        context.lastResponse = response;
        return response;
      }

      // Handle priority tasks
      if (lowercaseMessage.includes("priority") || lowercaseMessage.includes("urgent")) {
        const highPriorityTasks = tasks.filter(task => task.priority === "high");

        if (highPriorityTasks.length === 0) {
          return "You don't have any high-priority tasks at the moment.";
        }

        const response = `High-priority tasks:\n${highPriorityTasks.map((task, index) => 
          `${index + 1}. "${task.title}" - Due: ${new Date(task.due_date).toLocaleDateString()}`
        ).join('\n')}`;

        context.lastResponse = response;
        return response;
      }

      // Handle task details query
      const taskMatch = lowercaseMessage.match(/task\s*(\d+)/i);
      if (taskMatch) {
        const taskIndex = parseInt(taskMatch[1]) - 1;
        const task = tasks[taskIndex];

        if (task) {
          return `Task Details:\nTitle: ${task.title}\nDescription: ${task.description || 'No description'}\nPriority: ${task.priority}\nStatus: ${task.status}\nDue Date: ${new Date(task.due_date).toLocaleDateString()}`;
        }
      }

      // Handle greetings
      if (lowercaseMessage.includes("hi") || lowercaseMessage.includes("hello")) {
        return `Hello! I can help you manage your tasks. You currently have:
- ${tasks.filter(t => new Date(t.due_date).toDateString() === new Date().toDateString()).length} tasks due today
- ${tasks.filter(t => t.priority === "high").length} high-priority tasks
- ${tasks.filter(t => new Date(t.due_date) > new Date()).length} upcoming tasks

What would you like to know about?`;
      }

      // Make the default response more conversational
      return `I'm here to help! You can ask me about:
• Upcoming tasks ("what's next?")
• Today's tasks ("what's due today?")
• Previous tasks ("what were my last tasks?")
• High priority items ("show urgent tasks")
• Any specific task ("tell me about task 1")

What would you like to know?`;

    } catch (error) {
      console.error("AI Service Error:", error);
      return "I'm having trouble accessing your task information. Try asking in a different way, like 'show my upcoming tasks' or 'what's due today?'";
    }
  }
}; 