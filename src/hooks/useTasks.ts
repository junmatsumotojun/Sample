import { useState, useEffect } from 'react';
import { Task, TaskFilter } from '../types';

const STORAGE_KEY = 'desktop-tasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>({
    search: '',
    category: null,
    priority: null,
    status: 'all'
  });

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Failed to load tasks:', error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleTask = (id: string) => {
    updateTask(id, { completed: !tasks.find(t => t.id === id)?.completed });
  };

  const clearCompleted = () => {
    setTasks(prev => prev.filter(task => !task.completed));
  };

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    if (filter.search && !task.title.toLowerCase().includes(filter.search.toLowerCase())) {
      return false;
    }
    if (filter.category && task.category !== filter.category) {
      return false;
    }
    if (filter.priority && task.priority !== filter.priority) {
      return false;
    }
    if (filter.status === 'pending' && task.completed) {
      return false;
    }
    if (filter.status === 'completed' && !task.completed) {
      return false;
    }
    return true;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    high: tasks.filter(t => t.priority === 'high' && !t.completed).length,
    medium: tasks.filter(t => t.priority === 'medium' && !t.completed).length,
    low: tasks.filter(t => t.priority === 'low' && !t.completed).length
  };

  return {
    tasks: filteredTasks,
    filter,
    setFilter,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    clearCompleted,
    stats,
    allTasks: tasks
  };
};