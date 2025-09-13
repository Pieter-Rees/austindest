import { render, screen } from '@testing-library/react';
import Watch from '@/components/features/watch';

interface SectionHeaderProps {
  subTitle?: string;
  left?: boolean;
}

interface ComponentProps {
  children: React.ReactNode;
}

interface ReactPlayerProps {
  width?: string | number;
  height?: string | number;
  light?: boolean;
  src?: string;
}

jest.mock('@/components/ui/SectionHeader', () => ({
  SectionHeader: ({ subTitle, left }: SectionHeaderProps) => (
    <div data-testid='section-header'>
      <h2>{subTitle}</h2>
      <span data-testid='section-header-props'>
        left:{left ? 'true' : 'false'}
      </span>
    </div>
  ),
}));

jest.mock('@/components/ui/EmbedContainer', () => ({
  EmbedContainer: ({ children }: ComponentProps) => (
    <div data-testid='embed-container'>{children}</div>
  ),
}));

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

jest.mock('react-player', () => ({
  __esModule: true,
  default: ({ width, height, light, src }: ReactPlayerProps) => (
    <div
      data-testid='react-player'
      data-width={width}
      data-height={height}
      data-light={light}
      data-src={src}
    >
      Video Player
    </div>
  ),
}));

jest.mock('@/lib', () => ({
  YOUTUBE_VIDEO: 'https://youtube.com/watch?v=example',
}));

describe('Watch', () => {
  it('renders section header with correct props', () => {
    render(<Watch />);

    expect(screen.getByText('Watch')).toBeInTheDocument();
    expect(screen.getByTestId('section-header-props')).toHaveTextContent(
      'left:true'
    );
  });

  it('renders video player with correct props', () => {
    render(<Watch />);

    const player = screen.getByTestId('react-player');
    expect(player).toHaveAttribute('data-width', '100%');
    expect(player).toHaveAttribute('data-height', '100%');
    expect(player).toHaveAttribute('data-light', 'true');
    expect(player).toHaveAttribute(
      'data-src',
      'https://youtube.com/watch?v=example'
    );
  });

  it('wraps video player in error boundary and loading wrapper', () => {
    render(<Watch />);

    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
    expect(screen.getByTestId('loading-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('embed-container')).toBeInTheDocument();
    expect(screen.getByTestId('react-player')).toBeInTheDocument();
  });

  it('has correct container structure', () => {
    const { container } = render(<Watch />);

    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveClass('w-full');
  });

  it('renders without crashing', () => {
    expect(() => render(<Watch />)).not.toThrow();
  });
});
