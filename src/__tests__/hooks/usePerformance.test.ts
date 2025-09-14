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
    // Mock unsupported environment
    const originalWindow = global.window;
    // @ts-ignore
    delete global.window;

    const { result } = renderHook(() => usePerformance());

    expect(result.current.isSupported).toBe(false);
    expect(result.current.metrics).toEqual({});

    // Restore window
    global.window = originalWindow;
  });

  it('calculates performance score correctly', () => {
    const { result } = renderHook(() => usePerformance());

    // Test good scores
    act(() => {
      result.current.metrics = {
        lcp: 2000,
        fid: 50,
        cls: 0.05,
      };
    });

    expect(result.current.getPerformanceScore()).toBe('good');
  });

  it('calculates needs-improvement score', () => {
    const { result } = renderHook(() => usePerformance());

    act(() => {
      result.current.metrics = {
        lcp: 3000,
        fid: 150,
        cls: 0.15,
      };
    });

    expect(result.current.getPerformanceScore()).toBe('needs-improvement');
  });

  it('calculates poor score', () => {
    const { result } = renderHook(() => usePerformance());

    act(() => {
      result.current.metrics = {
        lcp: 5000,
        fid: 400,
        cls: 0.3,
      };
    });

    expect(result.current.getPerformanceScore()).toBe('poor');
  });

  it('returns needs-improvement for missing metrics', () => {
    const { result } = renderHook(() => usePerformance());

    act(() => {
      result.current.metrics = {};
    });

    expect(result.current.getPerformanceScore()).toBe('needs-improvement');
  });

  it('returns poor if any metric is poor', () => {
    const { result } = renderHook(() => usePerformance());

    // Good LCP and FID, poor CLS
    act(() => {
      result.current.metrics = {
        lcp: 2000,
        fid: 50,
        cls: 0.3,
      };
    });

    expect(result.current.getPerformanceScore()).toBe('poor');
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

    act(() => {
      result.current.metrics = {
        lcp: 2000,
        fid: 50,
        cls: 0.05,
        fcp: 800,
        ttfb: 200,
      };
    });

    act(() => {
      result.current.logPerformanceMetrics();
    });

    expect(consoleSpy).toHaveBeenCalledWith('🚀 Performance Metrics');
    expect(consoleSpy).toHaveBeenCalledWith('LCP (Largest Contentful Paint):', 2000, 'ms');
    expect(consoleSpy).toHaveBeenCalledWith('FID (First Input Delay):', 50, 'ms');
    expect(consoleSpy).toHaveBeenCalledWith('CLS (Cumulative Layout Shift):', 0.05);
    expect(consoleSpy).toHaveBeenCalledWith('FCP (First Contentful Paint):', 800, 'ms');
    expect(consoleSpy).toHaveBeenCalledWith('TTFB (Time to First Byte):', 200, 'ms');
    expect(consoleSpy).toHaveBeenCalledWith('Performance Score:', 'good');
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
    // @ts-ignore
    delete global.PerformanceObserver;

    const { result } = renderHook(() => usePerformance());

    expect(result.current.isSupported).toBe(true);
    expect(mockPerformanceObserver).not.toHaveBeenCalled();

    global.PerformanceObserver = originalObserver;
  });

  it('handles missing connection info', () => {
    const originalConnection = navigator.connection;
    // @ts-ignore
    delete navigator.connection;

    const { result } = renderHook(() => usePerformance());

    expect(result.current.connection).toBeUndefined();

    navigator.connection = originalConnection;
  });

  it('handles edge cases in score calculation', () => {
    const { result } = renderHook(() => usePerformance());

    // Test boundary values
    const testCases = [
      { lcp: 2500, fid: 100, cls: 0.1, expected: 'good' },
      { lcp: 2501, fid: 100, cls: 0.1, expected: 'needs-improvement' },
      { lcp: 2000, fid: 101, cls: 0.1, expected: 'needs-improvement' },
      { lcp: 2000, fid: 100, cls: 0.11, expected: 'needs-improvement' },
      { lcp: 4000, fid: 300, cls: 0.25, expected: 'needs-improvement' },
      { lcp: 4001, fid: 300, cls: 0.25, expected: 'poor' },
      { lcp: 4000, fid: 301, cls: 0.25, expected: 'poor' },
      { lcp: 4000, fid: 300, cls: 0.26, expected: 'poor' },
    ];

    testCases.forEach(({ lcp, fid, cls, expected }) => {
      act(() => {
        result.current.metrics = { lcp, fid, cls };
      });

      expect(result.current.getPerformanceScore()).toBe(expected);
    });
  });
});
