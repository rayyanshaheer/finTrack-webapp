import React from 'react';

interface EmptyStateProps {
  message?: string;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message = 'No data available',
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50 rounded-lg">
      {icon || (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-400 mb-4"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      )}
      <p className="text-gray-600 text-lg font-medium">{message}</p>
    </div>
  );
};

export default EmptyState;
