import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, hoverable = false, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          bg-white rounded-3xl shadow-lg p-8 border border-slate-100
          ${hoverable ? 'hover:shadow-xl transition-shadow duration-200' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
