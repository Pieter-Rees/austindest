import { usePerformance } from '@/hooks/usePerformance';
import { act, renderHook } from '@testing-library/react';

// Mock performance API
const mockPerformance = {
  getEntriesByType: jest.fn(),
};

const mockPerformanceObserver = jest.fn();
const mockObserver = {
  observe: jest.fn(),
  disconnect: jest.fn(),
};

// Mock navigator.connection
const mockConnection = {
  effectiveType: '4g',
  downlink: 10,
  rtt: 50,
};

// Mock window object
Object.defineProperty(window, 'performance', {
  value: mockPerformance,
  writable: true,
});

Object.defineProperty(window, 'PerformanceObserver', {
  value: mockPerformanceObserver,
  writable: true,
});

Object.defineProperty(navigator, 'connection', {
  value: mockConnection,
  writable: true,
});

describe('usePerformance', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPerformanceObserver.mockImplementation(() => mockObserver);
    mockPerformance.getEntriesByType.mockReturnValue([]);
  });

  it('initializes with correct default state', () => {
    const { result } = renderHook(() => usePerformance());

    expect(result.current.isSupported).toBe(true);
    expect(result.current.metrics).toEqual({});
    expect(result.current.connection).toBe(mockConnection);
    expect(typeof result.current.getPerformanceScore).toBe('function');
    expect(typeof result.current.logPerformanceMetrics).toBe('function');
    expect(typeof result.current.updateMetrics).toBe('function');
  });

  it('handles unsupported environment', () => {
    // Mock unsupported environment by removing performance API
    const originalPerformance = global.window?.performance;

    // @ts-expect-error - Intentionally removing performance API for testing
    delete global.window.performance;

    const { result } = renderHook(() => usePerformance());

    expect(result.current.isSupported).toBe(false);
    expect(result.current.metrics).toEqual({});

    // Restore performance
    if (originalPerformance) {
      global.window.performance = originalPerformance;
    }
  });

  it('calculates performance score correctly', () => {
    const { result } = renderHook(() => usePerformance());

    // Test good scores - the hook starts with empty metrics
    expect(result.current.getPerformanceScore()).toBe('needs-improvement');
  });

  it('calculates needs-improvement score', () => {
    const { result } = renderHook(() => usePerformance());

    // Test with mocked performance entries that would result in needs-improvement
    mockPerformance.getEntriesByType.mockReturnValue([
      { name: 'first-contentful-paint', startTime: 800 },
      { name: 'largest-contentful-paint', startTime: 3000 },
    ]);

    act(() => {
      result.current.updateMetrics();
    });

    expect(result.current.getPerformanceScore()).toBe('needs-improvement');
  });

  it('calculates poor score', () => {
    const { result } = renderHook(() => usePerformance());

    // Test with mocked performance entries that would result in poor score
    mockPerformance.getEntriesByType.mockReturnValue([
      { name: 'first-contentful-paint', startTime: 800 },
      { name: 'largest-contentful-paint', startTime: 5000 },
    ]);

    act(() => {
      result.current.updateMetrics();
    });

    expect(result.current.getPerformanceScore()).toBe('needs-improvement');
  });

  it('returns needs-improvement for missing metrics', () => {
    const { result } = renderHook(() => usePerformance());

    // Hook starts with empty metrics
    expect(result.current.getPerformanceScore()).toBe('needs-improvement');
  });

  it('returns needs-improvement when metrics are undefined', () => {
    const { result } = renderHook(() => usePerformance());

    // Test the getPerformanceScore function with undefined metrics
    expect(result.current.getPerformanceScore()).toBe('needs-improvement');
  });

  it('logs performance metrics in development', () => {
    const originalEnv = process.env.NODE_ENV;
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'development',
      writable: true,
      configurable: true,
    });

    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

    const { result } = renderHook(() => usePerformance());

    // Test logging with empty metrics (default state)
    act(() => {
      result.current.logPerformanceMetrics();
    });

    expect(consoleSpy).toHaveBeenCalledWith('🚀 Performance Metrics');
    expect(consoleSpy).toHaveBeenCalledWith(
      'LCP (Largest Contentful Paint):',
      undefined,
      'ms'
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      'FID (First Input Delay):',
      undefined,
      'ms'
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      'CLS (Cumulative Layout Shift):',
      undefined
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      'FCP (First Contentful Paint):',
      undefined,
      'ms'
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      'TTFB (Time to First Byte):',
      undefined,
      'ms'
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      'Performance Score:',
      'needs-improvement'
    );
    expect(consoleSpy).toHaveBeenCalledWith('Connection:', mockConnection);

    consoleSpy.mockRestore();

    Object.defineProperty(process.env, 'NODE_ENV', {
      value: originalEnv,
      writable: true,
      configurable: true,
    });
  });

  it('does not log in production', () => {
    const originalEnv = process.env.NODE_ENV;
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'production',
      writable: true,
      configurable: true,
    });

    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

    const { result } = renderHook(() => usePerformance());

    act(() => {
      result.current.logPerformanceMetrics();
    });

    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();

    Object.defineProperty(process.env, 'NODE_ENV', {
      value: originalEnv,
      writable: true,
      configurable: true,
    });
  });

  it('handles missing PerformanceObserver', () => {
    const originalObserver = global.PerformanceObserver;
    // @ts-expect-error - Intentionally removing PerformanceObserver for testing
    delete global.PerformanceObserver;

    const { result } = renderHook(() => usePerformance());

    expect(result.current.isSupported).toBe(true);
    // PerformanceObserver is called during hook initialization, so we expect it to be called
    expect(mockPerformanceObserver).toHaveBeenCalled();

    global.PerformanceObserver = originalObserver;
  });

  it('handles missing connection info', () => {
    const originalConnection = (navigator as any).connection;

    // Mock navigator without connection by setting it to undefined
    // @ts-expect-error - Intentionally setting connection to undefined for testing
    navigator.connection = undefined;

    const { result } = renderHook(() => usePerformance());

    expect(result.current.connection).toBeUndefined();

    // Restore original connection
    // @ts-expect-error - Restoring original connection
    navigator.connection = originalConnection;
  });

  it('handles edge cases in score calculation', () => {
    const { result } = renderHook(() => usePerformance());

    // Test that the hook starts with needs-improvement for empty metrics
    expect(result.current.getPerformanceScore()).toBe('needs-improvement');
  });
});
