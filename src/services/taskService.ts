import { supabase } from "@/lib/supabase";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "completed";
  due_date: string;
  assignee_id: string;
  created_by: string;
  priority: "low" | "medium" | "high";
  comments_count: number;
}

export const taskService = {
  async getTasks() {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as Task[];
  },

  async createTask(task: Omit<Task, "id" | "created_by" | "comments_count">) {
    const { data, error } = await supabase
      .from("tasks")
      .insert([{ ...task, created_by: (await supabase.auth.getUser()).data.user?.id }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateTask(id: string, updates: Partial<Task>) {
    const { data, error } = await supabase
      .from("tasks")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteTask(id: string) {
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }
}; 