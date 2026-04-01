import React from 'react';
import type { QuantityMeasurementEntity } from '../../types';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

interface HistorySectionProps {
  isAuthenticated: boolean;
  history: QuantityMeasurementEntity[];
  isLoading: boolean;
  onRefresh: () => void;
}

export const HistorySection: React.FC<HistorySectionProps> = ({
  isAuthenticated,
  history,
  isLoading,
  onRefresh,
}) => {
  // Show login CTA if not authenticated
  if (!isAuthenticated) {
    return (
      <Card className="mt-6">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="inline-block p-3 rounded-full bg-blue-50 mb-4">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Save Your Calculations</h3>
          <p className="text-gray-600 mb-6 max-w-xs">
            Sign in to see your operation history and track all your calculations.
          </p>
          <a href="/login">
            <Button variant="primary">Sign In to Your Account</Button>
          </a>
        </div>
      </Card>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <Card className="mt-6">
        <div className="flex items-center justify-center py-8">
          <LoadingSpinner size="md" text="Loading history..." />
        </div>
      </Card>
    );
  }

  // Show empty state
  if (history.length === 0) {
    return (
      <Card className="mt-6">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="inline-block p-3 rounded-full bg-gray-50 mb-4">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No History Yet</h3>
          <p className="text-gray-600">
            Your calculations will appear here once you perform operations.
          </p>
        </div>
      </Card>
    );
  }

  // Show history table
  return (
    <Card className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Operation History</h3>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="text-sm text-blue-600 hover:text-blue-700 disabled:text-gray-400"
          title="Refresh history"
        >
          ↻ Refresh
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left px-4 py-3 font-medium text-gray-700">Operation</th>
              <th className="text-left px-4 py-3 font-medium text-gray-700">Value 1</th>
              <th className="text-left px-4 py-3 font-medium text-gray-700">Value 2</th>
              <th className="text-left px-4 py-3 font-medium text-gray-700">Result</th>
              {history.some((h) => h.timestamp) && (
                <th className="text-left px-4 py-3 font-medium text-gray-700">Date</th>
              )}
            </tr>
          </thead>
          <tbody>
            {history.map((entry, index) => (
              <tr
                key={entry.id || index}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 text-gray-900 font-medium">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {entry.operation}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700">{entry.operand1}</td>
                <td className="px-4 py-3 text-gray-700">{entry.operand2}</td>
                <td className="px-4 py-3 text-gray-900 font-semibold">{entry.result}</td>
                {entry.timestamp && (
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {new Date(entry.timestamp).toLocaleString()}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default HistorySection;
