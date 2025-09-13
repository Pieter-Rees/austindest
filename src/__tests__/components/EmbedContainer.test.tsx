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
    render(<EmbedContainer>{null}</EmbedContainer>);
    const containers = screen.getAllByRole('generic');
    expect(containers[0]).toBeInTheDocument();
  });

  it('applies custom height when provided', () => {
    render(
      <EmbedContainer height='500px'>
        <div>Test Content</div>
      </EmbedContainer>
    );

    const container = screen.getByText('Test Content').parentElement;
    expect(container).toHaveStyle('height: 500px');
  });

  it('applies responsive styling when responsive is true', () => {
    render(
      <EmbedContainer responsive={true} aspectRatio='16/9' maxHeight='80vh'>
        <div>Test Content</div>
      </EmbedContainer>
    );

    const container = screen.getByText('Test Content').parentElement;
    expect(container).toHaveStyle({
      aspectRatio: '16/9',
      maxHeight: '80vh',
      height: 'auto',
    });
  });

  it('applies default responsive values', () => {
    render(
      <EmbedContainer responsive={true}>
        <div>Test Content</div>
      </EmbedContainer>
    );

    const container = screen.getByText('Test Content').parentElement;
    expect(container).toHaveStyle({
      aspectRatio: '16/9',
      maxHeight: '80vh',
      height: 'auto',
    });
  });
});
