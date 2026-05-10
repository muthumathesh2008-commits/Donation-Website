import React from 'react';

export const Card = ({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardContent = ({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`p-6 sm:p-8 ${className}`} {...props}>
      {children}
    </div>
  );
};
