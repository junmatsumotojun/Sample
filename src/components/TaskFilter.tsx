import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { TaskFilter as TaskFilterType } from '../types';

interface TaskFilterProps {
  filter: TaskFilterType;
  onFilterChange: (filter: TaskFilterType) => void;
  categories: string[];
  searchInputRef?: React.RefObject<HTMLInputElement>;
}

export const TaskFilter: React.FC<TaskFilterProps> = ({ 
  filter, 
  onFilterChange, 
  categories,
  searchInputRef 
}) => {
  const handleFilterChange = (updates: Partial<TaskFilterType>) => {
    onFilterChange({ ...filter, ...updates });
  };

  const clearFilters = () => {
    onFilterChange({
      search: '',
      category: null,
      priority: null,
      status: 'all'
    });
  };

  const hasActiveFilters = filter.search || filter.category || filter.priority || filter.status !== 'all';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <h3 className="font-medium text-gray-900">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          ref={searchInputRef}
          type="text"
          value={filter.search}
          onChange={(e) => handleFilterChange({ search: e.target.value })}
          placeholder="Search tasks..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {filter.search && (
          <button
            onClick={() => handleFilterChange({ search: '' })}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={filter.status}
            onChange={(e) => handleFilterChange({ status: e.target.value as 'all' | 'pending' | 'completed' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={filter.category || ''}
            onChange={(e) => handleFilterChange({ category: e.target.value || null })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select
            value={filter.priority || ''}
            onChange={(e) => handleFilterChange({ priority: e.target.value || null })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};