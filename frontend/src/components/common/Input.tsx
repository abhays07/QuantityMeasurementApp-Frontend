import React, { useId } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="flex flex-col">
        {label && (
          <label htmlFor={inputId} className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={`
            w-full px-4 py-3.5 border-2 rounded-xl outline-none
            transition-all duration-200 font-medium text-slate-800
            border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 focus:outline-none focus-visible:outline-none
            ${error ? 'border-red-500 focus:ring-red-100 focus:border-red-600' : ''}
            ${className}
          `}
          {...props}
        />
        {error && <p id={errorId} className="text-xs font-semibold text-red-600 mt-2">{error}</p>}
        {helperText && !error && <p id={helperId} className="text-xs text-slate-500 mt-2">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
