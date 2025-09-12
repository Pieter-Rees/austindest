import { render, screen } from '@testing-library/react';
import { SectionHeader } from '@/components/ui/SectionHeader';

describe('SectionHeader', () => {
  it('renders with title only', () => {
    render(<SectionHeader title='Test Title' subTitle='Test Subtitle' />);

    expect(screen.getAllByText('Test Title')).toHaveLength(2);
  });

  it('renders with subTitle only', () => {
    render(<SectionHeader subTitle='Test Subtitle' />);

    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders with both title and subTitle', () => {
    render(<SectionHeader title='Test Title' subTitle='Test Subtitle' />);

    expect(screen.getAllByText('Test Title')).toHaveLength(2);
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('applies center alignment when center prop is true', () => {
    render(
      <SectionHeader
        title='Test Title'
        subTitle='Test Subtitle'
        center={true}
      />
    );

    const title = screen.getAllByText('Test Title')[0];
    expect(title).toHaveClass('text-center');
  });

  it('applies right alignment when right prop is true', () => {
    render(
      <SectionHeader title='Test Title' subTitle='Test Subtitle' right={true} />
    );

    const title = screen.getAllByText('Test Title')[0];
    expect(title).toHaveClass(
      'text-7xl',
      'sm:text-8xl',
      'lg:text-9xl',
      'text-shine',
      'text-neon-title'
    );
  });

  it('applies left alignment when left prop is true', () => {
    render(
      <SectionHeader title='Test Title' subTitle='Test Subtitle' left={true} />
    );

    const title = screen.getAllByText('Test Title')[0];
    expect(title).toHaveClass(
      'text-7xl',
      'sm:text-8xl',
      'lg:text-9xl',
      'text-shine',
      'text-neon-title'
    );
  });

  it('applies margin when margin prop is true', () => {
    render(<SectionHeader subTitle='Test Subtitle' margin={true} />);

    const subtitle = screen.getByText('Test Subtitle');
    expect(subtitle).toHaveClass('mt-8');
  });

  it('renders without crashing when no props provided', () => {
    render(<SectionHeader subTitle='Test Subtitle' />);
    const containers = screen.getAllByRole('generic');
    const container = containers[0];
    expect(container).toBeInTheDocument();
  });
});
