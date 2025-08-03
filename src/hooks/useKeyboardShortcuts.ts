import { useEffect } from 'react';

interface KeyboardShortcuts {
  onNewTask: () => void;
  onSearch: () => void;
  onClearCompleted: () => void;
}

export const useKeyboardShortcuts = ({ onNewTask, onSearch, onClearCompleted }: KeyboardShortcuts) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Cmd/Ctrl + N for new task
      if ((event.metaKey || event.ctrlKey) && event.key === 'n') {
        event.preventDefault();
        onNewTask();
      }
      
      // Cmd/Ctrl + F for search
      if ((event.metaKey || event.ctrlKey) && event.key === 'f') {
        event.preventDefault();
        onSearch();
      }
      
      // Cmd/Ctrl + Shift + C for clear completed
      if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === 'C') {
        event.preventDefault();
        onClearCompleted();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onNewTask, onSearch, onClearCompleted]);
};