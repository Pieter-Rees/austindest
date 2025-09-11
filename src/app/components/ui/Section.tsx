import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  fullVh?: boolean;
  bg?: boolean;
  container?: boolean;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ 
    className, 
    fullVh = false, 
    bg = false, 
    container = true,
    containerSize = 'lg',
    children, 
    ...props 
  }, ref) => {
    const content = container ? (
      <Container size={containerSize}>
        {children}
      </Container>
    ) : children;

    return (
      <section
        ref={ref}
        className={cn(
          'w-full flex justify-center items-center relative z-10',
          bg && 'bg-gradient-to-b from-bubblegum/20 to-blue/20 backdrop-blur-md',
          fullVh ? 'min-h-screen' : 'py-16 lg:py-24',
          className
        )}
        {...props}
      >
        {content}
      </section>
    );
  }
);

Section.displayName = 'Section';

export { Section }; 