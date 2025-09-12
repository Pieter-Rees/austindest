import { render, screen } from '@testing-library/react';
import { ImageGrid } from '@/components/ui/ImageGrid';

jest.mock('@/components/ui/EmbedContainer', () => ({
    EmbedContainer: ({ children }: any) => (
        <div data-testid="embed-container">{children}</div>
    ),
}));

jest.mock('@/components/ui/OptimizedImage', () => ({
    OptimizedImage: ({ src, alt, width, height, priority, quality }: any) => (
        <img
            data-testid="optimized-image"
            src={src}
            alt={alt}
            data-width={width}
            data-height={height}
            data-priority={priority}
            data-quality={quality}
        />
    ),
}));

describe('ImageGrid', () => {
    const mockImages = [
        { src: '/image1.jpg', alt: 'Image 1', width: 200, height: 300 },
        { src: '/image2.jpg', alt: 'Image 2', width: 250, height: 350 },
        { src: '/image3.jpg', alt: 'Image 3' },
    ];

    it('renders all images in grid', () => {
        render(<ImageGrid images={mockImages} />);

        expect(screen.getAllByTestId('optimized-image')).toHaveLength(3);
        expect(screen.getByAltText('Image 1')).toBeInTheDocument();
        expect(screen.getByAltText('Image 2')).toBeInTheDocument();
        expect(screen.getByAltText('Image 3')).toBeInTheDocument();
    });

    it('wraps each image in EmbedContainer', () => {
        render(<ImageGrid images={mockImages} />);

        expect(screen.getAllByTestId('embed-container')).toHaveLength(3);
    });

    it('applies correct grid classes', () => {
        const { container } = render(<ImageGrid images={mockImages} />);

        const grid = container.firstChild as HTMLElement;
        expect(grid).toHaveClass('grid', 'grid-cols-3', 'gap-4', 'lg:gap-8', 'mb-4');
    });

    it('applies custom className', () => {
        const { container } = render(<ImageGrid images={mockImages} className="custom-class" />);

        const grid = container.firstChild as HTMLElement;
        expect(grid).toHaveClass('custom-class');
    });

    it('passes correct props to OptimizedImage', () => {
        render(<ImageGrid images={mockImages} />);

        const images = screen.getAllByTestId('optimized-image');

        expect(images[0]).toHaveAttribute('data-width', '200');
        expect(images[0]).toHaveAttribute('data-height', '300');
        expect(images[0]).toHaveAttribute('data-priority', 'true');
        expect(images[0]).toHaveAttribute('data-quality', '85');

        expect(images[1]).toHaveAttribute('data-width', '250');
        expect(images[1]).toHaveAttribute('data-height', '350');
        expect(images[1]).toHaveAttribute('data-priority', 'false');

        expect(images[2]).toHaveAttribute('data-width', '200');
        expect(images[2]).toHaveAttribute('data-height', '300');
        expect(images[2]).toHaveAttribute('data-priority', 'false');
    });

    it('uses default width and height when not provided', () => {
        const imagesWithoutDimensions = [
            { src: '/image1.jpg', alt: 'Image 1' },
            { src: '/image2.jpg', alt: 'Image 2' },
        ];

        render(<ImageGrid images={imagesWithoutDimensions} />);

        const images = screen.getAllByTestId('optimized-image');
        images.forEach(image => {
            expect(image).toHaveAttribute('data-width', '200');
            expect(image).toHaveAttribute('data-height', '300');
        });
    });

    it('renders without crashing', () => {
        expect(() => render(<ImageGrid images={[]} />)).not.toThrow();
    });
});
