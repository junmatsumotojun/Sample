import React from 'react';
import { CheckCircle, Clock, AlertTriangle, BarChart3 } from 'lucide-react';

interface TaskStatsProps {
  stats: {
    total: number;
    completed: number;
    pending: number;
    high: number;
    medium: number;
    low: number;
  };
}

export const TaskStats: React.FC<TaskStatsProps> = ({ stats }) => {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-5 h-5 text-gray-500" />
        <h3 className="font-medium text-gray-900">Statistics</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-gray-600">Total</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{completionRate}%</div>
          <div className="text-sm text-gray-600">Complete</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{completionRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* Priority breakdown */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700">Pending by Priority</h4>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span className="text-red-600 font-medium">{stats.high}</span>
            <span className="text-gray-600">High</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-yellow-500" />
            <span className="text-yellow-600 font-medium">{stats.medium}</span>
            <span className="text-gray-600">Medium</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-green-600 font-medium">{stats.low}</span>
            <span className="text-gray-600">Low</span>
          </div>
        </div>
      </div>
    </div>
  );
};