'use client';
import { useCallback, useEffect, useState } from 'react';

interface PerformanceMetrics {
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
  navigation?: PerformanceNavigationTiming;
}

interface PerformanceState {
  metrics: PerformanceMetrics;
  isSupported: boolean;
  connection?: Record<string, unknown>; // NetworkInformation is not available in all browsers
}

export const usePerformance = () => {
  const [state, setState] = useState<PerformanceState>({
    metrics: {},
    isSupported: typeof window !== 'undefined' && 'performance' in window,
  });

  const updateMetrics = useCallback(() => {
    if (typeof window === 'undefined' || !('performance' in window)) return;

    const navigation = performance.getEntriesByType(
      'navigation'
    )[0] as PerformanceNavigationTiming;
    const paintEntries = performance.getEntriesByType('paint');

    const fcp = paintEntries.find(
      entry => entry.name === 'first-contentful-paint'
    )?.startTime;
    const lcp = paintEntries.find(
      entry => entry.name === 'largest-contentful-paint'
    )?.startTime;

    setState(prev => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        ...(fcp && { fcp }),
        ...(lcp && { lcp }),
        ...(navigation && {
          ttfb: navigation.responseStart - navigation.requestStart,
          navigation,
        }),
      },
      connection: (navigator as unknown as Record<string, unknown>)
        .connection as Record<string, unknown>,
    }));
  }, []);

  const measureCoreWebVitals = useCallback((): (() => void) | undefined => {
    if (typeof window === 'undefined') return;

    // Measure LCP
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          setState(prev => ({
            ...prev,
            metrics: {
              ...prev.metrics,
              lcp: lastEntry.startTime,
            },
          }));
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Measure FID
      const fidObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          setState(prev => ({
            ...prev,
            metrics: {
              ...prev.metrics,
              fid:
                ((entry as unknown as Record<string, unknown>)
                  .processingStart as number) - entry.startTime,
            },
          }));
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Measure CLS
      let clsValue = 0;
      const clsObserver = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (!(entry as unknown as Record<string, unknown>).hadRecentInput) {
            clsValue += (entry as unknown as Record<string, unknown>)
              .value as number;
            setState(prev => ({
              ...prev,
              metrics: {
                ...prev.metrics,
                cls: clsValue,
              },
            }));
          }
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // Cleanup observers
      return () => {
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      };
    }
    return undefined;
  }, []);

  const getPerformanceScore = useCallback(():
    | 'good'
    | 'needs-improvement'
    | 'poor' => {
    const { lcp, fid, cls } = state.metrics;

    if (lcp === undefined || fid === undefined || cls === undefined) {
      return 'needs-improvement';
    }

    // Core Web Vitals thresholds
    const lcpScore =
      lcp <= 2500 ? 'good' : lcp <= 4000 ? 'needs-improvement' : 'poor';
    const fidScore =
      fid <= 100 ? 'good' : fid <= 300 ? 'needs-improvement' : 'poor';
    const clsScore =
      cls <= 0.1 ? 'good' : cls <= 0.25 ? 'needs-improvement' : 'poor';

    // Return the worst score
    if (lcpScore === 'poor' || fidScore === 'poor' || clsScore === 'poor')
      return 'poor';
    if (
      lcpScore === 'needs-improvement' ||
      fidScore === 'needs-improvement' ||
      clsScore === 'needs-improvement'
    ) {
      return 'needs-improvement';
    }
    return 'good';
  }, [state.metrics]);

  const logPerformanceMetrics = useCallback(() => {
    if (process.env.NODE_ENV === 'development') {
      console.warn('🚀 Performance Metrics');
      console.warn('LCP (Largest Contentful Paint):', state.metrics.lcp, 'ms');
      console.warn('FID (First Input Delay):', state.metrics.fid, 'ms');
      console.warn('CLS (Cumulative Layout Shift):', state.metrics.cls);
      console.warn('FCP (First Contentful Paint):', state.metrics.fcp, 'ms');
      console.warn('TTFB (Time to First Byte):', state.metrics.ttfb, 'ms');
      console.warn('Performance Score:', getPerformanceScore());
      console.warn('Connection:', state.connection);
      // Performance metrics logged
    }
  }, [state.metrics, state.connection, getPerformanceScore]);

  useEffect(() => {
    if (!state.isSupported) return;

    // Initial metrics
    updateMetrics();

    // Measure Core Web Vitals
    const cleanup = measureCoreWebVitals();

    // Update metrics on load
    const handleLoad = () => {
      updateMetrics();
      logPerformanceMetrics();
    };

    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
      cleanup?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isSupported]);

  return {
    ...state,
    getPerformanceScore,
    logPerformanceMetrics,
    updateMetrics,
  };
};
