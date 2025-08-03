import React from 'react';
import { CheckSquare, Download, Upload, Trash2 } from 'lucide-react';

interface HeaderProps {
  onExport: () => void;
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearCompleted: () => void;
  hasCompletedTasks: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  onExport, 
  onImport, 
  onClearCompleted, 
  hasCompletedTasks 
}) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <CheckSquare className="w-8 h-8 text-blue-500" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">TaskDesk</h1>
              <p className="text-sm text-gray-600">Desktop Task Manager</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onExport}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>

            <label className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors cursor-pointer">
              <Upload className="w-4 h-4" />
              Import
              <input
                type="file"
                accept=".json"
                onChange={onImport}
                className="hidden"
              />
            </label>

            {hasCompletedTasks && (
              <button
                onClick={onClearCompleted}
                className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear Completed
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};