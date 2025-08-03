import React, { useRef } from 'react';
import { TaskItem } from './components/TaskItem';
import { TaskForm } from './components/TaskForm';
import { TaskFilter } from './components/TaskFilter';
import { TaskStats } from './components/TaskStats';
import { Header } from './components/Header';
import { useTasks } from './hooks/useTasks';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { Task } from './types';

const CATEGORIES = ['Personal', 'Work', 'Health', 'Learning', 'Shopping', 'Others'];

function App() {
  const {
    tasks,
    filter,
    setFilter,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    clearCompleted,
    stats,
    allTasks
  } = useTasks();

  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const dataStr = JSON.stringify(allTasks, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tasks_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedTasks: Task[] = JSON.parse(e.target?.result as string);
        if (Array.isArray(importedTasks)) {
          // You would need to implement a merge strategy here
          // For now, we'll just alert the user
          alert(`Ready to import ${importedTasks.length} tasks. Feature coming soon!`);
        }
      } catch (error) {
        alert('Error importing file. Please check the file format.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  useKeyboardShortcuts({
    onNewTask: () => {
      // Focus would be handled by TaskForm component
    },
    onSearch: () => {
      searchInputRef.current?.focus();
    },
    onClearCompleted: clearCompleted
  });

  const hasCompletedTasks = allTasks.some(task => task.completed);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onExport={handleExport}
        onImport={handleImport}
        onClearCompleted={clearCompleted}
        hasCompletedTasks={hasCompletedTasks}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left sidebar - Filters and Stats */}
          <div className="lg:col-span-1 space-y-6">
            <TaskStats stats={stats} />
            <TaskFilter
              filter={filter}
              onFilterChange={setFilter}
              categories={CATEGORIES}
              searchInputRef={searchInputRef}
            />
          </div>

          {/* Main content - Tasks */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              <TaskForm onAdd={addTask} categories={CATEGORIES} />

              {tasks.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-lg mb-2">
                    {filter.search || filter.category || filter.priority || filter.status !== 'all'
                      ? 'No tasks match your filters'
                      : 'No tasks yet'
                    }
                  </div>
                  <p className="text-gray-500 text-sm">
                    {filter.search || filter.category || filter.priority || filter.status !== 'all'
                      ? 'Try adjusting your filters or create a new task'
                      : 'Create your first task to get started!'
                    }
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {tasks.map(task => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggle={toggleTask}
                      onUpdate={updateTask}
                      onDelete={deleteTask}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Keyboard shortcuts help */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Keyboard shortcuts: <kbd className="px-2 py-1 bg-gray-100 rounded">Cmd/Ctrl + N</kbd> New task, 
            <kbd className="px-2 py-1 bg-gray-100 rounded ml-2">Cmd/Ctrl + F</kbd> Search, 
            <kbd className="px-2 py-1 bg-gray-100 rounded ml-2">Cmd/Ctrl + Shift + C</kbd> Clear completed
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;