export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFilter {
  search: string;
  category: string | null;
  priority: string | null;
  status: 'all' | 'pending' | 'completed';
}

export interface Category {
  id: string;
  name: string;
  color: string;
}