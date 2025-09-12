import { render, screen } from '@testing-library/react';
import Logo from '@/components/ui/logo';

describe('Logo', () => {
  it('renders logo component', () => {
    render(<Logo />);

    const aElements = screen.getAllByText('A');
    expect(aElements).toHaveLength(2);
  });

  it('renders with proper styling', () => {
    render(<Logo />);

    const aElements = screen.getAllByText('A');
    const logoContainer = aElements[0]?.closest('div');
    expect(logoContainer).toHaveClass(
      'relative',
      'hover:animate-spin-slow',
      'cursor-grab'
    );
  });

  it('renders both A characters', () => {
    render(<Logo />);

    const aElements = screen.getAllByText('A');
    expect(aElements).toHaveLength(2);
  });

  it('has proper neon styling for first A', () => {
    render(<Logo />);

    const aElements = screen.getAllByText('A');
    const firstA = aElements[0];
    expect(firstA).toHaveClass(
      'absolute',
      'z-2',
      'left-0',
      'text-5xl',
      'lg:text-5xl',
      'text-neon-title'
    );
  });

  it('has proper shine styling for second A', () => {
    render(<Logo />);

    const aElements = screen.getAllByText('A');
    const secondA = aElements[1];
    expect(secondA).toHaveClass(
      'relative',
      'z-0',
      'text-5xl',
      'lg:text-5xl',
      'text-shine'
    );
  });

  it('has proper container structure', () => {
    render(<Logo />);

    const aElements = screen.getAllByText('A');
    expect(aElements).toHaveLength(2);
  });

  it('renders without crashing', () => {
    render(<Logo />);
    const aElements = screen.getAllByText('A');
    expect(aElements).toHaveLength(2);
  });
});
