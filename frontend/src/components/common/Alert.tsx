import React from 'react';
import type { NotificationType } from '../../types';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  type: NotificationType;
  title?: string;
  closeable?: boolean;
  onClose?: () => void;
}

const alertConfig = {
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    icon: '✓',
    iconBg: 'bg-green-100 text-green-600',
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    icon: '✕',
    iconBg: 'bg-red-100 text-red-600',
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-800',
    icon: '!',
    iconBg: 'bg-amber-100 text-amber-600',
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    icon: 'i',
    iconBg: 'bg-blue-100 text-blue-600',
  },
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ type, title, closeable = false, onClose, children, className = '', ...props }, ref) => {
    const config = alertConfig[type];

    return (
      <div
        ref={ref}
        role="alert"
        className={`
          rounded-xl p-4 border-2 animate-in fade-in slide-in-from-top-2
          ${config.bg} ${config.border} ${config.text}
          ${className}
        `}
        {...props}
      >
        <div className="flex items-start gap-3">
          <div className={`flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full font-bold ${config.iconBg}`}>
            {config.icon}
          </div>
          <div className="flex-1 min-w-0">
            {title && <p className="font-bold text-sm">{title}</p>}
            <p className="text-sm mt-0.5">{children}</p>
          </div>
          {closeable && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close alert"
              className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';
