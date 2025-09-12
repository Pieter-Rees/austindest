'use client';
import { Component, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  override render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className='flex items-center justify-center p-8'>
            <div className='text-center'>
              <h2 className='text-2xl font-bold text-white mb-4'>
                Something went wrong
              </h2>
              <p className='text-gray-300 mb-4'>
                Please refresh the page to try again.
              </p>
              <button
                onClick={() => window.location.reload()}
                className='px-4 py-2 bg-bubblegum text-black rounded-lg hover:bg-bubblegum/80 transition-colors'
              >
                Refresh Page
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
