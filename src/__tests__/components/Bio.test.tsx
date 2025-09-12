import { render, screen } from '@testing-library/react';
import Bio from '@/components/features/bio';

interface SectionHeaderProps {
  subTitle?: string;
  right?: boolean;
  center?: boolean;
}

interface Image {
  src: string;
  alt: string;
}

interface ImageGridProps {
  images: Image[];
}

jest.mock('@/components/ui/SectionHeader', () => ({
  SectionHeader: ({ subTitle, right, center }: SectionHeaderProps) => (
    <div data-testid='section-header'>
      <h2>{subTitle}</h2>
      <span data-testid='props'>
        right:{right ? 'true' : 'false'} center:{center ? 'true' : 'false'}
      </span>
    </div>
  ),
}));

jest.mock('@/components/ui/ImageGrid', () => ({
  ImageGrid: ({ images }: ImageGridProps) => (
    <div data-testid='image-grid'>
      {images.map((image: Image, index: number) => (
        <div key={index} data-src={image.src} data-alt={image.alt}>
          {image.alt}
        </div>
      ))}
    </div>
  ),
}));

jest.mock('@/lib/constants', () => ({
  BIO_IMAGES: [
    { src: '/images/a1.webp', alt: 'Austin Dest performing' },
    { src: '/images/a2.webp', alt: 'Austin Dest in studio' },
    { src: '/images/a3.webp', alt: 'Austin Dest DJ set' },
    { src: '/images/a4.webp', alt: 'Austin Dest at event' },
  ],
}));

describe('Bio', () => {
  it('renders section header with correct props', () => {
    render(<Bio />);

    expect(screen.getByText('Bio')).toBeInTheDocument();
    expect(screen.getByTestId('props')).toHaveTextContent(
      'right:false center:false'
    );
  });

  it('renders image grid with bio images', () => {
    render(<Bio />);

    expect(screen.getAllByTestId('image-grid')).toHaveLength(2);
    expect(screen.getByText('Austin Dest performing')).toBeInTheDocument();
    expect(screen.getByText('Austin Dest in studio')).toBeInTheDocument();
    expect(screen.getByText('Austin Dest DJ set')).toBeInTheDocument();
    expect(screen.getByText('Austin Dest at event')).toBeInTheDocument();
  });

  it('has proper container structure', () => {
    render(<Bio />);

    expect(screen.getByTestId('section-header')).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    render(<Bio />);
    expect(screen.getByTestId('section-header')).toBeInTheDocument();
  });
});
