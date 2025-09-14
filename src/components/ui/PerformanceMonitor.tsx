'use client';
import { usePerformance } from '@/hooks/usePerformance';
import { useScroll } from '@/hooks/useScroll';
import { memo } from 'react';

interface PerformanceMonitorProps {
  showInProduction?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const PerformanceMonitor = memo<PerformanceMonitorProps>(
  ({ showInProduction = false, position = 'bottom-right' }) => {
    const performance = usePerformance();
    const scroll = useScroll();

    // Only show in development or if explicitly enabled in production
    if (process.env.NODE_ENV === 'production' && !showInProduction) {
      return null;
    }

    const positionClasses = {
      'top-left': 'top-4 left-4',
      'top-right': 'top-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'bottom-right': 'bottom-4 right-4',
    };

    const score = performance.getPerformanceScore();
    const scoreColor = {
      good: 'text-green-500',
      'needs-improvement': 'text-yellow-500',
      poor: 'text-red-500',
    }[score];

    return (
      <div
        className={`fixed ${positionClasses[position]} bg-black/80 text-white text-xs p-3 rounded-lg font-mono z-50 max-w-xs`}
      >
        <div className='font-bold mb-2'>Performance Monitor</div>

        <div className='space-y-1'>
          <div>
            <span className='text-gray-400'>LCP:</span>{' '}
            <span
              className={
                performance.metrics.lcp && performance.metrics.lcp > 2500
                  ? 'text-red-400'
                  : 'text-green-400'
              }
            >
              {performance.metrics.lcp
                ? `${Math.round(performance.metrics.lcp)}ms`
                : 'N/A'}
            </span>
          </div>

          <div>
            <span className='text-gray-400'>FID:</span>{' '}
            <span
              className={
                performance.metrics.fid && performance.metrics.fid > 100
                  ? 'text-red-400'
                  : 'text-green-400'
              }
            >
              {performance.metrics.fid
                ? `${Math.round(performance.metrics.fid)}ms`
                : 'N/A'}
            </span>
          </div>

          <div>
            <span className='text-gray-400'>CLS:</span>{' '}
            <span
              className={
                performance.metrics.cls && performance.metrics.cls > 0.1
                  ? 'text-red-400'
                  : 'text-green-400'
              }
            >
              {performance.metrics.cls
                ? performance.metrics.cls.toFixed(3)
                : 'N/A'}
            </span>
          </div>

          <div>
            <span className='text-gray-400'>FCP:</span>{' '}
            <span className='text-blue-400'>
              {performance.metrics.fcp
                ? `${Math.round(performance.metrics.fcp)}ms`
                : 'N/A'}
            </span>
          </div>

          <div>
            <span className='text-gray-400'>TTFB:</span>{' '}
            <span className='text-blue-400'>
              {performance.metrics.ttfb
                ? `${Math.round(performance.metrics.ttfb)}ms`
                : 'N/A'}
            </span>
          </div>

          <div className='pt-1 border-t border-gray-600'>
            <span className='text-gray-400'>Score:</span>{' '}
            <span className={scoreColor}>{score.toUpperCase()}</span>
          </div>

          <div>
            <span className='text-gray-400'>Scroll:</span>{' '}
            <span className='text-blue-400'>
              {Math.round(scroll.scrollY)}px
            </span>
          </div>

          <div>
            <span className='text-gray-400'>Velocity:</span>{' '}
            <span className='text-blue-400'>
              {scroll.velocity.toFixed(2)}px/ms
            </span>
          </div>

          {performance.connection && (
            <div>
              <span className='text-gray-400'>Connection:</span>{' '}
              <span className='text-blue-400'>
                {String(
                  (performance.connection as Record<string, unknown>)
                    .effectiveType ?? 'unknown'
                )}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
);

PerformanceMonitor.displayName = 'PerformanceMonitor';

export { PerformanceMonitor };
