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

    // Security logging for production
    if (process.env.NODE_ENV === 'production') {
      // Log error details for monitoring (without sensitive data)
      const errorDetails = {
        message: error.message,
        stack: error.stack?.split('\n').slice(0, 5).join('\n'), // Limit stack trace
        componentStack: errorInfo.componentStack
          ?.split('\n')
          .slice(0, 3)
          .join('\n'),
        timestamp: new Date().toISOString(),
        userAgent:
          typeof window !== 'undefined'
            ? window.navigator.userAgent
            : 'unknown',
        url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      };

      // Send to monitoring service (placeholder for actual implementation)
      this.logErrorToMonitoring(errorDetails);
    }
  }

  private logErrorToMonitoring(errorDetails: Record<string, unknown>) {
    // In a real application, this would send to your monitoring service
    // For now, we'll just log to console in production
    console.error('Production Error:', errorDetails);

    // Example: Send to monitoring service
    // fetch('/api/error-reporting', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(errorDetails)
    // }).catch(() => {}); // Silent fail for error reporting
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
