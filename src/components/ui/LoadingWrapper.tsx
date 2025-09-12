'use client';
import { useEffect, useState, type ReactNode } from 'react';

interface LoadingWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export const LoadingWrapper = ({
  children,
  fallback = null,
}: LoadingWrapperProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
