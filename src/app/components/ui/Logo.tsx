import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import localFont from 'next/font/local';

const monotonFont = localFont({
  src: '../../../../public/fonts/Monoton-Regular.woff2',
  display: 'swap',
});

export interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const sizes = {
      sm: 'text-2xl',
      md: 'text-3xl lg:text-4xl',
      lg: 'text-4xl lg:text-5xl'
    };

    return (
      <div
        ref={ref}
        className={cn(
          monotonFont.className,
          'text-shine text-neon-title transition-all duration-300 fill-white hover:fill-bubblegum',
          sizes[size],
          className
        )}
        {...props}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          className="w-full h-full"
        >
          <polygon
            style={{ fill: "currentColor" }}
            points="20,5 35,15 35,25 20,35 5,25 5,15"
          />
          <text
            x="20"
            y="22"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs font-bold fill-current"
            style={{ fill: "currentColor" }}
          >
            AD
          </text>
        </svg>
      </div>
    );
  }
);

Logo.displayName = 'Logo';

export { Logo }; 