import React from 'react';

// Simple Bar Chart Component
export const BarChart = ({ data = [], className = '', title }) => {
  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div className={`p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">{title}</h3>
      )}
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-20 text-sm text-gray-600 dark:text-gray-400 truncate">
              {item.label}
            </div>
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3 relative overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${item.color || 'bg-blue-500'}`}
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
            <div className="w-12 text-sm text-gray-900 dark:text-white font-medium text-right">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Simple Pie Chart Component (CSS-based)
export const PieChart = ({ data = [], className = '', title }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercentage = 0;

  const colors = [
    'bg-blue-500',
    'bg-green-500', 
    'bg-yellow-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-indigo-500',
    'bg-pink-500',
    'bg-gray-500'
  ];

  return (
    <div className={`p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">{title}</h3>
      )}
      <div className="flex items-center space-x-6">
        {/* Simple circular progress representation */}
        <div className="relative w-32 h-32">
          <div className="w-full h-full rounded-full border-8 border-gray-200 dark:border-gray-700"></div>
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const color = colors[index % colors.length];
            cumulativePercentage += percentage;
            
            return (
              <div
                key={index}
                className={`absolute inset-0 rounded-full border-8 ${color.replace('bg-', 'border-')} transform -rotate-90`}
                style={{
                  clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(2 * Math.PI * (cumulativePercentage - percentage) / 100)}% ${50 + 50 * Math.sin(2 * Math.PI * (cumulativePercentage - percentage) / 100)}%, ${50 + 50 * Math.cos(2 * Math.PI * cumulativePercentage / 100)}% ${50 + 50 * Math.sin(2 * Math.PI * cumulativePercentage / 100)}%)`
                }}
              />
            );
          })}
        </div>
        
        {/* Legend */}
        <div className="space-y-2">
          {data.map((item, index) => {
            const percentage = ((item.value / total) * 100).toFixed(1);
            const color = colors[index % colors.length];
            
            return (
              <div key={index} className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${color}`}></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {item.label}: {item.value} ({percentage}%)
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Line Chart Component (Simple CSS-based)
export const LineChart = ({ data = [], className = '', title, yAxisLabel = '', xAxisLabel = '' }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  const minValue = Math.min(...data.map(item => item.value));
  const range = maxValue - minValue || 1;

  return (
    <div className={`p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">{title}</h3>
      )}
      
      <div className="relative h-64">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>{maxValue}</span>
          <span>{Math.round((maxValue + minValue) / 2)}</span>
          <span>{minValue}</span>
        </div>
        
        {/* Chart area */}
        <div className="ml-8 h-full relative border-l border-b border-gray-300 dark:border-gray-600">
          {/* Grid lines */}
          <div className="absolute inset-0">
            {[0, 25, 50, 75, 100].map(percent => (
              <div 
                key={percent}
                className="absolute w-full border-t border-gray-200 dark:border-gray-700"
                style={{ top: `${100 - percent}%` }}
              />
            ))}
          </div>
          
          {/* Data points and line */}
          <svg className="absolute inset-0 w-full h-full">
            {/* Line path */}
            <polyline
              fill="none"
              stroke="rgb(59, 130, 246)"
              strokeWidth="2"
              points={data.map((item, index) => {
                const x = (index / (data.length - 1 || 1)) * 100;
                const y = 100 - ((item.value - minValue) / range) * 100;
                return `${x}%,${y}%`;
              }).join(' ')}
            />
            
            {/* Data points */}
            {data.map((item, index) => {
              const x = (index / (data.length - 1 || 1)) * 100;
              const y = 100 - ((item.value - minValue) / range) * 100;
              return (
                <circle
                  key={index}
                  cx={`${x}%`}
                  cy={`${y}%`}
                  r="4"
                  fill="rgb(59, 130, 246)"
                  className="hover:r-6 transition-all cursor-pointer"
                >
                  <title>{item.label}: {item.value}</title>
                </circle>
              );
            })}
          </svg>
        </div>
        
        {/* X-axis labels */}
        <div className="mt-2 ml-8 flex justify-between text-xs text-gray-500 dark:text-gray-400">
          {data.map((item, index) => (
            <span key={index} className="truncate max-w-16">
              {item.label}
            </span>
          ))}
        </div>
      </div>
      
      {(yAxisLabel || xAxisLabel) && (
        <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          {yAxisLabel && <div>↑ {yAxisLabel}</div>}
          {xAxisLabel && <div>→ {xAxisLabel}</div>}
        </div>
      )}
    </div>
  );
};

// Stats Card Component
export const StatsCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon: Icon,
  className = '',
  isLoading = false 
}) => {
  const changeColors = {
    positive: 'text-green-600 dark:text-green-400',
    negative: 'text-red-600 dark:text-red-400',
    neutral: 'text-gray-600 dark:text-gray-400'
  };

  if (isLoading) {
    return (
      <div className={`p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
            {title}
          </h3>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </div>
          {change !== undefined && (
            <div className={`text-sm mt-2 ${changeColors[changeType]}`}>
              {change > 0 ? '+' : ''}{change}% from last period
            </div>
          )}
        </div>
        {Icon && (
          <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
        )}
      </div>
    </div>
  );
};

// Progress Bar Component
export const ProgressBar = ({ 
  value, 
  max = 100, 
  label, 
  className = '',
  color = 'blue',
  showPercentage = true 
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500'
  };

  return (
    <div className={className}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
          {showPercentage && (
            <span className="text-sm text-gray-600 dark:text-gray-400">{percentage.toFixed(1)}%</span>
          )}
        </div>
      )}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-500 ${colorClasses[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
