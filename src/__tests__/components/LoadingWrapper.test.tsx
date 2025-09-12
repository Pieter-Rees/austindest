import { render, screen, waitFor } from '@testing-library/react';
import { LoadingWrapper } from '@/components/ui/LoadingWrapper';

describe('LoadingWrapper', () => {
  it('renders children after loading', async () => {
    render(
      <LoadingWrapper>
        <div data-testid='content'>Content</div>
      </LoadingWrapper>
    );

    await waitFor(() => {
      expect(screen.getByTestId('content')).toBeInTheDocument();
    });
  });

  it('renders children after loading with custom fallback', async () => {
    render(
      <LoadingWrapper
        fallback={<div data-testid='custom-fallback'>Custom Loading</div>}
      >
        <div data-testid='content'>Content</div>
      </LoadingWrapper>
    );

    await waitFor(() => {
      expect(screen.getByTestId('content')).toBeInTheDocument();
    });
  });

  it('renders children after loading by default', async () => {
    render(
      <LoadingWrapper>
        <div data-testid='content'>Content</div>
      </LoadingWrapper>
    );

    await waitFor(() => {
      expect(screen.getByTestId('content')).toBeInTheDocument();
    });
  });

  it('renders without children', () => {
    render(<LoadingWrapper />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });
});
