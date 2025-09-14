import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
import { render } from '@testing-library/react';

describe('SkeletonLoader', () => {
  it('renders with default props', () => {
    const { container } = render(<SkeletonLoader />);

    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveClass(
      'bg-gray-300',
      'dark:bg-gray-700',
      'rounded',
      'rounded-lg',
      'animate-pulse'
    );
  });

  it('renders with custom className', () => {
    const { container } = render(<SkeletonLoader className='custom-class' />);

    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveClass('custom-class');
  });

  it('renders text variant', () => {
    const { container } = render(<SkeletonLoader variant='text' />);

    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveClass('h-4');
  });

  it('renders rectangular variant', () => {
    const { container } = render(<SkeletonLoader variant='rectangular' />);

    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveClass('rounded-lg');
  });

  it('renders circular variant', () => {
    const { container } = render(<SkeletonLoader variant='circular' />);

    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveClass('rounded-full');
  });

  it('renders image variant', () => {
    const { container } = render(<SkeletonLoader variant='image' />);

    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveClass('rounded-3xl');
  });

  it('renders with pulse animation', () => {
    const { container } = render(<SkeletonLoader animation='pulse' />);

    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveClass('animate-pulse');
  });

  it('renders with wave animation', () => {
    const { container } = render(<SkeletonLoader animation='wave' />);

    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveClass('animate-wave');
  });

  it('renders with no animation', () => {
    const { container } = render(<SkeletonLoader animation='none' />);

    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).not.toHaveClass('animate-pulse');
    expect(skeleton).not.toHaveClass('animate-wave');
  });

  it('applies numeric width and height', () => {
    const { container } = render(<SkeletonLoader width={200} height={100} />);

    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveStyle({
      width: '200px',
      height: '100px',
    });
  });

  it('applies string width and height', () => {
    const { container } = render(<SkeletonLoader width='50%' height='10rem' />);

    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveStyle({
      width: '50%',
      height: '10rem',
    });
  });

  it('renders single line of text', () => {
    const { container } = render(<SkeletonLoader variant='text' lines={1} />);

    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveClass('h-4');
  });

  it('renders multiple lines of text', () => {
    const { container } = render(<SkeletonLoader variant='text' lines={3} />);

    const skeletons = container.querySelectorAll('div[class*="bg-gray-300"]');
    expect(skeletons).toHaveLength(3);

    // First line should be full width
    expect(skeletons[0]).toHaveClass('w-full');
    expect(skeletons[0]).not.toHaveClass('mt-2');

    // Second line should be full width with margin
    expect(skeletons[1]).toHaveClass('w-full', 'mt-2');

    // Last line should be 3/4 width with margin
    expect(skeletons[2]).toHaveClass('w-3/4', 'mt-2');
  });

  it('applies correct styles to last line in multi-line text', () => {
    const { container } = render(
      <SkeletonLoader variant='text' lines={2} width={300} height={20} />
    );

    const skeletons = container.querySelectorAll('div[class*="bg-gray-300"]');
    const lastLine = skeletons[1] as HTMLElement;

    expect(lastLine).toHaveStyle({
      width: '75%',
    });
  });

  it('applies margin to lines after the first', () => {
    const { container } = render(<SkeletonLoader variant='text' lines={4} />);

    const skeletons = container.querySelectorAll('div[class*="bg-gray-300"]');

    // First line should not have margin
    expect(skeletons[0]).not.toHaveClass('mt-2');

    // All other lines should have margin
    for (let i = 1; i < skeletons.length; i++) {
      expect(skeletons[i]).toHaveClass('mt-2');
    }
  });

  it('renders all animation variants', () => {
    const animations = ['pulse', 'wave', 'none'] as const;

    animations.forEach(animation => {
      const { container, unmount } = render(
        <SkeletonLoader animation={animation} />
      );
      const skeleton = container.firstChild as HTMLElement;

      if (animation === 'pulse') {
        expect(skeleton).toHaveClass('animate-pulse');
      } else if (animation === 'wave') {
        expect(skeleton).toHaveClass('animate-wave');
      } else {
        expect(skeleton).not.toHaveClass('animate-pulse');
        expect(skeleton).not.toHaveClass('animate-wave');
      }

      unmount();
    });
  });

  it('renders all variants', () => {
    const variants = ['text', 'rectangular', 'circular', 'image'] as const;

    variants.forEach(variant => {
      const { container, unmount } = render(
        <SkeletonLoader variant={variant} />
      );
      const skeleton = container.firstChild as HTMLElement;

      if (variant === 'text') {
        expect(skeleton).toHaveClass('h-4');
      } else if (variant === 'rectangular') {
        expect(skeleton).toHaveClass('rounded-lg');
      } else if (variant === 'circular') {
        expect(skeleton).toHaveClass('rounded-full');
      } else if (variant === 'image') {
        expect(skeleton).toHaveClass('rounded-3xl');
      }

      unmount();
    });
  });

  it('combines all classes correctly', () => {
    const { container } = render(
      <SkeletonLoader
        className='custom-class'
        variant='circular'
        animation='wave'
      />
    );

    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveClass(
      'bg-gray-300',
      'dark:bg-gray-700',
      'rounded',
      'rounded-full',
      'animate-wave',
      'custom-class'
    );
  });

  it('handles zero lines gracefully', () => {
    const { container } = render(<SkeletonLoader variant='text' lines={0} />);

    // When lines is 0, it should render a single skeleton div
    const skeletons = container.querySelectorAll('div[class*="bg-gray-300"]');
    expect(skeletons).toHaveLength(1);
  });

  it('handles negative lines gracefully', () => {
    const { container } = render(<SkeletonLoader variant='text' lines={-1} />);

    // When lines is negative, it should render a single skeleton div
    const skeletons = container.querySelectorAll('div[class*="bg-gray-300"]');
    expect(skeletons).toHaveLength(1);
  });

  it('has correct display name', () => {
    expect(SkeletonLoader.displayName).toBe('SkeletonLoader');
  });

  it('applies base classes to all variants', () => {
    const variants = ['text', 'rectangular', 'circular', 'image'] as const;

    variants.forEach(variant => {
      const { container, unmount } = render(
        <SkeletonLoader variant={variant} />
      );
      const skeleton = container.firstChild as HTMLElement;

      expect(skeleton).toHaveClass(
        'bg-gray-300',
        'dark:bg-gray-700',
        'rounded'
      );

      unmount();
    });
  });

  it('handles mixed width and height types', () => {
    const { container } = render(<SkeletonLoader width={200} height='10rem' />);

    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveStyle({
      width: '200px',
      height: '10rem',
    });
  });

  it('handles only width without height', () => {
    const { container } = render(<SkeletonLoader width='50%' />);

    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveStyle({
      width: '50%',
    });
    // The skeleton will have a default height from CSS classes, so we just check it has width
    expect(skeleton.style.width).toBe('50%');
  });

  it('handles only height without width', () => {
    const { container } = render(<SkeletonLoader height={100} />);

    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveStyle({
      height: '100px',
    });
    // The skeleton will have a default width from CSS classes, so we just check it has height
    expect(skeleton.style.height).toBe('100px');
  });
});
