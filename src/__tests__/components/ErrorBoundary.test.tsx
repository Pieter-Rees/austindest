import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div data-testid='no-error'>No error</div>;
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('no-error')).toBeInTheDocument();
  });

  it('renders error message when there is an error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders custom fallback when provided', () => {
    render(
      <ErrorBoundary
        fallback={<div data-testid='custom-error'>Custom Error</div>}
      >
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('custom-error')).toBeInTheDocument();
  });

  it('renders default fallback when no custom fallback provided', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('logs error to console in development', () => {
    const originalEnv = process.env.NODE_ENV;
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'development',
      writable: true,
      configurable: true,
    });

    const consoleSpy = jest.spyOn(console, 'error');

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      'ErrorBoundary caught an error:',
      expect.any(Error),
      expect.any(Object)
    );

    Object.defineProperty(process.env, 'NODE_ENV', {
      value: originalEnv,
      writable: true,
      configurable: true,
    });
  });

  it('does not log error to console in production', () => {
    const originalEnv = process.env.NODE_ENV;
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'production',
      writable: true,
      configurable: true,
    });

    const consoleSpy = jest.spyOn(console, 'error');

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // In production, our custom error logging should not be called
    // (React's error boundary still logs, but our custom logging should not)
    const customErrorCalls = consoleSpy.mock.calls.filter(
      call => call[0] === 'ErrorBoundary caught an error:'
    );
    expect(customErrorCalls).toHaveLength(0);

    Object.defineProperty(process.env, 'NODE_ENV', {
      value: originalEnv,
      writable: true,
      configurable: true,
    });
  });

  it('renders without children', () => {
    render(<ErrorBoundary>{null}</ErrorBoundary>);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  it('renders refresh button when error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // The error boundary should be visible immediately since ThrowError throws on render
    const refreshButton = screen.getByText('Refresh Page');
    expect(refreshButton).toBeInTheDocument();
  });
});
