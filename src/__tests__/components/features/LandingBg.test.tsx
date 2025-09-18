import { render, screen } from '@testing-library/react';
import LandingBg from '@/components/features/LandingBg';

interface ReactPlayerProps {
  width?: string | number;
  height?: string | number;
  src?: string;
  playing?: boolean;
  loop?: boolean;
  playbackRate?: number;
  muted?: boolean;
  controls?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

jest.mock('react-player', () => ({
  __esModule: true,
  default: ({
    width,
    height,
    src,
    playing,
    loop,
    playbackRate,
    muted,
    controls,
    className,
    style,
  }: ReactPlayerProps) => (
    <div
      data-testid='react-player'
      data-width={width}
      data-height={height}
      data-src={src}
      data-playing={playing}
      data-loop={loop}
      data-playback-rate={playbackRate}
      data-muted={muted}
      data-controls={controls}
      className={className}
      style={style}
    >
      Video Player
    </div>
  ),
}));

interface ComponentProps {
  children: React.ReactNode;
}

jest.mock('@/components/ui/LoadingWrapper', () => ({
  LoadingWrapper: ({ children }: ComponentProps) => (
    <div data-testid='loading-wrapper'>{children}</div>
  ),
}));

jest.mock('@/components/ui/ErrorBoundary', () => ({
  ErrorBoundary: ({ children }: ComponentProps) => (
    <div data-testid='error-boundary'>{children}</div>
  ),
}));

jest.mock('@/lib', () => ({
  BACKGROUND_VIDEO: 'https://example.com/background-video.mp4',
}));

describe('LandingBg', () => {
  it('renders loading state initially', () => {
    render(<LandingBg />);

    // Check that loading state is shown initially
    const loadingDiv = screen
      .getByTestId('loading-wrapper')
      .querySelector('div');
    expect(loadingDiv).toHaveClass(
      'w-full',
      'h-full',
      'bg-gray-900',
      'animate-pulse'
    );
  });

  it('wraps video player in error boundary and loading wrapper', () => {
    render(<LandingBg />);

    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
    expect(screen.getByTestId('loading-wrapper')).toBeInTheDocument();
  });

  it('applies correct container classes', () => {
    const { container } = render(<LandingBg />);

    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveClass(
      'fixed',
      'left-0',
      'right-0',
      'h-screen',
      'z-0',
      'brightness-0.4',
      'scale-150',
      'overflow-hidden'
    );
  });

  it('renders without crashing', () => {
    expect(() => render(<LandingBg />)).not.toThrow();
  });
});
