import { render, screen, waitFor } from '@testing-library/react';
import { LazyIframe } from '@/components/ui/LazyIframe';

const mockIntersectionObserver = jest.fn();
const mockObserve = jest.fn();
const mockDisconnect = jest.fn();

beforeEach(() => {
  mockIntersectionObserver.mockImplementation(_callback => ({
    observe: mockObserve,
    disconnect: mockDisconnect,
  }));

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    value: mockIntersectionObserver,
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('LazyIframe', () => {
  it('renders loading placeholder initially', () => {
    render(<LazyIframe src='https://example.com' title='Test iframe' />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByTitle('Test iframe')).not.toBeInTheDocument();
  });

  it('renders iframe when in view', async () => {
    render(<LazyIframe src='https://example.com' title='Test iframe' />);

    const callback = mockIntersectionObserver.mock.calls[0][0];
    const mockEntry = { isIntersecting: true };

    callback([mockEntry]);

    await waitFor(() => {
      expect(screen.getByTitle('Test iframe')).toBeInTheDocument();
    });
  });

  it('applies correct iframe attributes', async () => {
    render(
      <LazyIframe
        src='https://example.com'
        title='Test iframe'
        width='800px'
        height='600px'
        loading='eager'
      />
    );

    const callback = mockIntersectionObserver.mock.calls[0][0];
    const mockEntry = { isIntersecting: true };

    callback([mockEntry]);

    await waitFor(() => {
      const iframe = screen.getByTitle('Test iframe');
      expect(iframe).toHaveAttribute('src', 'https://example.com');
      expect(iframe).toHaveAttribute('width', '800px');
      expect(iframe).toHaveAttribute('height', '600px');
      expect(iframe).toHaveAttribute('loading', 'eager');
    });
  });

  it('uses default dimensions when not provided', async () => {
    render(<LazyIframe src='https://example.com' title='Test iframe' />);

    const callback = mockIntersectionObserver.mock.calls[0][0];
    const mockEntry = { isIntersecting: true };

    callback([mockEntry]);

    await waitFor(() => {
      const iframe = screen.getByTitle('Test iframe');
      expect(iframe).toHaveAttribute('width', '100%');
      expect(iframe).toHaveAttribute('height', '152');
    });
  });

  it('applies custom className', () => {
    render(
      <LazyIframe
        src='https://example.com'
        title='Test iframe'
        className='custom-class'
      />
    );

    const container = screen
      .getByText('Loading...')
      .closest('div')?.parentElement;
    expect(container).toHaveClass('relative', 'custom-class');
  });

  it('calls onLoad callback when iframe loads', async () => {
    const mockOnLoad = jest.fn();

    render(
      <LazyIframe
        src='https://example.com'
        title='Test iframe'
        onLoad={mockOnLoad}
      />
    );

    const callback = mockIntersectionObserver.mock.calls[0][0];
    const mockEntry = { isIntersecting: true };

    callback([mockEntry]);

    await waitFor(() => {
      const iframe = screen.getByTitle('Test iframe');
      iframe.dispatchEvent(new Event('load'));
    });

    expect(mockOnLoad).toHaveBeenCalled();
  });

  it('applies opacity transition classes correctly', async () => {
    render(<LazyIframe src='https://example.com' title='Test iframe' />);

    const callback = mockIntersectionObserver.mock.calls[0][0];
    const mockEntry = { isIntersecting: true };

    callback([mockEntry]);

    await waitFor(() => {
      const iframe = screen.getByTitle('Test iframe');
      expect(iframe).toHaveClass(
        'transition-opacity',
        'duration-300',
        'opacity-0'
      );
    });
  });

  it('creates intersection observer with correct options', () => {
    render(<LazyIframe src='https://example.com' title='Test iframe' />);

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      { threshold: 0.1 }
    );
  });

  it('disconnects observer on unmount', () => {
    const { unmount } = render(
      <LazyIframe src='https://example.com' title='Test iframe' />
    );

    unmount();
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('renders without crashing', () => {
    expect(() =>
      render(<LazyIframe src='https://example.com' title='Test iframe' />)
    ).not.toThrow();
  });
});
