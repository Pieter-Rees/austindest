import { Title } from '@/components/ui/Title';
import { render, screen } from '@testing-library/react';

describe('Title', () => {
  it('renders title only', () => {
    render(<Title title='Test Title' />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders subTitle only', () => {
    render(<Title subTitle='Test Subtitle' />);

    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders both title and subTitle', () => {
    render(<Title title='Test Title' subTitle='Test Subtitle' />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders smallTitle', () => {
    render(<Title smallTitle='Small Title' />);

    expect(screen.getByText('Small Title')).toBeInTheDocument();
  });

  it('applies center alignment when center prop is true', () => {
    render(<Title title='Test Title' center={true} />);

    const title = screen.getByText('Test Title');
    expect(title).toHaveClass(
      'text-7xl',
      'sm:text-8xl',
      'lg:text-9xl',
      'text-disco-ball',
      'text-neon-title',
      'text-center',
      'lg:text-left'
    );
  });

  it('applies left alignment when left prop is true', () => {
    render(<Title subTitle='Test Subtitle' left={true} />);

    const subtitle = screen.getByText('Test Subtitle');
    expect(subtitle).toHaveClass('text-center', 'lg:text-left');
  });

  it('applies right alignment when right prop is true', () => {
    render(<Title subTitle='Test Subtitle' right={true} />);

    const subtitle = screen.getByText('Test Subtitle');
    expect(subtitle).toHaveClass('text-center', 'lg:text-right');
  });

  it('applies margin when margin prop is true', () => {
    render(<Title subTitle='Test Subtitle' margin={true} />);

    const subtitle = screen.getByText('Test Subtitle');
    expect(subtitle).toHaveClass('mt-8');
  });

  it('applies center when center prop is true', () => {
    render(<Title subTitle='Test Subtitle' center={true} />);

    const subtitle = screen.getByText('Test Subtitle');
    expect(subtitle).toHaveClass(
      'text-4xl',
      'sm:text-5xl',
      'lg:text-6xl',
      'text-white',
      'text-neon-disco',
      'text-center'
    );
  });

  it('has proper title styling', () => {
    render(<Title title='Test Title' />);

    const title = screen.getByText('Test Title');
    expect(title).toHaveClass(
      'text-7xl',
      'sm:text-8xl',
      'lg:text-9xl',
      'text-disco-ball',
      'text-neon-title'
    );
  });

  it('has proper subtitle styling', () => {
    render(<Title subTitle='Test Subtitle' />);

    const subtitle = screen.getByText('Test Subtitle');
    expect(subtitle).toHaveClass(
      'text-4xl',
      'sm:text-5xl',
      'lg:text-6xl',
      'text-white',
      'text-neon-disco'
    );
  });

  it('has proper small title styling', () => {
    render(<Title smallTitle='Small Title' />);

    const smallTitle = screen.getByText('Small Title');
    expect(smallTitle).toHaveClass('text-lg', 'lg:text-3xl', 'text-white');
  });

  it('renders without crashing when no props provided', () => {
    render(<Title />);
    const containers = screen.getAllByRole('generic');
    expect(containers[0]).toBeInTheDocument();
  });
});
