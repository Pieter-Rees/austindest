import { HTMLAttributes, forwardRef, ElementType } from 'react';
import { cn } from '@/lib/utils';

export interface ContainerProps<T extends ElementType = 'div'> extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  as?: T;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'lg', as: Component = 'div', children, ...props }, ref) => {
    const sizes = {
      sm: 'max-w-3xl',
      md: 'max-w-4xl',
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
      full: 'max-w-full'
    };

    return (
      <Component
        ref={ref}
        className={cn(
          'mx-auto px-4 sm:px-6 lg:px-8 xl:px-12',
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = 'Container';

export { Container }; 