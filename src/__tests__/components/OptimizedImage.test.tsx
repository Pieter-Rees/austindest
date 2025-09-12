import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

interface NextImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: string;
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
  sizes?: string;
}

// Mock next/image to avoid complex image loading
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    width = 200,
    height = 300,
    className,
    priority = false,
    quality = 75,
    placeholder = 'empty',
    blurDataURL,
    onLoad,
    onError,
    sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  }: NextImageProps) => (
    <div
      data-testid='next-image'
      data-src={src}
      data-alt={alt}
      data-width={width}
      data-height={height}
      className={className}
      data-priority={priority}
      data-quality={quality}
      data-placeholder={placeholder}
      data-blur-data-url={blurDataURL}
      data-sizes={sizes}
      onLoad={onLoad}
      onError={onError}
    />
  ),
}));

describe('OptimizedImage', () => {
  it('renders image with correct props', () => {
    render(
      <OptimizedImage
        src='/test-image.jpg'
        alt='Test image'
        width={300}
        height={400}
        priority={true}
        quality={90}
      />
    );

    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('data-src', '/test-image.jpg');
    expect(image).toHaveAttribute('data-alt', 'Test image');
    expect(image).toHaveAttribute('data-width', '300');
    expect(image).toHaveAttribute('data-height', '400');
    expect(image).toHaveAttribute('data-priority', 'true');
    expect(image).toHaveAttribute('data-quality', '90');
  });

  it('uses default values when props not provided', () => {
    render(<OptimizedImage src='/test-image.jpg' alt='Test image' />);

    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('data-width', '200');
    expect(image).toHaveAttribute('data-height', '300');
    expect(image).toHaveAttribute('data-priority', 'false');
    expect(image).toHaveAttribute('data-quality', '75');
    expect(image).toHaveAttribute('data-placeholder', 'empty');
  });

  it('renders loading placeholder initially', () => {
    render(
      <OptimizedImage
        src='/test-image.jpg'
        alt='Test image'
        width={300}
        height={400}
      />
    );

    const loadingDiv = screen.getByTestId('next-image').previousElementSibling;
    expect(loadingDiv).toHaveClass(
      'absolute',
      'inset-0',
      'bg-gray-800',
      'animate-pulse',
      'rounded-3xl'
    );
  });

  it('renders loading placeholder initially', () => {
    render(
      <OptimizedImage
        src='/test-image.jpg'
        alt='Test image'
        width={300}
        height={400}
      />
    );

    const loadingDiv = screen.getByTestId('next-image').previousElementSibling;
    expect(loadingDiv).toHaveClass(
      'absolute',
      'inset-0',
      'bg-gray-800',
      'animate-pulse',
      'rounded-3xl'
    );
  });

  it('handles error events', () => {
    render(
      <OptimizedImage
        src='/test-image.jpg'
        alt='Test image'
        width={300}
        height={400}
      />
    );

    const image = screen.getByTestId('next-image');
    expect(image).toBeInTheDocument();

    // Test that the component renders without crashing when error event is fired
    expect(() => fireEvent.error(image)).not.toThrow();
  });

  it('applies correct classes to image', () => {
    render(
      <OptimizedImage
        src='/test-image.jpg'
        alt='Test image'
        className='custom-class'
      />
    );

    const image = screen.getByTestId('next-image');
    expect(image).toHaveClass(
      'object-cover',
      'w-full',
      'h-full',
      'rounded-3xl',
      'transition-opacity',
      'duration-300',
      'opacity-0'
    );
  });

  it('applies opacity classes based on loading state', () => {
    render(<OptimizedImage src='/test-image.jpg' alt='Test image' />);

    const image = screen.getByTestId('next-image');
    expect(image).toHaveClass('opacity-0');
  });

  it('passes blurDataURL when provided', () => {
    render(
      <OptimizedImage
        src='/test-image.jpg'
        alt='Test image'
        placeholder='blur'
        blurDataURL='data:image/jpeg;base64,test'
      />
    );

    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('data-placeholder', 'blur');
    expect(image).toHaveAttribute(
      'data-blur-data-url',
      'data:image/jpeg;base64,test'
    );
  });

  it('applies correct sizes attribute', () => {
    render(<OptimizedImage src='/test-image.jpg' alt='Test image' />);

    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute(
      'data-sizes',
      '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
    );
  });

  it('has correct container structure', () => {
    const { container } = render(
      <OptimizedImage
        src='/test-image.jpg'
        alt='Test image'
        className='custom-class'
      />
    );

    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveClass('relative', 'custom-class');
  });

  it('renders without crashing', () => {
    expect(() =>
      render(<OptimizedImage src='/test-image.jpg' alt='Test image' />)
    ).not.toThrow();
  });
});
