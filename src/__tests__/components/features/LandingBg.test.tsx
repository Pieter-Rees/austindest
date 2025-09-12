import { render, screen } from '@testing-library/react';
import LandingBg from '@/components/features/landingBg';

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
  it('renders video player with correct props', () => {
    render(<LandingBg />);

    const player = screen.getByTestId('react-player');
    expect(player).toHaveAttribute('data-width', '100%');
    expect(player).toHaveAttribute('data-height', '100%');
    expect(player).toHaveAttribute(
      'data-src',
      'https://example.com/background-video.mp4'
    );
    expect(player).toHaveAttribute('data-playing', 'true');
    expect(player).toHaveAttribute('data-loop', 'true');
    expect(player).toHaveAttribute('data-playback-rate', '0.8');
    expect(player).toHaveAttribute('data-muted', 'true');
    expect(player).toHaveAttribute('data-controls', 'false');
  });

  it('wraps video player in error boundary and loading wrapper', () => {
    render(<LandingBg />);

    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
    expect(screen.getByTestId('loading-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('react-player')).toBeInTheDocument();
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

  it('applies correct video player classes and styles', () => {
    render(<LandingBg />);

    const player = screen.getByTestId('react-player');
    expect(player).toHaveClass('absolute', 'top-0', 'left-0');
    expect(player).toHaveStyle({
      objectFit: 'cover',
      transform: 'scale(1.1)',
    });
  });

  it('renders without crashing', () => {
    expect(() => render(<LandingBg />)).not.toThrow();
  });
});
