import React from 'react';

// Loading Spinner Component
export const LoadingSpinner = ({ size = 'md', color = 'blue' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const colorClasses = {
    blue: 'border-blue-500',
    gray: 'border-gray-500',
    green: 'border-green-500',
    red: 'border-red-500'
  };

  return (
    <div className={`${sizeClasses[size]} border-2 ${colorClasses[color]} border-t-transparent rounded-full animate-spin`}></div>
  );
};

// Page Loading Component
export const PageLoading = () => (
  <div className="flex items-center justify-center h-64">
    <div className="text-center">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
    </div>
  </div>
);

// Button Loading State
export const LoadingButton = ({ children, isLoading, className = '', ...props }) => (
  <button
    className={`relative ${className}`}
    disabled={isLoading}
    {...props}
  >
    {isLoading && (
      <div className="absolute inset-0 flex items-center justify-center">
        <LoadingSpinner size="sm" color="white" />
      </div>
    )}
    <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
      {children}
    </span>
  </button>
);

// Skeleton Components
export const SkeletonLine = ({ className = '' }) => (
  <div className={`h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`}></div>
);

export const SkeletonCard = () => (
  <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
    <div className="animate-pulse">
      <SkeletonLine className="h-6 mb-4 w-3/4" />
      <SkeletonLine className="mb-2" />
      <SkeletonLine className="mb-2 w-5/6" />
      <SkeletonLine className="w-4/6" />
    </div>
  </div>
);

export const SkeletonTable = ({ rows = 5, cols = 6 }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
    <div className="p-6">
      <div className="grid gap-4">
        {/* Header */}
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {Array.from({ length: cols }).map((_, i) => (
            <SkeletonLine key={i} className="h-6" />
          ))}
        </div>
        
        {/* Rows */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="grid gap-4 pt-4 border-t border-gray-200 dark:border-gray-600" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
            {Array.from({ length: cols }).map((_, colIndex) => (
              <SkeletonLine key={colIndex} />
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);
