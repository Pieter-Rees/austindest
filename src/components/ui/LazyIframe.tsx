'use client';
import { useState, useRef, useEffect } from 'react';

interface LazyIframeProps {
  src: string;
  title: string;
  width?: string;
  height?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
}

export const LazyIframe = ({
  src,
  title,
  width = '100%',
  height = '152',
  className = '',
  loading = 'lazy',
  onLoad,
}: LazyIframeProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const iframeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (iframeRef.current) {
      observer.observe(iframeRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <div ref={iframeRef} className={`relative ${className}`}>
      {!isInView && (
        <div
          className='flex items-center justify-center bg-gray-800 text-gray-400 rounded-lg'
          style={{ width, height }}
        >
          <span>Loading...</span>
        </div>
      )}
      {isInView && (
        <iframe
          src={src}
          title={title}
          width={width}
          height={height}
          loading={loading}
          onLoad={handleLoad}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ width, height }}
        />
      )}
    </div>
  );
};
