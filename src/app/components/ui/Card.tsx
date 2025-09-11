import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'glass';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-white/5 backdrop-blur-sm',
      bordered: 'border border-white/20 bg-white/5 backdrop-blur-sm',
      glass: 'bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20'
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg p-6 shadow-lg transition-all duration-300 hover:shadow-xl',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card }; 