import { Task } from "./taskService";

const HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5";
const API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;

interface TaskSuggestion {
  title: string;
  description: string;
}

// Add variety of task templates
const taskTemplates = {
  development: [
    {
      title: "Create documentation for {feature}",
      description: "Write comprehensive documentation including usage examples, API references, and best practices for {feature}."
    },
    {
      title: "Implement unit tests for {feature}",
      description: "Develop a comprehensive test suite to ensure reliability and catch potential issues in {feature}."
    },
    {
      title: "Optimize performance of {feature}",
      description: "Analyze and improve the performance metrics, reduce latency, and optimize resource usage of {feature}."
    },
    {
      title: "Review code for {feature}",
      description: "Conduct thorough code review to ensure quality, identify potential issues, and suggest improvements for {feature}."
    },
    {
      title: "Debug issues in {feature}",
      description: "Investigate and resolve reported bugs, errors, and unexpected behaviors in {feature}."
    }
  ],
  planning: [
    {
      title: "Schedule team meeting for {topic}",
      description: "Organize a team discussion to align on goals, challenges, and next steps for {topic}."
    },
    {
      title: "Create roadmap for {topic}",
      description: "Develop a detailed timeline and milestone plan for implementing {topic}."
    },
    {
      title: "Define requirements for {topic}",
      description: "Document functional and technical requirements, acceptance criteria, and constraints for {topic}."
    },
    {
      title: "Research solutions for {topic}",
      description: "Investigate and evaluate potential solutions, tools, and approaches for implementing {topic}."
    },
    {
      title: "Prepare presentation about {topic}",
      description: "Create a comprehensive presentation covering objectives, progress, and next steps for {topic}."
    }
  ],
  general: [
    {
      title: "Update status report for Q{quarter}",
      description: "Compile and analyze progress metrics, achievements, and challenges for Q{quarter} report."
    },
    {
      title: "Set up monitoring for {system}",
      description: "Implement monitoring tools and alerts to track performance and health of {system}."
    },
    {
      title: "Organize team building activity",
      description: "Plan and coordinate team building exercises to improve collaboration and team dynamics."
    },
    {
      title: "Review and update documentation",
      description: "Review existing documentation, update outdated information, and identify areas needing additional documentation."
    },
    {
      title: "Create backup strategy for {system}",
      description: "Design and implement a comprehensive backup and recovery plan for {system}."
    }
  ]
} as const;

// Update the type for template access
type Category = keyof typeof taskTemplates;
type Template = typeof taskTemplates[Category][number];

export const taskSuggestionService = {
  async getSuggestions(existingTasks: Task[], currentInput: string = ""): Promise<TaskSuggestion[]> {
    try {
      const context = generateTaskContext(existingTasks);
      
      const prompt = `Based on these existing tasks:
${context}

And current input: "${currentInput}"

Generate 3 unique task suggestions with descriptions. Format as JSON array of objects with 'title' and 'description' fields.
Make them specific, practical, and actionable.`;

      const response = await fetch(HUGGING_FACE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 250,
            temperature: 0.8,
            top_p: 0.9,
            do_sample: true
          }
        })
      });

      if (!response.ok) {
        return generateDynamicSuggestions(existingTasks);
      }

      const data = await response.json();
      let suggestions: TaskSuggestion[];
      
      try {
        suggestions = JSON.parse(data[0].generated_text);
        if (!Array.isArray(suggestions) || suggestions.length === 0) {
          throw new Error("Invalid suggestions format");
        }
      } catch {
        return generateDynamicSuggestions(existingTasks);
      }

      return suggestions.slice(0, 3);
    } catch (error) {
      console.error("Task suggestion error:", error);
      return generateDynamicSuggestions(existingTasks);
    }
  }
};

function generateDynamicSuggestions(tasks: Task[]): TaskSuggestion[] {
  const categories = Object.keys(taskTemplates) as Category[];
  const suggestions: TaskSuggestion[] = [];
  const usedTemplates = new Set<string>();

  const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
  const quarter = Math.floor(Math.random() * 4) + 1;
  
  const commonWords = tasks.length > 0 
    ? tasks.map(t => t.title.split(' ')).flat()
      .filter(word => word.length > 3)
    : ['system', 'feature', 'project', 'process'];

  while (suggestions.length < 3) {
    const category = getRandomItem(categories);
    const template = getRandomItem(taskTemplates[category]);
    
    if (usedTemplates.has(template.title)) continue;
    
    const suggestion: TaskSuggestion = {
      title: template.title
        .replace(/{feature}/g, getRandomItem(commonWords))
        .replace(/{topic}/g, getRandomItem(commonWords))
        .replace(/{system}/g, getRandomItem(commonWords))
        .replace(/{quarter}/g, quarter.toString()),
      description: template.description
        .replace(/{feature}/g, getRandomItem(commonWords))
        .replace(/{topic}/g, getRandomItem(commonWords))
        .replace(/{system}/g, getRandomItem(commonWords))
        .replace(/{quarter}/g, quarter.toString())
    };
    
    usedTemplates.add(template.title);
    suggestions.push(suggestion);
  }

  return suggestions;
}

function generateTaskContext(tasks: Task[]): string {
  if (tasks.length === 0) return "No existing tasks.";

  const taskCategories = tasks.reduce((acc, task) => {
    const words = task.title.toLowerCase().split(' ');
    words.forEach(word => {
      if (word.length > 3) acc[word] = (acc[word] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const commonThemes = Object.entries(taskCategories)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([word]) => word);

  const recentTasks = tasks
    .slice(0, 3) // Get most recent tasks without sorting by created_at
    .map(task => `- ${task.title} (${task.priority} priority)`);

  return `
Common themes: ${commonThemes.join(', ')}
Recent tasks:
${recentTasks.join('\n')}
`;
} 