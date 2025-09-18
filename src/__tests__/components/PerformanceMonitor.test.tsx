import { PerformanceMonitor } from '@/components/ui/PerformanceMonitor';
import { render, screen } from '@testing-library/react';

// Mock the hooks
jest.mock('@/hooks/usePerformance', () => ({
  usePerformance: jest.fn(),
}));

jest.mock('@/hooks/useScroll', () => ({
  useScroll: jest.fn(),
}));

import { usePerformance } from '@/hooks/usePerformance';
import { useScroll } from '@/hooks/useScroll';

const mockUsePerformance = jest.mocked(usePerformance);
const mockUseScroll = jest.mocked(useScroll);

describe('PerformanceMonitor', () => {
  const mockPerformanceData = {
    metrics: {
      lcp: 1200,
      fid: 50,
      cls: 0.05,
      fcp: 800,
      ttfb: 200,
    },
    connection: {
      effectiveType: '4g',
    },
    isSupported: true,
    getPerformanceScore: jest.fn(() => 'good' as const),
    logPerformanceMetrics: jest.fn(),
    updateMetrics: jest.fn(),
  };

  const mockScrollData = {
    scrollY: 150,
    velocity: 2.5,
    isScrolled: true,
    direction: 'down' as const,
    isAtTop: false,
    isAtBottom: false,
  };

  beforeEach(() => {
    mockUsePerformance.mockReturnValue(mockPerformanceData);
    mockUseScroll.mockReturnValue(mockScrollData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders performance monitor with all metrics', () => {
    render(<PerformanceMonitor />);

    expect(screen.getByText('Performance Monitor')).toBeInTheDocument();
    expect(screen.getByText('LCP:')).toBeInTheDocument();
    expect(screen.getByText('1200ms')).toBeInTheDocument();
    expect(screen.getByText('FID:')).toBeInTheDocument();
    expect(screen.getByText('50ms')).toBeInTheDocument();
    expect(screen.getByText('CLS:')).toBeInTheDocument();
    expect(screen.getByText('0.050')).toBeInTheDocument();
    expect(screen.getByText('FCP:')).toBeInTheDocument();
    expect(screen.getByText('800ms')).toBeInTheDocument();
    expect(screen.getByText('TTFB:')).toBeInTheDocument();
    expect(screen.getByText('200ms')).toBeInTheDocument();
    expect(screen.getByText('Score:')).toBeInTheDocument();
    expect(screen.getByText('GOOD')).toBeInTheDocument();
    expect(screen.getByText('Scroll:')).toBeInTheDocument();
    expect(screen.getByText('150px')).toBeInTheDocument();
    expect(screen.getByText('Velocity:')).toBeInTheDocument();
    expect(screen.getByText('2.50px/ms')).toBeInTheDocument();
    expect(screen.getByText('Connection:')).toBeInTheDocument();
    expect(screen.getByText('4g')).toBeInTheDocument();
  });

  it('renders with default position (bottom-right)', () => {
    const { container } = render(<PerformanceMonitor />);

    const monitor = container.firstChild as HTMLElement;
    expect(monitor).toHaveClass('bottom-4', 'right-4');
  });

  it('renders with custom position', () => {
    const { container } = render(<PerformanceMonitor position='top-left' />);

    const monitor = container.firstChild as HTMLElement;
    expect(monitor).toHaveClass('top-4', 'left-4');
  });

  it('renders with all position variants', () => {
    const positions = [
      'top-left',
      'top-right',
      'bottom-left',
      'bottom-right',
    ] as const;

    positions.forEach(position => {
      const { container, unmount } = render(
        <PerformanceMonitor position={position} />
      );
      const monitor = container.firstChild as HTMLElement;

      if (position === 'top-left') {
        expect(monitor).toHaveClass('top-4', 'left-4');
      } else if (position === 'top-right') {
        expect(monitor).toHaveClass('top-4', 'right-4');
      } else if (position === 'bottom-left') {
        expect(monitor).toHaveClass('bottom-4', 'left-4');
      } else {
        expect(monitor).toHaveClass('bottom-4', 'right-4');
      }

      unmount();
    });
  });

  it('shows red color for poor LCP values', () => {
    mockUsePerformance.mockReturnValue({
      ...mockPerformanceData,
      metrics: {
        ...mockPerformanceData.metrics,
        lcp: 3000,
      },
    });

    render(<PerformanceMonitor />);

    const lcpValue = screen.getByText('3000ms');
    expect(lcpValue).toHaveClass('text-red-400');
  });

  it('shows green color for good LCP values', () => {
    mockUsePerformance.mockReturnValue({
      ...mockPerformanceData,
      metrics: {
        ...mockPerformanceData.metrics,
        lcp: 1200,
      },
    });

    render(<PerformanceMonitor />);

    const lcpValue = screen.getByText('1200ms');
    expect(lcpValue).toHaveClass('text-green-400');
  });

  it('shows red color for poor FID values', () => {
    mockUsePerformance.mockReturnValue({
      ...mockPerformanceData,
      metrics: {
        ...mockPerformanceData.metrics,
        fid: 150,
      },
    });

    render(<PerformanceMonitor />);

    const fidValue = screen.getByText('150ms');
    expect(fidValue).toHaveClass('text-red-400');
  });

  it('shows green color for good FID values', () => {
    mockUsePerformance.mockReturnValue({
      ...mockPerformanceData,
      metrics: {
        ...mockPerformanceData.metrics,
        fid: 50,
      },
    });

    render(<PerformanceMonitor />);

    const fidValue = screen.getByText('50ms');
    expect(fidValue).toHaveClass('text-green-400');
  });

  it('shows red color for poor CLS values', () => {
    mockUsePerformance.mockReturnValue({
      ...mockPerformanceData,
      metrics: {
        ...mockPerformanceData.metrics,
        cls: 0.15,
      },
    });

    render(<PerformanceMonitor />);

    const clsValue = screen.getByText('0.150');
    expect(clsValue).toHaveClass('text-red-400');
  });

  it('shows green color for good CLS values', () => {
    mockUsePerformance.mockReturnValue({
      ...mockPerformanceData,
      metrics: {
        ...mockPerformanceData.metrics,
        cls: 0.05,
      },
    });

    render(<PerformanceMonitor />);

    const clsValue = screen.getByText('0.050');
    expect(clsValue).toHaveClass('text-green-400');
  });

  it('shows N/A for missing metrics', () => {
    mockUsePerformance.mockReturnValue({
      ...mockPerformanceData,
      metrics: {},
    });

    render(<PerformanceMonitor />);

    expect(screen.getAllByText('N/A')).toHaveLength(5);
  });

  it('shows different performance scores with correct colors', () => {
    const scores = [
      { score: 'good', color: 'text-green-500' },
      { score: 'needs-improvement', color: 'text-yellow-500' },
      { score: 'poor', color: 'text-red-500' },
    ];

    scores.forEach(({ score, color }) => {
      mockUsePerformance.mockReturnValue({
        ...mockPerformanceData,
        getPerformanceScore: jest.fn(
          () => score as 'good' | 'needs-improvement' | 'poor'
        ),
      });

      const { unmount } = render(<PerformanceMonitor />);

      const scoreElement = screen.getByText(score.toUpperCase());
      expect(scoreElement).toHaveClass(color);

      unmount();
    });
  });

  it('handles missing connection data', () => {
    const { connection: _connection, ...dataWithoutConnection } =
      mockPerformanceData;
    mockUsePerformance.mockReturnValue(dataWithoutConnection);

    render(<PerformanceMonitor />);

    expect(screen.queryByText('Connection:')).not.toBeInTheDocument();
  });

  it('handles connection without effectiveType', () => {
    mockUsePerformance.mockReturnValue({
      ...mockPerformanceData,
      connection: {} as Record<string, unknown>,
    });

    render(<PerformanceMonitor />);

    expect(screen.getByText('unknown')).toBeInTheDocument();
  });

  it('does not render in production when showInProduction is false', () => {
    const originalEnv = process.env.NODE_ENV;
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'production',
      writable: true,
      configurable: true,
    });

    render(<PerformanceMonitor showInProduction={false} />);

    expect(screen.queryByText('Performance Monitor')).not.toBeInTheDocument();

    Object.defineProperty(process.env, 'NODE_ENV', {
      value: originalEnv,
      writable: true,
      configurable: true,
    });
  });

  it('renders in production when showInProduction is true', () => {
    const originalEnv = process.env.NODE_ENV;
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'production',
      writable: true,
      configurable: true,
    });

    render(<PerformanceMonitor showInProduction={true} />);

    expect(screen.getByText('Performance Monitor')).toBeInTheDocument();

    Object.defineProperty(process.env, 'NODE_ENV', {
      value: originalEnv,
      writable: true,
      configurable: true,
    });
  });

  it('renders in development by default', () => {
    const originalEnv = process.env.NODE_ENV;
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'development',
      writable: true,
      configurable: true,
    });

    render(<PerformanceMonitor />);

    expect(screen.getByText('Performance Monitor')).toBeInTheDocument();

    Object.defineProperty(process.env, 'NODE_ENV', {
      value: originalEnv,
      writable: true,
      configurable: true,
    });
  });

  it('has correct display name', () => {
    expect(PerformanceMonitor.displayName).toBe('PerformanceMonitor');
  });

  it('applies correct CSS classes', () => {
    const { container } = render(<PerformanceMonitor />);

    const monitor = container.firstChild as HTMLElement;
    expect(monitor).toHaveClass(
      'fixed',
      'bg-black/80',
      'text-white',
      'text-xs',
      'p-3',
      'rounded-lg',
      'font-mono',
      'z-50',
      'max-w-xs'
    );
  });
});
