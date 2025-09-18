'use client';
import { memo } from 'react';

interface SkeletonLoaderProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular' | 'image';
  width?: number | string;
  height?: number | string;
  lines?: number;
  animation?: 'pulse' | 'wave' | 'none';
}

const SkeletonLoader = memo<SkeletonLoaderProps>(
  ({
    className = '',
    variant = 'rectangular',
    width,
    height,
    lines = 1,
    animation = 'pulse',
  }) => {
    const baseClasses = 'bg-gray-300 dark:bg-gray-700 rounded';
    const animationClasses = {
      pulse: 'animate-pulse',
      wave: 'animate-wave',
      none: '',
    };

    const variantClasses = {
      text: 'h-4',
      rectangular: 'rounded-lg',
      circular: 'rounded-full',
      image: 'rounded-3xl',
    };

    const style = {
      ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
      ...(height && {
        height: typeof height === 'number' ? `${height}px` : height,
      }),
    };

    if (variant === 'text' && lines > 1) {
      return (
        <div className={className}>
          {Array.from({ length: lines }, (_, index) => (
            <div
              key={index}
              className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${
                index === lines - 1 ? 'w-3/4' : 'w-full'
              } ${index > 0 ? 'mt-2' : ''}`}
              style={index === lines - 1 ? { ...style, width: '75%' } : style}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
        style={style}
      />
    );
  }
);

SkeletonLoader.displayName = 'SkeletonLoader';

export { SkeletonLoader };
