import React, { useId } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', id, ...props }, ref) => {
    const generatedId = useId();
    const selectId = id || generatedId;
    const errorId = `${selectId}-error`;

    return (
      <div className="flex flex-col">
        {label && (
          <label htmlFor={selectId} className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`
            w-full px-4 py-3.5 border-2 rounded-xl outline-none
            transition-all duration-200 font-medium text-slate-800
            border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 focus:outline-none focus-visible:outline-none
            bg-white cursor-pointer
            ${error ? 'border-red-500 focus:ring-red-100 focus:border-red-600' : ''}
            ${className}
          `}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p id={errorId} className="text-xs font-semibold text-red-600 mt-2">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
