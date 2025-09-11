import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import localFont from 'next/font/local';

const monotonFont = localFont({
  src: '../../../../public/fonts/Monoton-Regular.woff2',
  display: 'swap',
});

export interface TitleProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  subTitle?: string; // For backward compatibility
  align?: 'left' | 'center' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Title = forwardRef<HTMLDivElement, TitleProps>(
  ({ 
    className, 
    title = "Austin", 
    subtitle,
    subTitle,
    align = 'center',
    size = 'lg',
    ...props 
  }, ref) => {
    // Use subtitle or subTitle, with subtitle taking precedence
    const subtitleText = subtitle || subTitle || "All About The Groove";
    
    const alignments = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right'
    };

    const sizes = {
      sm: 'text-3xl sm:text-4xl lg:text-5xl',
      md: 'text-4xl sm:text-5xl lg:text-6xl',
      lg: 'text-5xl sm:text-6xl lg:text-7xl xl:text-8xl',
      xl: 'text-6xl sm:text-7xl lg:text-8xl xl:text-9xl'
    };

    return (
      <div
        ref={ref}
        className={cn('w-full', alignments[align], className)}
        {...props}
      >
        <div className="relative">
          <h1
            className={cn(
              monotonFont.className,
              'text-shine text-neon-title main-title',
              sizes[size],
              alignments[align]
            )}
          >
            {title}
          </h1>
          <span
            className={cn(
              monotonFont.className,
              'absolute top-0 left-0 right-0 text-shine pointer-events-none select-none main-title',
              sizes[size],
              alignments[align]
            )}
            aria-hidden="true"
          >
            {title}
          </span>
        </div>
        {subtitleText && (
          <h2
            className={cn(
              'text-white text-neon mt-8',
              sizes[size === 'xl' ? 'lg' : size === 'lg' ? 'md' : 'sm'],
              alignments[align]
            )}
          >
            {subtitleText}
          </h2>
        )}
      </div>
    );
  }
);

Title.displayName = 'Title';

export { Title }; 