import { render, screen } from '@testing-library/react';
import { EmbedContainer } from '@/components/ui/EmbedContainer';

describe('EmbedContainer', () => {
  it('renders children correctly', () => {
    render(
      <EmbedContainer>
        <div data-testid='test-content'>Test Content</div>
      </EmbedContainer>
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });

  it('applies default className', () => {
    render(
      <EmbedContainer>
        <div>Test Content</div>
      </EmbedContainer>
    );

    const container = screen.getByText('Test Content').parentElement;
    expect(container).toHaveClass(
      'overflow-hidden',
      'rounded-lg',
      'fancy-border',
      'safari-fix'
    );
  });

  it('applies custom className', () => {
    render(
      <EmbedContainer className='custom-class'>
        <div>Test Content</div>
      </EmbedContainer>
    );

    const container = screen.getByText('Test Content').parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('renders multiple children', () => {
    render(
      <EmbedContainer>
        <div data-testid='child1'>Child 1</div>
        <div data-testid='child2'>Child 2</div>
      </EmbedContainer>
    );

    expect(screen.getByTestId('child1')).toBeInTheDocument();
    expect(screen.getByTestId('child2')).toBeInTheDocument();
  });

  it('renders without children', () => {
    render(<EmbedContainer />);
    const containers = screen.getAllByRole('generic');
    expect(containers[0]).toBeInTheDocument();
  });
});
