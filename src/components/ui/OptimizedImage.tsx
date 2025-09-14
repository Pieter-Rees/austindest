'use client';
import Image from 'next/image';
import { useState, useCallback, useMemo } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage = ({
  src,
  alt,
  width = 200,
  height = 300,
  className = '',
  priority = false,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  loading = 'lazy',
  fetchPriority = 'auto',
  onLoad,
  onError,
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Memoize optimized image props
  const imageProps = useMemo(
    () => ({
      src,
      alt,
      width,
      height,
      priority,
      quality,
      placeholder,
      sizes,
      loading: priority ? 'eager' : loading,
      fetchPriority: priority ? 'high' : fetchPriority,
      ...(blurDataURL && { blurDataURL }),
    }),
    [
      src,
      alt,
      width,
      height,
      priority,
      quality,
      placeholder,
      sizes,
      loading,
      fetchPriority,
      blurDataURL,
    ]
  );

  // Optimized event handlers
  const handleLoad = useCallback(() => {
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  }, [onError]);

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-800 text-gray-400 ${className}`}
        style={{ width, height }}
      >
        <span>Image unavailable</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div
          className='absolute inset-0 bg-gray-800 animate-pulse rounded-3xl'
          style={{ width, height }}
        />
      )}
      <Image
        {...imageProps}
        alt={alt}
        className={`object-cover w-full h-full rounded-3xl transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};
